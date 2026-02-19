import { NextRequest, NextResponse } from 'next/server';
import { explainKnowledgePoint } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { word, translation, example } = body;

    const explanation = explainKnowledgePoint(word, translation, example);

    return NextResponse.json({ explanation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate explanation' }, { status: 500 });
  }
}
