import type { QuestionType, DifficultyLevel } from '@prisma/client';
import type { Question } from '@prisma/client';

export interface AIQuestion {
  id: string;
  type: QuestionType;
  content: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export function generatePracticeQuestions(word: string, translation: string, numQuestions = 3): AIQuestion[] {
  const questions: AIQuestion[] = [];
  const fakeOptions = ['banana', 'orange', 'apple', 'dog', 'cat'].filter(w => w !== word);

  // Multiple choice
  questions.push({
    id: `mc-${word}`,
    type: 'MULTIPLE_CHOICE',
    content: `What does "${word}" mean in Chinese?`,
    options: [translation, '错误的翻译1', '错误的翻译2', '错误的翻译3'],
    correctAnswer: translation,
    explanation: `Correct: "${word}" translates to "${translation}".`
  });

  // Fill in blank
  questions.push({
    id: `fib-${word}`,
    type: 'FILL_IN_BLANK',
    content: `The English word for ${translation} is ____.`,
    correctAnswer: word,
  });

  // True/False
  questions.push({
    id: `tf-${word}`,
    type: 'TRUE_FALSE',
    content: `"${word}" is a fruit.`,
    correctAnswer: word === 'apple' ? 'true' : 'false',
    explanation: word === 'apple' ? 'Yes, apple is a fruit.' : 'No, it\\'s an animal.'
  });

  return questions.slice(0, numQuestions);
}

export function explainKnowledgePoint(word: string, translation: string, example?: string): string {
  return `
知识点解释：
单词: ${word}
中文: ${translation}
例句: ${example || 'No example available.'}

学习提示: 重复朗读发音，多用在句子中练习。
  `.trim();
}

export function getLearningSuggestions(userStats: { weakCategories: string[], masteryLevel: number }): string {
  return `
个性化学习建议:
1. 重点复习薄弱类别: ${userStats.weakCategories.join(', ')}
2. 当前掌握度: ${userStats.masteryLevel}/10
3. 建议: 每天练习10个新词 + 复习5个错题
4. 自适应难度: ${userStats.masteryLevel > 7 ? 'HARD' : 'MEDIUM'}
  `.trim();
}

// Simple weak point analysis from mock records
export function analyzeWeakPoints(studyRecords: any[]): { weakWords: string[], weakCategories: string[] } {
  const incorrect = studyRecords.filter(r => !r.correct);
  const weakWords = [...new Set(incorrect.map(r => r.word))];
  const weakCats = [...new Set(incorrect.map(r => r.category || 'unknown'))];
  return { weakWords, weakCategories: weakCats };
}
