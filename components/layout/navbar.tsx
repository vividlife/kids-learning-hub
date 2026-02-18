"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Gamepad2, 
  Trophy, 
  BarChart3, 
  User, 
  Menu, 
  X,
  Home,
  Upload,
  Library
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  {
    title: "首页",
    href: "/",
    icon: Home,
  },
  {
    title: "单词学习",
    href: "/study/words",
    icon: BookOpen,
  },
  {
    title: "游戏中心",
    href: "/games",
    icon: Gamepad2,
  },
  {
    title: "学习进度",
    href: "/progress",
    icon: BarChart3,
  },
  {
    title: "成就",
    href: "/achievements",
    icon: Trophy,
  },
  {
    title: "资源库",
    href: "/library",
    icon: Library,
  },
  {
    title: "上传",
    href: "/upload",
    icon: Upload,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-learning-blue to-learning-purple flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 hidden sm:inline-block">
                Kids Learning Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gradient-to-r from-learning-blue/10 to-learning-purple/10 text-learning-blue"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex gap-2"
            >
              <User className="h-4 w-4" />
              登录
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-learning-blue to-learning-purple hover:opacity-90"
            >
              开始学习
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="grid gap-2">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gradient-to-r from-learning-blue/10 to-learning-purple/10 text-learning-blue"
                        : "text-slate-700 hover:bg-slate-100"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                );
              })}
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <User className="h-4 w-4" />
                  登录/注册
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}