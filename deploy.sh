#!/bin/bash

#!/bin/bash

# メカセラ技研株式会社ウェブサイト デプロイスクリプト
# 使用方法: ./deploy.sh [コミットメッセージ]

echo "🚀 メカセラ技研ウェブサイト デプロイ開始..."

# コミットメッセージの設定
if [ -z "$1" ]; then
    COMMIT_MSG="🚀 性能最適化デプロイ"
else
    COMMIT_MSG="$1"
fi

# 現在の日時を取得
CURRENT_DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "📅 デプロイ日時: $CURRENT_DATE"
echo "💬 コミットメッセージ: $COMMIT_MSG"

# アセット最適化
echo "⚡ アセット最適化中..."
if command -v cleancss &> /dev/null; then
    cleancss -o styles.min.css styles.css
    echo "✅ CSS最適化完了"
else
    echo "⚠️  clean-css-cli がインストールされていません"
fi

if command -v terser &> /dev/null; then
    terser script-optimized.js -o script-optimized.min.js
    echo "✅ JavaScript最適化完了"
else
    echo "⚠️  terser がインストールされていません"
fi

# Gitの状態をチェック
echo "🔍 Gitの状態をチェック中..."
if [ -n "$(git status --porcelain)" ]; then
    echo "✅ 変更されたファイルを検出しました"
else
    echo "ℹ️  変更されたファイルはありません"
fi

# 変更をステージング
echo "📦 変更をステージング中..."
git add .

# コミット
echo "💾 コミット中..."
git commit -m "$COMMIT_MSG - $CURRENT_DATE"

# GitHubにプッシュ
echo "🚀 GitHubにプッシュ中..."
git push origin main

# デプロイ完了
echo "✅ デプロイ完了！"
echo ""
echo "🌐 ウェブサイトURL: https://yveschen001.github.io/mekatech/"
echo "📁 GitHubリポジトリ: https://github.com/yveschen001/mekatech"
echo ""
echo "📝 GitHub Pages設定確認:"
echo "1. GitHubリポジトリのSettings > Pages"
echo "2. Source: 'Deploy from a branch'"
echo "3. Branch: 'main' / Folder: '/' (root)"
echo "4. Actions タブでデプロイ状況を確認"
echo ""
echo "🎉 数分後にウェブサイトが公開されます！" 