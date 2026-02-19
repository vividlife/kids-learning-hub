'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, ArrowRight, Link } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MatchingQuestionProps {
  question: {
    id: string
    prompt: string
    leftItems: string[]
    rightItems: string[]
    correctPairs: Map<string, string> // left -> right
    explanation?: string
  }
  onAnswer: (pairs: Record<string, string>) => void
  answered?: boolean
  isCorrect?: boolean
  userPairs?: Record<string, string>
}

export default function MatchingQuestion({
  question,
  onAnswer,
  answered = false,
  isCorrect,
  userPairs
}: MatchingQuestionProps) {
  const [pairs, setPairs] = useState<Record<string, string>>({})

  const handlePairChange = (left: string, right: string) => {
    const newPairs = { ...pairs, [left]: right }
    setPairs(newPairs)
    if (Object.keys(newPairs).length === question.leftItems.length) {
      onAnswer(newPairs)
    }
  }

  const getPairStatus = (left: string, selectedRight: string | undefined) => {
    if (!answered) return "neutral"
    const correctRight = question.correctPairs.get(left)!
    if (selectedRight === correctRight) return "correct"
    return "wrong"
  }

  const statusClass = (status: string) => {
    switch (status) {
      case "correct": return "bg-green-100 border-green-400 text-green-800"
      case "wrong": return "bg-red-100 border-red-400 text-red-800"
      default: return "bg-gray-100 border-gray-300 hover:bg-gray-200"
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800 mb-2">{question.prompt}</CardTitle>
        {answered && (
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
            isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {isCorrect ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertCircle className="w-4 h-4 mr-1" />}
            {isCorrect ? "全对！" : "有些配对不对"}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Terms */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              中文意思 <ArrowRight className="w-5 h-5" />
            </h3>
            {question.leftItems.map((left) => (
              <div key={left} className="mb-4">
                <Select value={pairs[left] || ""} onValueChange={(val) => handlePairChange(left, val)} disabled={answered}>
                  <SelectTrigger className={`w-full p-4 border-2 rounded-xl text-lg font-semibold ${statusClass(getPairStatus(left, pairs[left]))}`}>
                    <SelectValue placeholder={`选择英文: ${left}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {question.rightItems.map((right) => (
                      <SelectItem key={right} value={right}>
                        {right}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Visual Lines */}
          <div className="flex flex-col items-center space-y-4 lg:space-y-0 lg:space-x-8 lg:flex-row lg:justify-center">
            {question.leftItems.map((_, index) => (
              <div key={index} className="flex items-center lg:flex-col">
                <div className="w-6 h-px bg-gray-300 lg:w-px lg:h-6 lg:rotate-90 origin-center" />
                <Link className="w-6 h-6 text-gray-400 mx-2 lg:my-2" />
                <div className="w-6 h-px bg-gray-300 lg:w-px lg:h-6 lg:rotate-90 origin-center" />
              </div>
            ))}
          </div>

          {/* Right Column - Definitions */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2 justify-end">
              英文单词
            </h3>
            <div className="space-y-4">
              {question.rightItems.map((right, index) => (
                <div
                  key={right}
                  className={`p-4 border-2 rounded-xl text-lg font-semibold text-center transition-all duration-300 ${
                    answered 
                      ? question.leftItems.some(l => question.correctPairs.get(l) === right) 
                        ? "bg-green-100 border-green-400" 
                        : "bg-gray-100 border-gray-300 opacity-70"
                      : "bg-blue-50 border-blue-200 hover:bg-blue-100 cursor-default"
                  }`}
                >
                  {right}
                </div>
              ))}
            </div>
          </div>
        </div>

        {answered && (
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400 text-center">
            <div className="text-3xl mb-4">{isCorrect ? <CheckCircle className="w-16 h-16 mx-auto text-green-500" /> : <AlertCircle className="w-16 h-16 mx-auto text-red-500" />}</div>
            {question.explanation && (
              <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg mx-auto max-w-2xl">
                <p className="text-sm text-yellow-800 font-medium">小贴士：</p>
                <p className="text-sm text-yellow-700 mt-1">{question.explanation}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
