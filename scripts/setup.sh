#!/bin/bash

# Kids Learning Hub 项目设置脚本
# 用法: ./scripts/setup.sh

set -e

echo "🚀 开始设置 Kids Learning Hub 项目..."

# 检查 Node.js 版本
echo "📦 检查 Node.js 版本..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ 需要 Node.js 18 或更高版本"
    exit 1
fi
echo "✅ Node.js 版本: $(node -v)"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 设置环境变量
echo "🔧 设置环境变量..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "⚠️  请编辑 .env.local 文件配置环境变量"
fi

# 生成 Prisma 客户端
echo "🗄️  生成 Prisma 客户端..."
npx prisma generate

# 创建数据库（如果使用 SQLite）
if grep -q "sqlite" .env.local 2>/dev/null || grep -q "sqlite" .env.example 2>/dev/null; then
    echo "🗄️  创建 SQLite 数据库..."
    npx prisma db push
else
    echo "🗄️  请确保 PostgreSQL 数据库已启动并配置正确"
    echo "   运行: npx prisma db push"
fi

# 运行开发服务器检查
echo "🔍 检查项目配置..."
npx next build 2>&1 | grep -q "Build completed successfully" && echo "✅ 项目配置正确" || echo "⚠️  项目配置可能有问题"

echo ""
echo "🎉 项目设置完成！"
echo ""
echo "📋 下一步："
echo "1. 编辑 .env.local 文件配置环境变量"
echo "2. 运行数据库迁移: npx prisma db push"
echo "3. 启动开发服务器: npm run dev"
echo "4. 访问 http://localhost:3000"
echo ""
echo "🧪 测试命令："
echo "   npm test          # 运行单元测试"
echo "   npm run test:e2e  # 运行 E2E 测试"
echo "   npm run lint      # 代码检查"
echo ""
echo "🐳 Docker 部署："
echo "   docker-compose up # 使用 Docker Compose 启动"
echo ""
echo "📚 更多信息请查看 README.md"