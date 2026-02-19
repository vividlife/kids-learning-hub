# Kids Learning Hub - 儿童学习中心

一个集英语学习、知识点互动、学习进度跟踪于一体的个人学习网站，专门为两个女儿（小学生年龄段）设计。

## 🎯 项目目标

创建一个儿童友好的学习平台，通过游戏化学习、个性化路径和家长控制，提升孩子的学习兴趣和效果。

## 🚀 快速开始 (开发环境)

### 环境要求
- Node.js 18+ 
- 使用 SQLite (开发) 或 PostgreSQL 14+ (生产)

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/vividlife/kids-learning-hub.git
cd kids-learning-hub
```

2. **安装依赖**
```bash
npm install
```

3. **环境配置**
```bash
cp .env.example .env
# 编辑 .env，开发使用 SQLite: DATABASE_URL=&quot;file:./dev.db&quot;
```

4. **数据库设置**
```bash
npx prisma generate
npx prisma db push
```

5. **启动开发服务器**
```bash
npm run dev
```

访问 http://localhost:3000

## 🌐 生产部署 (Vercel 推荐)

### 1. Vercel 配置
- 项目已包含 `vercel.json` (可选，Next.js 自动优化)
- `next.config.ts` 配置图像优化和 serverActions

### 2. 环境变量 (Vercel Dashboard)
从 `.env.example` 复制：
```
DATABASE_URL=postgresql://... (Vercel Postgres / Neon / Supabase)
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=openssl rand -hex 32 生成
OPENAI_API_KEY=sk-... (可选)
NODE_ENV=production
APP_URL=https://your-app.vercel.app
```

**重要**: 更新 `prisma/schema.prisma` provider 为 `&quot;postgresql&quot;` 后：
```bash
npx prisma db push  # 或 migrate deploy
npx prisma generate
git commit &amp;&amp; git push
```

### 3. 数据库准备
- **推荐**: Vercel Postgres (免费起步)
  1. Vercel Dashboard → Storage → Create PostgreSQL
  2. 复制 DATABASE_URL 到环境变量
  3. 部署后，Vercel 会自动运行 build (prisma generate)
- **备选**: Neon / Supabase / Railway

### 4. 部署步骤
```bash
# 本地预览生产构建
npm run build
npm start

# Vercel CLI (可选)
npm i -g vercel
vercel --prod
```

**自动部署**: Push 到 GitHub → Vercel 自动构建/部署。

### 5. Docker 部署 (备选)
```bash
docker-compose up -d
```

## 📁 项目结构
*(保持原样)*

## 🛠️ 技术栈
*(保持原样)*

## 📋 核心功能
*(保持原样)*

## 🎨 设计原则
*(保持原样)*

## 📊 开发进度
- **第17天完成**: 部署配置 (Vercel + Postgres 准备)、环境变量管理、README 部署指南、最终提交 & push

## 📊 成功指标
*(保持原样)*

## 🧪 测试
```bash
npm test
npm run test:e2e
```

## 📝 代码规范
*(保持原样)*

## 🤝 贡献指南
*(保持原样)*

## 📄 许可证
MIT

## 📞 联系方式
GitHub Issues

---

**Happy Learning! 🎉**