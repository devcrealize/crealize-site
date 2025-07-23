#!/bin/bash

echo "🚀 开始优化构建..."

# 清理旧文件
echo "🧹 清理旧文件..."
rm -f styles.min.css script-optimized.min.js

# 压缩CSS
echo "📦 压缩CSS..."
npx cleancss -o styles.min.css styles.css

# 压缩JavaScript
echo "📦 压缩JavaScript..."
npx terser script-optimized.js -o script-optimized.min.js --compress --mangle

# 创建关键CSS文件
echo "🎯 创建关键CSS..."
npx cleancss -o critical.min.css critical.css

# 检查文件大小
echo "📊 文件大小检查:"
echo "styles.min.css: $(du -h styles.min.css | cut -f1)"
echo "script-optimized.min.js: $(du -h script-optimized.min.js | cut -f1)"
echo "critical.min.css: $(du -h critical.min.css | cut -f1)"

echo "✅ 构建完成！" 