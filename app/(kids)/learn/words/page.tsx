'use client'

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Flashcard from '@/components/learning/Flashcard';
import { Play, Shuffle, Repeat, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Word {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  category: string;
  imageUrl?: string;
  difficulty: string;
  targetGrade?: string;
  targetLevel?: string;
}

export default function LearnWordsPage() {
  const { data: session } = useSession();
  const [words, setWords] = useState<Word[]>([]);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'sequential' | 'random' | 'review'>('sequential');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [totalStudied, setTotalStudied] = useState(0);

  // Load words from JSON or API
  useEffect(() => {
    const loadWords = async () => {
      try {
        // Try API first
        const res = await fetch(`/api/words?limit=100`);
        if (res.ok) {
          const data = await res.json();
          setWords(data.words || []);
        } else {
          // Fallback to JSON
          const [basicRes, advancedRes] = await Promise.all([
            fetch('/lib/data/najing-basic-words.json'),
            fetch('/lib/data/naxin-advanced-words.json')
          ]);
          const basic = await basicRes.json();
          const advanced = await advancedRes.json();
          setWords([...basic, ...advanced]);
        }
      } catch (error) {
        console.error('Failed to load words:', error);
      }
    };
    loadWords();
  }, []);

  // Filter and shuffle based on selections
  useEffect(() => {
    let filtered = words.filter(w => {
      if (category && w.category !== category) return false;
      if (difficulty && w.difficulty !== difficulty) return false;
      // Filter by user grade/level if session
      if (session?.user?.grade) {
        // Simplified filter
        return true; // TODO: proper filter
      }
      return true;
    });

    if (mode === 'random') {
      filtered = filtered.sort(() => Math.random() - 0.5);
    } else if (mode === 'review') {
      filtered = filtered.filter(w => w.difficulty === 'HARD' || Math.random() < 0.3); // Mock review
    }

    setFilteredWords(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
    setProgress(0);
  }, [words, category, difficulty, mode, session]);

  useEffect(() => {
    setProgress(filteredWords.length > 0 ? ((currentIndex + 1) / filteredWords.length) * 100 : 0);
  }, [currentIndex, filteredWords.length]);

  const currentWord = filteredWords[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePronounce = async () => {
    // Record study
    if (session?.user?.id && currentWord) {
      try {
        await fetch('/api/study-records', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            wordId: currentWord.id,
            userId: session.user.id,
            correct: true, // Assume known on flip/pronounce
            responseTime: 5000,
            exerciseType: 'flashcard'
          })
        });
        setScore(score + 1);
      } catch (error) {
        console.error('Failed to record progress');
      }
    }
    setTotalStudied(totalStudied + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (mode === 'random') {
        return Math.floor(Math.random() * filteredWords.length);
      }
      return Math.min(prev + 1, filteredWords.length - 1);
    });
    setIsFlipped(false);
  };

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">加载中...</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>正在准备你的学习卡片</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categories = Array.from(new Set(words.map(w => w.category))).sort();
  const difficulties = Array.from(new Set(words.map(w => w.difficulty))).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🎯 闪卡学习
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            选择你的学习范围，开始有趣的单词之旅！
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 p-6 bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">学习模式</label>
            <div className="flex gap-2">
              <Button 
                variant={mode === 'sequential' ? 'default' : 'outline'}
                onClick={() => setMode('sequential')}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> 顺序
              </Button>
              <Button 
                variant={mode === 'random' ? 'default' : 'outline'}
                onClick={() => setMode('random')}
                className="flex-1"
              >
                <Shuffle className="w-4 h-4 mr-1" /> 随机
              </Button>
              <Button 
                variant={mode === 'review' ? 'default' : 'outline'}
                onClick={() => setMode('review')}
                className="flex-1"
              >
                <Repeat className="w-4 h-4 mr-1" /> 复习
              </Button>
            </div>
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">所有分类</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择难度" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">所有难度</SelectItem>
              {difficulties.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-gray-800">
              {currentIndex + 1} / {filteredWords.length}
            </span>
            <Badge variant="secondary" className="text-xl px-4 py-2">
              正确率: {filteredWords.length > 0 ? Math.round((score / totalStudied) * 100) || 0 : 0}%
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex flex-col items-center mb-12">
          <Flashcard
            word={currentWord}
            onPronounce={handlePronounce}
            onFlip={handleFlip}
            isFlipped={isFlipped}
            onNext={handleNext}
          />
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
            ← 上一个
          </Button>
          <Button onClick={handleNext} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            下一个 →
          </Button>
        </div>
      </div>
    </div>
  );
}
