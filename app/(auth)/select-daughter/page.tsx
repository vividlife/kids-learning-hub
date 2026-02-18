"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { BookOpen, Users, Sparkles, Star, Target, Gamepad2 } from "lucide-react";
import { DAUGHTERS } from "@/lib/daughters";

export default function SelectDaughterPage() {
  const router = useRouter();
  const [selectedDaughter, setSelectedDaughter] = useState<"NAJING" | "NAXIN" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    if (!selectedDaughter) {
      toast.error("请选择女儿", {
        description: "请选择要登录的女儿账户",
      });
      return;
    }

    setIsLoading(true);
    
    // 模拟登录过程
    setTimeout(() => {
      const daughter = DAUGHTERS[selectedDaughter];
      toast.success(`欢迎 ${daughter.displayName}！`, {
        description: "正在进入学习中心...",
      });
      
      // 跳转到对应的学习界面
      router.push(`/learning/${selectedDaughter.toLowerCase()}`);
    }, 1000);
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
            请选择要登录的女儿账户
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* 女儿选择卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 黄乃静卡片 */}
            <Card 
              className={`cursor-pointer transition-all border-2 ${selectedDaughter === "NAJING" ? "border-pink-300 bg-pink-50" : "border-gray-200 hover:border-pink-200"}`}
              onClick={() => setSelectedDaughter("NAJING")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">黄乃静</CardTitle>
                      <CardDescription>三年级 | 9岁</CardDescription>
                    </div>
                  </div>
                  {selectedDaughter === "NAJING" && (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-pink-500" />
                  <span className="font-medium">学习目标：</span>
                  <span>300个基础单词</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gamepad2 className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">学习方式：</span>
                  <span>游戏化、短时高频</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">界面风格：</span>
                  <span>卡通可爱、视觉丰富</span>
                </div>
              </CardContent>
            </Card>

            {/* 黄乃馨卡片 */}
            <Card 
              className={`cursor-pointer transition-all border-2 ${selectedDaughter === "NAXIN" ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}
              onClick={() => setSelectedDaughter("NAXIN")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">黄乃馨</CardTitle>
                      <CardDescription>高一 | 15岁</CardDescription>
                    </div>
                  </div>
                  {selectedDaughter === "NAXIN" && (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">学习目标：</span>
                  <span>2000个扩展词汇</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  <span className="font-medium">学习方式：</span>
                  <span>系统化、深度理解</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">界面风格：</span>
                  <span>简约专业、高效布局</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 姐妹协作提示 */}
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
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-learning-blue to-learning-purple hover:opacity-90 h-12 text-lg"
            disabled={isLoading || !selectedDaughter}
          >
            {isLoading ? "登录中..." : "进入学习中心"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            家长登录？{" "}
            <Link
              href="/parent/login"
              className="font-medium text-learning-blue hover:underline"
            >
              点击这里
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