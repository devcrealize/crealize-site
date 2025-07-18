#!/bin/bash

# メカセラ技研株式会社ウェブサイト ステータスチェックスクリプト

echo "🔍 メカセラ技研ウェブサイト ステータスチェック"
echo "================================================"

# 現在のブランチを表示
echo "📋 現在のブランチ: $(git branch --show-current)"

# 最新のコミット情報を表示
echo "📝 最新コミット:"
git log -1 --pretty=format:"   %h - %s (%cr)" --no-merges

# ファイル数を表示
echo "📁 ファイル数: $(find . -type f -name "*.html" -o -name "*.css" -o -name "*.js" | wc -l | tr -d ' ')"

# ウェブサイトファイルの一覧
echo "📄 ウェブサイトファイル:"
ls -la *.html *.css *.js 2>/dev/null | awk '{print "   " $9 " (" $5 " bytes)"}'

# GitHub Pages URL
echo ""
echo "🌐 GitHub Pages URL:"
echo "   https://yveschen001.github.io/mekatech/"
echo ""

# ローカルテストサーバーの状態
echo "🖥️  ローカルテスト:"
echo "   http://localhost:8000"
echo ""

# 次のステップ
echo "📝 次のステップ:"
echo "1. GitHubリポジトリにアクセス: https://github.com/yveschen001/mekatech"
echo "2. Settings > Pages でGitHub Pagesを有効化"
echo "3. ソース: Deploy from a branch"
echo "4. ブランチ: main"
echo "5. フォルダ: / (root)"
echo "6. Saveをクリック"
echo ""

echo "✅ ステータスチェック完了！" 