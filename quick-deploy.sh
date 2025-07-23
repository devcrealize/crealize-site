#!/bin/bash

echo "🚀 メカセラ技研 - 快速部署"
echo "================================"

# 检查是否有未提交的更改
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 发现未提交的更改，正在提交..."
    git add .
    git commit -m "🚀 快速部署更新 $(date '+%Y-%m-%d %H:%M:%S')"
else
    echo "✅ 没有未提交的更改"
fi

# 推送到GitHub
echo "📤 推送到GitHub..."
git push origin main

echo ""
echo "✅ 部署完成！"
echo "🌐 网站地址: https://yveschen001.github.io/mekatech/"
echo "📁 仓库地址: https://github.com/yveschen001/mekatech"
echo ""
echo "⏱️  请等待几分钟让GitHub Pages完成部署..."
echo "📊 可以在Actions标签页查看部署进度" 