'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { Users, BarChart3, FileText, Settings, Home, Child } from 'lucide-react'

const parentNavItems = [
  { name: '仪表盘', href: '/parent', icon: Home },
  { name: '孩子管理', href: '/parent/children', icon: Users },
  { name: '学习报告', href: '/parent/reports', icon: BarChart3 },
  { name: '学习内容', href: '/parent/content', icon: FileText },
  { name: '设置', href: '/parent/settings', icon: Settings },
]

export default function ParentNavbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="text-3xl mr-2">👨‍👩‍👧‍👦</div>
                <div>
                  <h1 className="text-xl font-bold">家长控制中心</h1>
                  <p className="text-xs opacity-80">{session?.user?.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {parentNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    pathname === item.href
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : 'text-white hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-white text-indigo-600 hover:bg-indigo-50">
              切换孩子模式
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}