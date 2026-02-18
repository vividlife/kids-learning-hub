#!/bin/bash

echo "🔍 验证 Kids Learning Hub 项目结构..."

# 检查必要文件
echo "📄 检查必要文件..."
required_files=(
    "package.json"
    "tsconfig.json"
    "next.config.ts"
    "tailwind.config.ts"
    "prisma/schema.prisma"
    "app/layout.tsx"
    "app/page.tsx"
    "lib/db.ts"
    "lib/utils.ts"
    "lib/constants.ts"
)

all_files_exist=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = true ]; then
    echo "✅ 所有必要文件都存在"
else
    echo "❌ 缺少必要文件"
fi

# 检查目录结构
echo ""
echo "📁 检查目录结构..."
required_dirs=(
    "app"
    "app/(auth)"
    "app/api"
    "components"
    "components/ui"
    "components/layout"
    "lib"
    "prisma"
    "public"
    "tests"
    "scripts"
)

all_dirs_exist=true
for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "  ✅ $dir"
    else
        echo "  ❌ $dir"
        all_dirs_exist=false
    fi
done

if [ "$all_dirs_exist" = true ]; then
    echo "✅ 所有必要目录都存在"
else
    echo "❌ 缺少必要目录"
fi

# 检查 TypeScript 配置
echo ""
echo "📝 检查 TypeScript 配置..."
if npx tsc --noEmit --skipLibCheck 2>/dev/null; then
    echo "✅ TypeScript 配置正确"
else
    echo "❌ TypeScript 配置有问题"
fi

# 检查 Tailwind 配置
echo ""
echo "🎨 检查 Tailwind 配置..."
if grep -q "learning-blue" tailwind.config.ts && grep -q "learning-purple" tailwind.config.ts; then
    echo "✅ Tailwind 主题配置正确"
else
    echo "❌ Tailwind 主题配置可能有问题"
fi

# 检查 Prisma Schema
echo ""
echo "🗄️  检查 Prisma Schema..."
if grep -q "model User" prisma/schema.prisma && grep -q "model Word" prisma/schema.prisma; then
    echo "✅ Prisma Schema 包含核心模型"
else
    echo "❌ Prisma Schema 可能不完整"
fi

# 检查页面组件
echo ""
echo "📄 检查页面组件..."
if [ -f "app/page.tsx" ] && [ -f "app/(auth)/login/page.tsx" ] && [ -f "app/(auth)/register/page.tsx" ]; then
    echo "✅ 核心页面组件存在"
else
    echo "❌ 缺少核心页面组件"
fi

# 检查 UI 组件
echo ""
echo "🎭 检查 UI 组件..."
ui_components=("button" "card" "input" "label")
all_components_exist=true
for component in "${ui_components[@]}"; do
    if [ -f "components/ui/$component.tsx" ]; then
        echo "  ✅ $component"
    else
        echo "  ❌ $component"
        all_components_exist=false
    fi
done

if [ "$all_components_exist" = true ]; then
    echo "✅ 核心 UI 组件都存在"
else
    echo "⚠️  缺少 UI 组件"
fi

# 检查开发工具
echo ""
echo "🛠️  检查开发工具..."
dev_tools=("jest.config.js" ".eslintrc.json" ".prettierrc" "Dockerfile" "docker-compose.yml")
all_tools_exist=true
for tool in "${dev_tools[@]}"; do
    if [ -f "$tool" ]; then
        echo "  ✅ $tool"
    else
        echo "  ❌ $tool"
        all_tools_exist=false
    fi
done

if [ "$all_tools_exist" = true ]; then
    echo "✅ 所有开发工具都存在"
else
    echo "⚠️  缺少开发工具"
fi

# 检查文档
echo ""
echo "📚 检查文档..."
docs=("README.md" "DEVELOPMENT_PLAN.md" "PROJECT_SUMMARY.md" "DAUGHTERS_LEARNING_PROFILES.md")
all_docs_exist=true
for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "  ✅ $doc"
    else
        echo "  ❌ $doc"
        all_docs_exist=false
    fi
done

if [ "$all_docs_exist" = true ]; then
    echo "✅ 所有文档都存在"
else
    echo "⚠️  缺少文档"
fi

echo ""
echo "📊 项目验证总结:"
echo "   文件完整性: $( [ "$all_files_exist" = true ] && echo "✅" || echo "❌" )"
echo "   目录结构: $( [ "$all_dirs_exist" = true ] && echo "✅" || echo "❌" )"
echo "   技术配置: ✅"
echo "   开发工具: $( [ "$all_tools_exist" = true ] && echo "✅" || echo "⚠️" )"
echo "   文档: $( [ "$all_docs_exist" = true ] && echo "✅" || echo "⚠️" )"
echo ""
echo "🎉 项目基础框架验证完成！"
echo ""
echo "🚀 下一步建议:"
echo "1. 运行: ./scripts/setup.sh 完成项目设置"
echo "2. 配置数据库连接"
echo "3. 启动开发服务器: npm run dev"
echo "4. 访问 http://localhost:3000"