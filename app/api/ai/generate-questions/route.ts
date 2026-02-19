import { NextRequest, NextResponse } from 'next/server';
import { generatePracticeQuestions } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { word, translation, numQuestions = 3 } = body;

    const questions = generatePracticeQuestions(word, translation, numQuestions);

    return NextResponse.json({ questions });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
}
