#!/bin/bash

echo "🔍 检查所有HTML页面的链接一致性..."
echo "=================================="

# 检查CSS文件引用
echo "📋 CSS文件引用情况："
echo "-------------------"
grep -r "styles.*\.css" *.html | grep -v "test" | sort

echo ""
echo "📋 JavaScript文件引用情况："
echo "------------------------"
grep -r "script.*\.js" *.html | grep -v "test" | sort

echo ""
echo "📋 导航链接检查："
echo "---------------"
echo "检查index.html导航链接："
grep -A 5 -B 1 "nav-menu" index.html | grep "href="

echo ""
echo "检查services.html导航链接："
grep -A 5 -B 1 "nav-menu" services.html | grep "href="

echo ""
echo "检查about.html导航链接："
grep -A 5 -B 1 "nav-menu" about.html | grep "href="

echo ""
echo "检查contact.html导航链接："
grep -A 5 -B 1 "nav-menu" contact.html | grep "href="

echo ""
echo "📋 Footer链接检查："
echo "----------------"
echo "检查index.html footer链接："
grep -A 10 -B 1 "footer-section" index.html | grep "href="

echo ""
echo "检查services.html footer链接："
grep -A 10 -B 1 "footer-section" services.html | grep "href="

echo ""
echo "检查about.html footer链接："
grep -A 10 -B 1 "footer-section" about.html | grep "href="

echo ""
echo "检查contact.html footer链接："
grep -A 10 -B 1 "footer-section" contact.html | grep "href="

echo ""
echo "✅ 链接一致性检查完成！" 