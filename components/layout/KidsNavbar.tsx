'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: '🏠 首页', href: '/', emoji: '🏠' },
  { name: '🔤 英语学习', href: '/vocabulary', emoji: '🔤' },
  { name: '🧩 知识互动', href: '/interactive', emoji: '🧩' },
  { name: '📊 学习进度', href: '/progress', emoji: '📊' },
  { name: '🎮 游戏中心', href: '/games', emoji: '🎮' },
  { name: '🏆 成就墙', href: '/achievements', emoji: '🏆' },
]

export default function KidsNavbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="text-3xl mr-2">🎓</div>
                <div>
                  <h1 className="text-xl font-bold">Kids Learning Hub</h1>
                  <p className="text-xs opacity-80">儿童学习中心</p>
                </div>
              </div>
            </div>
          </div>

          {/* 桌面导航 */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-lg'
                        : 'text-white hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{item.emoji}</span>
                      {item.name}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* 用户区域 */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
              <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                <span className="text-lg">👧</span>
              </div>
              <div>
                <p className="text-sm font-medium">Naijing</p>
                <p className="text-xs opacity-80">三年级</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="bg-white text-blue-600 hover:bg-blue-50 border-white"
            >
              👨‍👩‍👧‍👦 家长模式
            </Button>
          </div>
        </div>

        {/* 移动导航 */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{item.emoji}</span>
                    {item.name}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}