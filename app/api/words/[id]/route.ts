import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'PARENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const word = await db.word.findUnique({
      where: { id: params.id },
    });
    if (!word) {
      return NextResponse.json({ error: 'Word not found' }, { status: 404 });
    }
    return NextResponse.json(word);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch word' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'PARENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const word = await db.word.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(word);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update word' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'PARENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await db.word.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Word deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete word' }, { status: 500 });
  }
}