import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'PARENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = buffer.toString('utf-8');

    // Simple CSV parse (first line header, comma separated, no quotes)
    const lines = text.trim().split('\n');
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length < 2) continue;

      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      // Map to fields
      const wordData = {
        word: row.word || row.english,
        translation: row.translation || row.chinese,
        category: row.category || 'general',
        difficulty: row.difficulty || 'EASY',
        example: row.example,
        pronunciation: row.pronunciation,
        imageUrl: row.imageurl,
        audioUrl: row.audiourl,
        targetGrade: row.targetgrade,
        targetLevel: row.targetlevel,
        userId: session.user.id,
      };

      data.push(wordData);
    }

    // Bulk create, ignore duplicates
    const created = await db.word.createMany({
      data,
      skipDuplicates: true,
    });

    return NextResponse.json({ message: `Imported ${created.count} words`, count: created.count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to import words' }, { status: 500 });
  }
}