import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
// Removed unused Drizzle import


// Note: Assuming Prisma is working. If not, schema fixes needed separately.

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const skip = (page - 1) * limit;
  const category = searchParams.get('category') || undefined;
  const difficulty = searchParams.get('difficulty') || undefined;
  const search = searchParams.get('search') || undefined;
  const childId = searchParams.get('childId') || undefined;

  // Build where clause based on user role
  let where: any = {};

  if (session.user.role === 'PARENT') {
    // Parent can see their own words and their children's words
    if (childId) {
      // Get specific child's words (verify child belongs to parent)
      const child = await db.user.findFirst({
        where: {
          id: childId,
          parentId: session.user.id,
        },
      });
      
      if (!child) {
        return NextResponse.json({ error: 'Child not found or unauthorized' }, { status: 403 });
      }
      
      where.userId = childId;
    } else {
      // Get all children IDs for this parent
      const children = await db.user.findMany({
        where: {
          parentId: session.user.id,
          role: 'CHILD',
        },
        select: { id: true },
      });
      
      const childIds = children.map(child => child.id);
      childIds.push(session.user.id); // Include parent's own words
      
      where.userId = { in: childIds };
    }
  } else if (session.user.role === 'CHILD') {
    // Child can only see their own words
    where.userId = session.user.id;
  } else {
    return NextResponse.json({ error: 'Unauthorized role' }, { status: 403 });
  }

  // Apply filters
  if (category) where.category = category;
  if (difficulty) where.difficulty = difficulty;
  if (search) where.OR = [
    { word: { contains: search } },
    { translation: { contains: search } },
  ];

  const [words, count] = await Promise.all([
    db.word.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        word: true,
        translation: true,
        pronunciation: true,
        example: true,
        imageUrl: true,
        audioUrl: true,
        category: true,
        difficulty: true,
        targetGrade: true,
        targetLevel: true,
        status: true,
        createdAt: true,
        userId: true, // Include userId to identify who owns the word
      },
    }),
    db.word.count({ where }),
  ]);

  return NextResponse.json({
    words,
    count,
    page,
    totalPages: Math.ceil(count / limit),
  });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { childId, ...wordData } = body;
    
    let targetUserId = session.user.id;
    
    // If parent is creating word for a child
    if (session.user.role === 'PARENT' && childId) {
      // Verify child belongs to parent
      const child = await db.user.findFirst({
        where: {
          id: childId,
          parentId: session.user.id,
        },
      });
      
      if (!child) {
        return NextResponse.json({ error: 'Child not found or unauthorized' }, { status: 403 });
      }
      
      targetUserId = childId;
    } else if (session.user.role === 'CHILD') {
      // Child can only create words for themselves
      targetUserId = session.user.id;
    } else if (session.user.role === 'PARENT' && !childId) {
      // Parent creating word for themselves
      targetUserId = session.user.id;
    } else {
      return NextResponse.json({ error: 'Unauthorized role' }, { status: 403 });
    }

    const word = await db.word.create({
      data: {
        ...wordData,
        userId: targetUserId,
      },
    });
    
    return NextResponse.json(word, { status: 201 });
  } catch (error) {
    console.error('Error creating word:', error);
    return NextResponse.json({ 
      error: 'Failed to create word',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}