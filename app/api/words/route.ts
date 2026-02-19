import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { eq, and, like } from 'drizzle-orm'; // fallback if no drizzle, but prisma

// Note: Assuming Prisma is working. If not, schema fixes needed separately.

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'PARENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const skip = (page - 1) * limit;
  const category = searchParams.get('category') || undefined;
  const difficulty = searchParams.get('difficulty') || undefined;
  const search = searchParams.get('search') || undefined;

  const where: any = {
    userId: session.user.id, // parent's words or all?
  };

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
  if (!session || session.user.role !== 'PARENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const word = await db.word.create({
      data: {
        ...body,
        userId: session.user.id,
      },
    });
    return NextResponse.json(word, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create word' }, { status: 500 });
  }
}