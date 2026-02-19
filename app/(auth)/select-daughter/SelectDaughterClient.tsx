"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { BookOpen, Users, Sparkles, Star, Target, Gamepad2 } from "lucide-react";
import { GRADE_DISPLAY_NAMES, LEVEL_DISPLAY_NAMES } from "@/lib/constants";

interface Child {
  id: string;
  name: string;
  age: number | null;
  grade: string | null;
  learningLevel: string | null;
  avatar: string | null;
  points: number;
  totalPoints: number;
}

interface SelectDaughterClientProps {
  children: Child[];
}

export default function SelectDaughterClient({ children }: SelectDaughterClientProps) {
  const router = useRouter();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    if (!selectedChildId) {
      toast.error("请选择孩子", {
        description: "请选择要登录的孩子账户",
      });
      return;
    }

    setIsLoading(true);
    
    // Find the selected child
    const selectedChild = children.find(child => child.id === selectedChildId);
    
    // Simulate login process
    setTimeout(() => {
      toast.success(`欢迎 ${selectedChild?.name}！`, {
        description: "正在进入学习中心...",
      });
      
      // Navigate to the child's learning page
      router.push(`/learning/${selectedChildId}`);
    }, 1000);
  };

  // Get grade display name
  const getGradeDisplayName = (grade: string | null) => {
    if (!grade) return "未设置";
    return GRADE_DISPLAY_NAMES[grade] || grade;
  };

  // Get level display name
  const getLevelDisplayName = (level: string | null) => {
    if (!level) return "未设置";
    return LEVEL_DISPLAY_NAMES[level] || level;
  };

  // Get appropriate icon and color based on child's learning level
  const getChildConfig = (child: Child) => {
    const level = child.learningLevel;
    if (level === "ADVANCED") {
      return {
        icon: BookOpen,
        primaryColor: "from-blue-400 to-indigo-400",
        borderColor: "border-blue-300",
        bgColor: "bg-blue-50",
        hoverBorderColor: "hover:border-blue-200",
        textColor: "text-blue-500",
      };
    } else {
      return {
        icon: Sparkles,
        primaryColor: "from-pink-400 to-purple-400",
        borderColor: "border-pink-300",
        bgColor: "bg-pink-50",
        hoverBorderColor: "hover:border-pink-200",
        textColor: "text-pink-500",
      };
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-2xl shadow-xl border-2 border-purple-100">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-learning-blue via-learning-purple to-learning-pink flex items-center justify-center">
              <Users className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            欢迎来到 Kids Learning Hub
          </CardTitle>
          <CardDescription className="text-lg">
            请选择要登录的孩子账户
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Children selection cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => {
              const config = getChildConfig(child);
              const Icon = config.icon;
              
              return (
                <Card 
                  key={child.id}
                  className={`cursor-pointer transition-all border-2 ${selectedChildId === child.id ? `${config.borderColor} ${config.bgColor}` : "border-gray-200 " + config.hoverBorderColor}`}
                  onClick={() => setSelectedChildId(child.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${config.primaryColor} flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{child.name}</CardTitle>
                          <CardDescription>
                            {child.age ? `${child.age}岁 | ` : ""}
                            {getGradeDisplayName(child.grade)}
                            {child.learningLevel ? ` | ${getLevelDisplayName(child.learningLevel)}` : ""}
                          </CardDescription>
                        </div>
                      </div>
                      {selectedChildId === child.id && (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Target className={`h-4 w-4 ${config.textColor}`} />
                      <span className="font-medium">学习目标：</span>
                      <span>
                        {child.learningLevel === "ADVANCED" ? "2000个扩展词汇" : "300个基础单词"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {child.learningLevel === "ADVANCED" ? (
                        <BookOpen className="h-4 w-4 text-indigo-500" />
                      ) : (
                        <Gamepad2 className="h-4 w-4 text-purple-500" />
                      )}
                      <span className="font-medium">学习方式：</span>
                      <span>
                        {child.learningLevel === "ADVANCED" ? "系统化、深度理解" : "游戏化、短时高频"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">积分：</span>
                      <span>{child.points} / {child.totalPoints}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sister collaboration hint */}
          {children.length >= 2 && (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800">姐妹协作功能</h4>
                    <p className="text-sm text-green-700 mt-1">
                      登录后可以使用姐妹协作功能：一起学习、比赛、分享成就！
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-learning-blue to-learning-purple hover:opacity-90 h-12 text-lg"
            disabled={isLoading || !selectedChildId}
          >
            {isLoading ? "登录中..." : "进入学习中心"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            家长登录？{" "}
            <Link
              href="/parent/dashboard"
              className="font-medium text-learning-blue hover:underline"
            >
              点击这里进入家长面板
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">或</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">普通登录</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">注册新账户</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}