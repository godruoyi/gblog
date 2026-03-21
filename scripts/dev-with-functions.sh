#!/bin/bash

# 开发模式：Astro Dev + Wrangler Pages Functions
# 支持热更新 + Functions 同时运行

echo "🚀 Starting development server with Functions support..."
echo ""

# 检查是否已有进程在运行
if lsof -Pi :4321 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 4321 is already in use"
    echo "Killing existing process..."
    lsof -ti:4321 | xargs kill -9
fi

if lsof -Pi :8788 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8788 is already in use"
    echo "Killing existing process..."
    lsof -ti:8788 | xargs kill -9
fi

echo ""
echo "📝 Starting Astro dev server (port 4321)..."
echo "   - Hot reload enabled"
echo "   - Components will auto-refresh"
echo ""

# 在后台启动 Astro dev
pnpm run dev &
ASTRO_PID=$!

# 等待 Astro 启动
echo "⏳ Waiting for Astro to start..."
sleep 5

echo ""
echo "⚡ Starting Wrangler Pages dev (port 8788)..."
echo "   - Pages Functions enabled"
echo "   - Proxying to Astro dev server"
echo ""

# 启动 Wrangler，代理到 Astro dev
wrangler pages dev --proxy 4321 --port 8788 --ip 0.0.0.0

# 脚本退出时清理
trap "echo ''; echo '🛑 Stopping servers...'; kill $ASTRO_PID 2>/dev/null; exit" INT TERM EXIT
