import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-kid",
});

export const metadata: Metadata = {
  title: "Kids Learning Hub - 儿童学习中心",
  description: "为孩子们设计的个性化学习平台，包含英语学习、知识点互动和学习进度跟踪",
  keywords: ["儿童学习", "英语学习", "教育游戏", "学习进度跟踪", "家长控制"],
  authors: [{ name: "Kids Learning Hub" }],
  creator: "Kids Learning Hub Team",
  publisher: "Kids Learning Hub",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://kids-learning-hub.com",
    title: "Kids Learning Hub - 儿童学习中心",
    description: "为孩子们设计的个性化学习平台",
    siteName: "Kids Learning Hub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} ${fredoka.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}