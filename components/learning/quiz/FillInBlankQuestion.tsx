'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Volume2, Edit3 } from "lucide-react"

interface FillInBlankQuestionProps {
  question: {
    id: string
    prompt: string
    correctAnswer: string
    explanation?: string
  }
  onAnswer: (answer: string) => void
  answered?: boolean
  isCorrect?: boolean
  userAnswer?: string
}

export default function FillInBlankQuestion({
  question,
  onAnswer,
  answered = false,
  isCorrect,
  userAnswer
}: FillInBlankQuestionProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const answer = inputValue.trim().toLowerCase()
    onAnswer(answer)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  const isCorrectAnswer = answered ? userAnswer?.toLowerCase() === question.correctAnswer.toLowerCase() : false

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-white to-green-50 border-2 border-green-200 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800 mb-4">{question.prompt}</CardTitle>
        {answered && (
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
            isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {isCorrect ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertCircle className="w-4 h-4 mr-1" />}
            {isCorrect ? "正确！" : `错误，答案是 ${question.correctAnswer}`}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        {!answered ? (
          <>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-xl text-gray-700 font-medium text-center leading-relaxed p-6 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200 min-h-[100px] flex items-center justify-center">
                {question.prompt}
              </div>
              <div className="flex w-full max-w-md gap-3">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入答案..."
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-lg font-semibold text-center"
                  disabled={answered}
                />
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                >
                  <Edit3 className="w-5 h-5 mr-1" />
                  提交
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (inputRef.current) inputRef.current.focus()
                }}
                className="flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                发音提示
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className={`text-4xl mb-4 ${
              isCorrect ? "text-green-500" : "text-red-500"
            }`}>
              {isCorrect ? <CheckCircle className="w-16 h-16 mx-auto" /> : <AlertCircle className="w-16 h-16 mx-auto" />}
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-4">
              你填写的： <span className={`font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>{userAnswer}</span>
            </p>
            {question.explanation && (
              <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <p className="text-sm text-yellow-800 font-medium">解析：</p>
                <p className="text-sm text-yellow-700 mt-1">{question.explanation}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
