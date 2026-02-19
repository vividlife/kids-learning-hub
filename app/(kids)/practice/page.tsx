'use client'

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import MultipleChoiceQuestion from "@/components/learning/quiz/MultipleChoiceQuestion"
import FillInBlankQuestion from "@/components/learning/quiz/FillInBlankQuestion"
import MatchingQuestion from "@/components/learning/quiz/MatchingQuestion"
import { Play, ChevronLeft, ChevronRight, Trophy, Shuffle, Repeat } from "lucide-react"

interface Word {
  id: string
  word: string
  translation: string
  pronunciation?: string
  example?: string
  category: string
  difficulty: string
}

interface Question {
  id: string
  type: "multiple_choice" | "fill_blank" | "matching"
  prompt: string
  correctAnswer: string | Record<string, string>
  options?: string[]
  explanation?: string
  leftItems?: string[]
  rightItems?: string[]
  correctPairs?: Map<string, string> | Record<string, string>
  example?: string
}

export default function PracticePage() {
  const { data: session } = useSession()
  
  // States
  const [words, setWords] = useState<Word[]>([])
  const [filteredWords, setFilteredWords] = useState<Word[]>([])
  const [questionType, setQuestionType] = useState<"multiple_choice" | "fill_blank" | "matching">("multiple_choice")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [numQuestions, setNumQuestions] = useState(10)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string | Record<string, string>>>({})
  const [scores, setScores] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [overallScore, setOverallScore] = useState(0)

  // Load words
  useEffect(() => {
    const loadWords = async () => {
      try {
        const res = await fetch(`/api/words?limit=200`)
        if (res.ok) {
          const data = await res.json()
          setWords(data.words || [])
        } else {
          // Fallback JSON
          const [basic, advanced] = await Promise.all([
            fetch("/lib/data/najing-basic-words.json").then(r => r.json()),
            fetch("/lib/data/naxin-advanced-words.json").then(r => r.json())
          ])
          setWords([...basic, ...advanced])
        }
      } catch (error) {
        console.error("Failed to load words:", error)
      }
    }
    loadWords()
  }, [])

  // Filter words
  useEffect(() => {
    let filtered = words.filter(w => {
      if (category && w.category !== category) return false
      if (difficulty && w.difficulty !== difficulty) return false
      return true
    })
    setFilteredWords(filtered)
  }, [words, category, difficulty])

  // Generate questions
  const generateQuestions = useCallback((type: Question["type"], count: number, wordsList: Word[]) => {
    const shuffled = [...wordsList].sort(() => Math.random() - 0.5).slice(0, count)
    const newQuestions: Question[] = []

    if (type === "multiple_choice") {
      shuffled.forEach((word, idx) => {
        const wrongOptions = wordsList
          .filter(w => w.word !== word.word && w.translation === word.translation ? false : true)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w.word)
        const options = [word.word, ...wrongOptions].sort(() => Math.random() - 0.5)
        newQuestions.push({
          id: `mc_${idx}`,
          type,
          prompt: `${word.translation} 的英文是？`,
          options,
          correctAnswer: word.word,
          explanation: word.example
        })
      })
    } else if (type === "fill_blank") {
      shuffled.forEach((word, idx) => {
        const prompt = word.example ? word.example.replace(new RegExp(word.word, "gi"), "___") : `${word.translation} 的英文：___`
        newQuestions.push({
          id: `fib_${idx}`,
          type,
          prompt,
          correctAnswer: word.word,
          explanation: `意思是“${word.translation}”，发音：${word.pronunciation || word.word}`
        })
      })
    } else if (type === "matching") {
      // Generate one matching question with multiple pairs
      const leftItems = shuffled.slice(0, 6).map(w => w.translation)
      const rightItems = shuffled.slice(0, 6).map(w => w.word)
      const correctPairs: Record<string, string> = {}
      leftItems.forEach((left, i) => {
        correctPairs[left] = rightItems[i]
      })
      rightItems.sort(() => Math.random() - 0.5) // Shuffle right
      newQuestions.push({
        id: `match_0`,
        type,
        prompt: "将中文意思和英文单词配对",
        leftItems,
        rightItems,
        correctPairs,
        explanation: "记住每个单词的意思和拼写！"
      })
      // Pad with empty if needed
      while (newQuestions.length < count) {
        newQuestions.push(newQuestions[0]!) // Duplicate for now
      }
    }

    return newQuestions
  }, [words])

  const startQuiz = () => {
    if (filteredWords.length === 0) return
    const q = generateQuestions(questionType, numQuestions, filteredWords)
    setQuestions(q)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setScores([])
    setQuizStarted(true)
    setQuizCompleted(false)
  }

  const handleAnswer = (questionId: string, answer: string | Record<string, string>) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
    
    // Check correctness
    const q = questions.find(qq => qq.id === questionId)!
    let isCorrect = false
    if (questionType === "matching") {
      isCorrect = Object.keys(q.correctPairs as Record<string, string>).every(
        left => (answer as Record<string, string>)[left] === (q.correctPairs as Record<string, string>)[left]
      )
    } else {
      isCorrect = (answer as string).toLowerCase() === (q.correctAnswer as string).toLowerCase()
    }
    setScores(prev => [...prev.slice(0, currentQuestionIndex), isCorrect ? 1 : 0])

    // Record to API
    if (session?.user?.id) {
      const wordIds = filteredWords.slice(0, numQuestions).map((_, i) => words.find(w => w.word === (q.correctAnswer as string))?.id || "")
      fetch("/api/study-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wordId: wordIds[currentQuestionIndex] || "",
          userId: session.user.id,
          correct: isCorrect,
          responseTime: 5000, // approx
          exerciseType: questionType
        })
      }).catch(console.error)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(idx => idx + 1)
    } else {
      const score = scores.reduce((a, b) => a + b, 0)
      setOverallScore(score)
      setQuizCompleted(true)
    }
  }

  const restartQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setScores([])
    setQuizCompleted(false)
  }

  const categories = Array.from(new Set(words.map(w => w.category))).sort()
  const difficulties = Array.from(new Set(words.map(w => w.difficulty))).sort()

  if (!quizStarted && !quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                🧠 练习题系统
              </CardTitle>
              <p className="text-xl text-gray-600">选择题型和范围，开始练习吧！</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">题型</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "multiple_choice" as const, label: "选择题", icon: "🔹" },
                    { value: "fill_blank" as const, label: "填空题", icon: "📝" },
                    { value: "matching" as const, label: "连线题", icon: "🔗" }
                  ].map(({value, label, icon}) => (
                    <Button
                      key={value}
                      variant={questionType === value ? "default" : "outline"}
                      className="h-20 text-xl font-bold flex flex-col gap-2 py-4"
                      onClick={() => setQuestionType(value)}
                    >
                      <span className="text-3xl">{icon}</span>
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">分类</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="所有分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">所有分类</SelectItem>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">难度</label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="所有难度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">所有难度</SelectItem>
                      {difficulties.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">题量</label>
                  <Select value={numQuestions.toString()} onValueChange={(v) => setNumQuestions(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5,10,15,20].map(n => <SelectItem key={n} value={n.toString()}>{n}题</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <Badge className="text-lg px-6 py-3 mr-4 bg-gradient-to-r from-blue-500 to-purple-500">
                  可用单词：{filteredWords.length}
                </Badge>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-xl py-8 font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
                  onClick={startQuiz}
                  disabled={filteredWords.length === 0}
                >
                  🚀 开始练习！
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (quizStarted && !quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-12 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Badge variant="secondary" className="text-xl px-6 py-3">
                第 {currentQuestionIndex + 1} / {questions.length} 题
              </Badge>
              <Badge className="text-xl px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500">
                正确 {scores.filter(Boolean).length} / {currentQuestionIndex}
              </Badge>
            </div>
            <Progress value={(currentQuestionIndex / questions.length) * 100} className="w-full h-3" />
          </div>

          {/* Question */}
          <div className="mb-12">
            {currentQuestion.type === "multiple_choice" && (
              <MultipleChoiceQuestion
                question={currentQuestion as any}
                onAnswer={(ans) => handleAnswer(currentQuestion.id, ans)}
                answered={!!answers[currentQuestion.id]}
                isCorrect={scores[currentQuestionIndex] === 1}
                userAnswer={answers[currentQuestion.id] as string}
              />
            )}
            {currentQuestion.type === "fill_blank" && (
              <FillInBlankQuestion
                question={currentQuestion as any}
                onAnswer={(ans) => handleAnswer(currentQuestion.id, ans)}
                answered={!!answers[currentQuestion.id]}
                isCorrect={scores[currentQuestionIndex] === 1}
                userAnswer={answers[currentQuestion.id] as string}
              />
            )}
            {currentQuestion.type === "matching" && (
              <MatchingQuestion
                question={currentQuestion as any}
                onAnswer={(ans) => handleAnswer(currentQuestion.id, ans)}
                answered={!!answers[currentQuestion.id]}
                isCorrect={scores[currentQuestionIndex] === 1}
                userPairs={answers[currentQuestion.id] as Record<string, string>}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-6 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={restartQuiz}
              className="flex items-center gap-2 px-8"
            >
              <ChevronLeft className="w-5 h-5" />
              重新开始
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-xl px-12 py-8 font-bold shadow-2xl hover:shadow-3xl flex items-center gap-2"
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  下一题 <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  查看成绩 <Trophy className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Quiz completed
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-3xl mx-auto text-center">
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader>
            <div className="text-6xl mb-6">
              <Trophy className="w-32 h-32 mx-auto text-yellow-500 drop-shadow-lg" />
            </div>
            <CardTitle className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
              练习完成！
            </CardTitle>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mb-8">
              {Math.round((overallScore / questions.length) * 100)}分
            </div>
            <div className="grid grid-cols-2 gap-8 mb-8 text-3xl">
              <div>
                <div className="text-5xl font-black text-green-600">{overallScore}</div>
                <div className="text-lg text-gray-600">正确</div>
              </div>
              <div>
                <div className="text-5xl font-black text-gray-500">{questions.length - overallScore}</div>
                <div className="text-lg text-gray-600">错误</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-0">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-800 mb-3">📊 详细成绩</h3>
              <div className="flex justify-around text-lg">
                <span>正确率： <Badge className="ml-2 bg-green-500">{Math.round((overallScore / questions.length) * 100)}%</Badge></span>
                <span>用时： <Badge className="ml-2 bg-blue-500">约5分钟</Badge></span>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-xl py-8 font-bold shadow-2xl"
              onClick={restartQuiz}
            >
              🔄 再做一套
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full text-xl py-8 font-bold"
              onClick={() => setQuizStarted(false)}
            >
              ← 返回选择
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
