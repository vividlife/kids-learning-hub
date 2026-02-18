"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Users, 
  Star,
  Gamepad2,
  Target,
  Calendar,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getDaughterConfig } from "@/lib/daughters";

interface DaughterDashboardProps {
  daughterId: "NAJING" | "NAXIN";
  userName: string;
  progress?: {
    wordsLearned: number;
    studyTime: number;
    streakDays: number;
    accuracy: number;
  };
}

export function DaughterDashboard({ daughterId, userName, progress }: DaughterDashboardProps) {
  const config = getDaughterConfig(daughterId);
  const [activeTab, setActiveTab] = useState<"overview" | "progress" | "goals" | "sister">("overview");

  // 默认进度数据
  const defaultProgress = {
    wordsLearned: 0,
    studyTime: 0,
    streakDays: 0,
    accuracy: 0,
  };

  const currentProgress = progress || defaultProgress;

  // 计算目标完成度
  const wordGoal = config.goals.ENGLISH.vocabulary.target;
  const wordProgress = Math.min((currentProgress.wordsLearned / wordGoal) * 100, 100);

  return (
    <div className="space-y-6">
      {/* 欢迎横幅 */}
      <Card className={cn(
        "border-2",
        daughterId === "NAJING" 
          ? "border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50" 
          : "border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
      )}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                欢迎回来，{userName}！ 👋
              </CardTitle>
              <CardDescription>
                {config.info.description}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Target className="h-3 w-3" />
                {config.info.grade === "GRADE_3" ? "三年级" : "高一"}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Star className="h-3 w-3" />
                {config.info.learningLevel === "BEGINNER" ? "初级" : "高级"}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 导航标签 */}
      <div className="flex space-x-2 border-b">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("overview")}
          className={cn(
            activeTab === "overview" && (
              daughterId === "NAJING" 
                ? "bg-gradient-to-r from-pink-500 to-purple-500" 
                : "bg-gradient-to-r from-blue-500 to-indigo-500"
            )
          )}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          学习概览
        </Button>
        <Button
          variant={activeTab === "progress" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("progress")}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          学习进度
        </Button>
        <Button
          variant={activeTab === "goals" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("goals")}
        >
          <Target className="h-4 w-4 mr-2" />
          学习目标
        </Button>
        <Button
          variant={activeTab === "sister" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("sister")}
        >
          <Users className="h-4 w-4 mr-2" />
          姐妹互动
        </Button>
      </div>

      {/* 学习概览 */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                已学单词
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {currentProgress.wordsLearned}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    目标 {wordGoal} 个
                  </div>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
              <Progress value={wordProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                学习时长
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {currentProgress.studyTime} 小时
                  </div>
                  <div className="text-xs text-muted-foreground">
                    本周学习
                  </div>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                连续学习
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {currentProgress.streakDays} 天
                  </div>
                  <div className="text-xs text-muted-foreground">
                    保持记录！
                  </div>
                </div>
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                正确率
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {currentProgress.accuracy}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    平均正确率
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 学习目标 */}
      {activeTab === "goals" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                英语学习目标
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">词汇量目标</span>
                  <span className="text-sm text-muted-foreground">
                    {currentProgress.wordsLearned} / {wordGoal}
                  </span>
                </div>
                <Progress value={wordProgress} />
                <div className="text-xs text-muted-foreground mt-1">
                  目标分类：{config.goals.ENGLISH.vocabulary.categories.join("、")}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">语法目标</h4>
                  <ul className="space-y-1 text-sm">
                    {config.goals.ENGLISH.grammar.topics.map((topic, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">口语目标</h4>
                  <ul className="space-y-1 text-sm">
                    {config.goals.ENGLISH.speaking.scenarios.map((scenario, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        {scenario}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                数学学习目标
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(config.goals.MATH).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <h4 className="font-medium">{value.target}</h4>
                    <ul className="space-y-1 text-sm">
                      {value.topics.map((topic: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-purple-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 快速开始学习 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            快速开始学习
          </CardTitle>
          <CardDescription>
            选择今天的学习内容
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-24 flex-col gap-2"
              variant="outline"
            >
              <BookOpen className="h-6 w-6" />
              <span>单词学习</span>
              <span className="text-xs text-muted-foreground">
                {daughterId === "NAJING" ? "5个新单词" : "15个新单词"}
              </span>
            </Button>

            <Button 
              className="h-24 flex-col gap-2"
              variant="outline"
            >
              <Gamepad2 className="h-6 w-6" />
              <span>学习游戏</span>
              <span className="text-xs text-muted-foreground">
                {daughterId === "NAJING" ? "趣味游戏" : "挑战游戏"}
              </span>
            </Button>

            <Button 
              className="h-24 flex-col gap-2"
              variant="outline"
            >
              <Trophy className="h-6 w-6" />
              <span>今日测验</span>
              <span className="text-xs text-muted-foreground">
                测试学习成果
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 今日学习计划 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            今日学习计划
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {config.studyPlan.DAILY.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center",
                    daughterId === "NAJING" 
                      ? "bg-pink-100 text-pink-600" 
                      : "bg-blue-100 text-blue-600"
                  )}>
                    {item.type === "vocabulary" && <BookOpen className="h-5 w-5" />}
                    {item.type === "game" && <Gamepad2 className="h-5 w-5" />}
                    {item.type === "math" && <Target className="h-5 w-5" />}
                    {item.type === "grammar" && <BookOpen className="h-5 w-5" />}
                    {item.type === "review" && <Clock className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="font-medium">{item.activity}</div>
                    <div className="text-sm text-muted-foreground">{item.time}</div>
                  </div>
                </div>
                <Button size="sm">开始</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}