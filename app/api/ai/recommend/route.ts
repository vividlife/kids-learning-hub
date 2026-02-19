import { NextRequest, NextResponse } from 'next/server';
import studyRecords from '@/data/study-records.json';
import { analyzeWeakPoints, getLearningSuggestions } from '@/lib/ai';

export async function GET(request: NextRequest) {
  try {
    const weakAnalysis = analyzeWeakPoints(studyRecords);
    const masteryLevel = 6; // Mock
    const suggestions = getLearningSuggestions({ weakCategories: weakAnalysis.weakCategories, masteryLevel });

    return NextResponse.json({ weakPoints: weakAnalysis, suggestions });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
  }
}
