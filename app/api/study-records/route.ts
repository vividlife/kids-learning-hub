import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const studyRecord = await db.studyRecord.create({
      data: {
        ...body,
        userId: session.user.id,
      },
    });

    return NextResponse.json(studyRecord, { status: 201 });
  } catch (error) {
    // Removed console.error for production
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
