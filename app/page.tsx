import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Gamepad2, Trophy, Users, Sparkles, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                专为小学生设计的个性化学习平台
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block text-slate-900">欢迎来到</span>
              <span className="block gradient-text">Kids Learning Hub</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              一个集英语学习、知识点互动、学习进度跟踪于一体的个人学习网站，
              专门为两个女儿（小学生年龄段）设计。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-learning-blue to-learning-purple hover:opacity-90" asChild>
                <a href="/select-daughter">
                  <Gamepad2 className="h-5 w-5" />
                  女儿登录
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="/parent/login">
                  <Users className="h-5 w-5" />
                  家长登录
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">核心功能</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            为孩子们提供有趣、有效的学习体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-hover border-2 border-blue-100">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">英语学习模块</CardTitle>
              <CardDescription>
                单词管理、闪卡学习、发音练习
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  支持上传单词列表
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  闪卡模式、选择题、拼写练习
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  TTS发音支持
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-purple-100">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Gamepad2 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">知识点互动模块</CardTitle>
              <CardDescription>
                游戏化学习、自适应难度
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  选择题、填空题、连线题
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  积分系统、徽章奖励
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  自适应难度调整
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-pink-100">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-pink-600" />
              </div>
              <CardTitle className="text-xl">学习管理模块</CardTitle>
              <CardDescription>
                进度跟踪、成就系统、家长控制
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  可视化学习进度图表
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  学习里程碑、奖励证书
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  家长控制面板
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-learning-blue to-learning-purple text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始学习之旅了吗？</h2>
          <p className="text-xl mb-8 opacity-90">
            为您的孩子创建个性化学习体验
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2">
              <Users className="h-5 w-5" />
              注册家长账户
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-white border-white hover:bg-white/10">
              了解更多
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">Kids Learning Hub</h3>
              <p className="text-sm">© 2024 儿童学习中心. 保留所有权利.</p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                隐私政策
              </Link>
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                使用条款
              </Link>
              <Link href="/contact" className="text-sm hover:text-white transition-colors">
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}