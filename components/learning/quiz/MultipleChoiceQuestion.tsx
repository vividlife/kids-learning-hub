'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, RadioButton } from "lucide-react"

interface MultipleChoiceQuestionProps {
  question: {
    id: string
    prompt: string
    options: string[]
    correctAnswer: string
    explanation?: string
  }
  onAnswer: (answer: string) => void
  answered?: boolean
  isCorrect?: boolean
  userAnswer?: string
}

export default function MultipleChoiceQuestion({
  question,
  onAnswer,
  answered = false,
  isCorrect,
  userAnswer
}: MultipleChoiceQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (option: string) => {
    setSelected(option)
    onAnswer(option)
  }

  const correctStyle = "bg-green-100 border-green-400 text-green-800 shadow-md"
  const wrongStyle = "bg-red-100 border-red-400 text-red-800 shadow-md"
  const normalStyle = "hover:bg-blue-50 border-blue-200 hover:border-blue-400"

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800 mb-2">{question.prompt}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((option) => {
            let optionClass = "group border-2 p-6 rounded-xl text-lg font-semibold text-center transition-all duration-300 cursor-pointer flex items-center justify-center h-20 md:h-24 relative overflow-hidden"
            
            const isSelected = selected === option || userAnswer === option
            const isCorrectOpt = option === question.correctAnswer
            
            if (answered) {
              if (isCorrectOpt) {
                optionClass += ` ${correctStyle}`
              } else if (isSelected && !isCorrect) {
                optionClass += ` ${wrongStyle}`
              } else {
                optionClass += " opacity-50 bg-gray-50 border-gray-200"
              }
            } else {
              optionClass += ` ${normalStyle}`
            }

            return (
              <Button
                key={option}
                variant="ghost"
                className={optionClass}
                onClick={() => !answered && handleSelect(option)}
                disabled={answered}
              >
                <div className="flex items-center space-x-3 w-full justify-center">
                  <RadioButton className={`w-5 h-5 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
                  <span>{option}</span>
                </div>
              </Button>
            )
          })}
        </div>

        {answered && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400">
            {isCorrect ? (
              <>
                <CheckCircle className="w-8 h-8 text-green-500 inline mr-2" />
                <span className="text-lg font-semibold text-green-800">正确！</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-8 h-8 text-red-500 inline mr-2" />
                <span className="text-lg font-semibold text-red-800">错误，正确答案是：{question.correctAnswer}</span>
              </>
            )}
            {question.explanation && (
              <p className="mt-2 text-sm text-gray-700 italic">{question.explanation}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
