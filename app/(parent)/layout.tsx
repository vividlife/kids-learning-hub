import type { Metadata } from 'next'
import { Inter, Fredoka } from 'next/font/google'
import ParentNavbar from '@/components/layout/ParentNavbar'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-kid',
})

export const metadata: Metadata = {
  title: '家长控制中心 - Kids Learning Hub',
  description: '家长管理孩子学习进度和账户',
}

export default async function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'PARENT') {
    redirect('/')
  }

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} ${fredoka.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ParentNavbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}