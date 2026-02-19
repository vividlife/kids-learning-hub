import { PrismaClient, ChildGrade, LearningLevel, DifficultyLevel } from '@prisma/client';
import najingWords from '../lib/data/najing-basic-words.json';
import naxinWords from '../lib/data/naxin-advanced-words.json';

const prisma = new PrismaClient();

async function main() {
  // Seed Naijing words
  for (const wordData of najingWords) {
    await prisma.word.upsert({
      where: { word: wordData.word },
      update: {},
      create: {
        word: wordData.word,
        translation: wordData.translation,
        pronunciation: wordData.pronunciation,
        example: wordData.example,
        category: wordData.category,
        difficulty: wordData.difficulty as DifficultyLevel,
        targetGrade: wordData.targetGrade as ChildGrade,
        targetLevel: wordData.targetLevel as LearningLevel,
      },
    });
  }

  console.log(`Seeded ${najingWords.length} basic words for Naijing.`);

  // Seed Naxin words (samples)
  for (const wordData of naxinWords) {
    await prisma.word.upsert({
      where: { word: wordData.word },
      update: {},
      create: {
        word: wordData.word,
        translation: wordData.translation,
        pronunciation: wordData.pronunciation,
        example: wordData.example,
        category: wordData.category,
        difficulty: wordData.difficulty as DifficultyLevel,
        targetGrade: wordData.targetGrade as ChildGrade,
        targetLevel: wordData.targetLevel as LearningLevel,
      },
    });
  }

  console.log(`Seeded ${naxinWords.length} advanced words for Naxin.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
