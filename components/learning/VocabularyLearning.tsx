'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface VocabularyWord {
  id: number
  english: string
  chinese: string
  pinyin: string
  example: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const sampleWords: VocabularyWord[] = [
  {
    id: 1,
    english: 'apple',
    chinese: '苹果',
    pinyin: 'píng guǒ',
    example: 'I eat an apple every day.',
    category: '水果',
    difficulty: 'easy'
  },
  {
    id: 2,
    english: 'book',
    chinese: '书',
    pinyin: 'shū',
    example: 'I read a book before bed.',
    category: '学习用品',
    difficulty: 'easy'
  },
  {
    id: 3,
    english: 'computer',
    chinese: '电脑',
    pinyin: 'diàn nǎo',
    example: 'I use a computer for homework.',
    category: '电子产品',
    difficulty: 'medium'
  },
  {
    id: 4,
    english: 'butterfly',
    chinese: '蝴蝶',
    pinyin: 'hú dié',
    example: 'The butterfly has colorful wings.',
    category: '动物',
    difficulty: 'medium'
  },
  {
    id: 5,
    english: 'adventure',
    chinese: '冒险',
    pinyin: 'mào xiǎn',
    example: 'We went on an exciting adventure.',
    category: '活动',
    difficulty: 'hard'
  }
]

export default function VocabularyLearning() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [learningMode, setLearningMode] = useState<'flashcard' | 'spelling' | 'multipleChoice' | 'sentenceFill'>('flashcard')
  const [userInput, setUserInput] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const currentWord = sampleWords[currentWordIndex]
  const progress = ((currentWordIndex + 1) / sampleWords.length) * 100

  // 闪卡学习模式
  const renderFlashcard = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="text-6xl mb-4">🔤</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">闪卡学习</h2>
        <p className="text-gray-600">点击卡片查看答案</p>
      </div>

      <div 
        className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 mb-8 cursor-pointer transform transition-transform hover:scale-105"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {!showAnswer ? (
          <div>
            <div className="text-5xl mb-4">❓</div>
            <h3 className="text-4xl font-bold text-blue-800 mb-2">{currentWord.english}</h3>
            <p className="text-gray-600">点击查看中文意思</p>
          </div>
        ) : (
          <div>
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-4xl font-bold text-green-800 mb-2">{currentWord.chinese}</h3>
            <p className="text-2xl text-gray-700 mb-2">{currentWord.pinyin}</p>
            <p className="text-lg text-gray-600 italic">"{currentWord.example}"</p>
            <div className="mt-4 inline-block bg-blue-200 text-blue-800 px-4 py-1 rounded-full">
              {currentWord.category}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4">
        <Button 
          variant="outline" 
          onClick={() => setShowAnswer(!showAnswer)}
          className="text-lg px-6 py-3"
        >
          {showAnswer ? '隐藏答案' : '显示答案'}
        </Button>
        <Button 
          onClick={handleNextWord}
          className="bg-green-600 hover:bg-green-700 text-lg px-6 py-3"
        >
          下一个单词 →
        </Button>
      </div>
    </div>
  )

  // 拼写游戏模式
  const renderSpellingGame = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="text-6xl mb-4">🎮</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">拼写游戏</h2>
        <p className="text-gray-600">听读音，拼写单词</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">听这个单词：</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-purple-800 mb-4">{currentWord.chinese}</div>
          <p className="text-xl text-gray-600 mb-2">{currentWord.pinyin}</p>
          <p className="text-lg text-gray-500 italic mb-6">"{currentWord.example}"</p>
          
          <div className="space-y-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="输入英文单词..."
              className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            
            {isCorrect !== null && (
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="text-2xl mb-2">{isCorrect ? '✅ 正确！' : '❌ 再试一次'}</div>
                {!isCorrect && <p className="text-lg">正确答案是: <span className="font-bold">{currentWord.english}</span></p>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button 
          variant="outline" 
          onClick={checkSpelling}
          className="text-lg px-6 py-3"
          disabled={!userInput.trim()}
        >
          检查答案
        </Button>
        <Button 
          onClick={handleNextWord}
          className="bg-green-600 hover:bg-green-700 text-lg px-6 py-3"
        >
          下一个单词
        </Button>
      </div>
    </div>
  )

  // 选择题模式
  const renderMultipleChoice = () => {
    const options = [
      currentWord.english,
      sampleWords[(currentWordIndex + 1) % sampleWords.length].english,
      sampleWords[(currentWordIndex + 2) % sampleWords.length].english,
      sampleWords[(currentWordIndex + 3) % sampleWords.length].english
    ].sort(() => Math.random() - 0.5)

    return (
      <div className="text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🧩</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">选择题</h2>
          <p className="text-gray-600">选择正确的中文翻译对应的英文单词</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">这个中文单词的英文是什么？</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-800 mb-6">{currentWord.chinese}</div>
            <p className="text-xl text-gray-600 mb-2">{currentWord.pinyin}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-24 text-xl hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => checkMultipleChoice(option)}
                >
                  {option}
                </Button>
              ))}
            </div>

            {isCorrect !== null && (
              <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="text-2xl mb-2">{isCorrect ? '🎉 太棒了！' : '💪 继续努力'}</div>
                {!isCorrect && (
                  <p className="text-lg">
                    正确答案是: <span className="font-bold">{currentWord.english}</span>
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Button 
          onClick={handleNextWord}
          className="bg-green-600 hover:bg-green-700 text-lg px-6 py-3"
        >
          下一个单词
        </Button>
      </div>
    )
  }

  const checkSpelling = () => {
    const correct = userInput.toLowerCase() === currentWord.english.toLowerCase()
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setTotalQuestions(totalQuestions + 1)
  }

  const checkMultipleChoice = (selectedOption: string) => {
    const correct = selectedOption === currentWord.english
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setTotalQuestions(totalQuestions + 1)
  }

  const handleNextWord = () => {
    setShowAnswer(false)
    setUserInput('')
    setIsCorrect(null)
    setCurrentWordIndex((prev) => (prev + 1) % sampleWords.length)
  }

  const handleModeChange = (mode: typeof learningMode) => {
    setLearningMode(mode)
    setShowAnswer(false)
    setUserInput('')
    setIsCorrect(null)
  }

  return (
    <div>
      {/* 学习模式切换 */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={learningMode === 'flashcard' ? 'default' : 'outline'}
          onClick={() => handleModeChange('flashcard')}
          className="flex-1 min-w-[150px]"
        >
          🔤 闪卡学习
        </Button>
        <Button
          variant={learningMode === 'spelling' ? 'default' : 'outline'}
          onClick={() => handleModeChange('spelling')}
          className="flex-1 min-w-[150px]"
        >
          🎮 拼写游戏
        </Button>
        <Button
          variant={learningMode === 'multipleChoice' ? 'default' : 'outline'}
          onClick={() => handleModeChange('multipleChoice')}
          className="flex-1 min-w-[150px]"
        >
          🧩 选择题
        </Button>
      </div>

      {/* 进度和分数 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-medium text-gray-700">
            进度: {currentWordIndex + 1}/{sampleWords.length}
          </span>
          <span className="text-lg font-bold text-blue-600">
            得分: {score}/{totalQuestions || 1}
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* 当前学习内容 */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-gray-700">当前单词:</span>
            <span className="ml-2 text-xl font-bold text-blue-800">{currentWord.english}</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            currentWord.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            currentWord.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentWord.difficulty === 'easy' ? '简单' : 
             currentWord.difficulty === 'medium' ? '中等' : '困难'}
          </div>
        </div>
      </div>

      {/* 学习内容区域 */}
      <div className="min-h-[400px]">
        {learningMode === 'flashcard' && renderFlashcard()}
        {learningMode === 'spelling' && renderSpellingGame()}
        {learningMode === 'multipleChoice' && renderMultipleChoice()}
      </div>

      {/* 学习统计 */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border text-center">
          <div className="text-2xl font-bold text-blue-600">{sampleWords.length}</div>
          <div className="text-gray-600">总单词数</div>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center">
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <div className="text-gray-600">正确次数</div>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center">
          <div className="text-2xl font-bold text-purple-600">
            {totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%
          </div>
          <div className="text-gray-600">正确率</div>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center">
          <div className="text-2xl font-bold text-yellow-600">{currentWordIndex + 1}</div>
          <div className="text-gray-600">当前进度</div>
        </div>
      </div>
    </div>
  )
}