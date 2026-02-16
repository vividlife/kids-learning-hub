# Kids Learning Hub - 儿童学习中心

一个集英语学习、知识点互动、学习进度跟踪于一体的个人学习网站，专门为两个女儿（小学生年龄段）设计。

## 🎯 项目目标

创建一个儿童友好的学习平台，通过游戏化学习、个性化路径和家长控制，提升孩子的学习兴趣和效果。

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- PostgreSQL 14+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd kids-learning-hub
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **环境配置**
```bash
cp .env.example .env.local
# 编辑 .env.local 文件，配置数据库和其他环境变量
```

4. **数据库设置**
```bash
# 生成 Prisma 客户端
npx prisma generate

# 创建数据库迁移
npx prisma db push
# 或使用迁移
npx prisma migrate dev --name init
```

5. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:3000

## 📁 项目结构

```
kids-learning-hub/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/           # 认证相关页面
│   ├── (parent)/         # 家长控制面板
│   ├── (kids)/           # 孩子学习界面
│   ├── api/              # API路由
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 首页
├── components/           # React组件
│   ├── ui/              # 基础UI组件 (shadcn/ui)
│   ├── learning/         # 学习相关组件
│   ├── games/           # 游戏化组件
│   └── dashboard/       # 仪表板组件
├── lib/                  # 工具函数和配置
│   ├── db/              # 数据库配置
│   ├── ai/              # AI集成
│   ├── utils/           # 工具函数
│   └── constants/       # 常量定义
├── prisma/              # Prisma schema和迁移
├── public/              # 静态资源
├── styles/              # 全局样式
└── tests/               # 测试文件
```

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + Shadcn/ui
- **状态管理**: Zustand
- **表单处理**: React Hook Form + Zod
- **图表**: Recharts
- **多媒体**: React Player, React Audio Player

### 后端
- **框架**: Next.js API Routes (全栈方案)
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js
- **文件存储**: 本地存储 + 可扩展至云存储

### 开发工具
- **代码质量**: ESLint + Prettier + Husky
- **测试**: Jest + React Testing Library + Playwright
- **部署**: Vercel (推荐) 或 Docker

## 📋 核心功能

### 1. 英语学习模块
- 单词管理 (CSV/Excel/TXT上传)
- 闪卡学习系统
- 选择题和拼写练习
- TTS发音支持 (美式/英式)
- 学习进度跟踪

### 2. 知识点互动模块
- 自动生成互动式学习页面
- 多种题型: 选择题、填空题、连线题、排序题
- 多媒体内容支持
- 游戏化学习 (积分、徽章、排行榜)
- 自适应难度调整

### 3. 学习管理模块
- 多用户账户管理 (家长/孩子)
- 学习计划和任务管理
- 可视化进度报告
- 成就系统和奖励证书
- 家长控制面板

### 4. 内容管理模块
- 学习材料上传 (PDF、图片、音频、视频)
- 内容分类管理
- AI辅助内容生成
- 可复用模板系统

## 🎨 设计原则

### 用户体验
- **儿童友好**: 明亮色彩、大字体、简单导航
- **响应式设计**: 支持平板、电脑、手机
- **无障碍访问**: 符合WCAG标准
- **加载性能**: 快速加载，优化图片和资源

### 安全性
- **数据保护**: 学习数据加密存储
- **家长控制**: 严格的内容审核和权限控制
- **隐私保护**: 不收集不必要的个人信息
- **安全认证**: 安全的登录和会话管理

## 🚀 开发计划

### 第一阶段：基础框架 (1-2天)
- [x] 项目初始化 (Next.js + TypeScript + Tailwind)
- [x] 数据库设计和Prisma配置
- [ ] 用户认证系统 (NextAuth.js)
- [ ] 基础UI组件库

### 第二阶段：核心功能 (3-5天)
- [ ] 单词管理模块
- [ ] 闪卡学习系统
- [ ] 练习题生成
- [ ] 学习进度跟踪

### 第三阶段：高级功能 (5-7天)
- [ ] AI辅助学习内容生成
- [ ] 游戏化学习系统
- [ ] 多媒体内容支持
- [ ] 家长控制面板

### 第四阶段：优化部署 (2-3天)
- [ ] 性能优化
- [ ] 测试覆盖
- [ ] 部署配置
- [ ] 文档编写

## 📊 成功指标

### 技术指标
- 页面加载时间 < 2秒
- Lighthouse评分 > 90
- 测试覆盖率 > 80%
- 无重大安全漏洞

### 用户体验指标
- 孩子可以独立使用核心功能
- 家长可以轻松管理学习内容
- 学习数据准确可靠
- 界面直观易用

## 🧪 测试

```bash
# 单元测试
npm test

# E2E测试
npm run test:e2e

# 测试覆盖率
npm test -- --coverage
```

## 🐳 Docker 部署

```bash
# 构建镜像
docker build -t kids-learning-hub .

# 运行容器
docker run -p 3000:3000 kids-learning-hub
```

## 📝 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 配置
- 提交前自动格式化代码
- 编写有意义的提交信息

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 项目 Issues: [GitHub Issues](https://github.com/your-username/kids-learning-hub/issues)
- 邮箱: your-email@example.com

---

**Happy Learning! 🎉**