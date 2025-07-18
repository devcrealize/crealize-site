#!/bin/bash

# メカセラ技研株式会社ウェブサイト デプロイスクリプト
# 使用方法: ./deploy.sh [コミットメッセージ]

echo "🚀 メカセラ技研ウェブサイト デプロイ開始..."

# コミットメッセージの設定
if [ -z "$1" ]; then
    COMMIT_MSG="Update website content"
else
    COMMIT_MSG="$1"
fi

# 現在の日時を取得
CURRENT_DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "📅 デプロイ日時: $CURRENT_DATE"
echo "💬 コミットメッセージ: $COMMIT_MSG"

# Gitの状態をチェック
echo "🔍 Gitの状態をチェック中..."
if [ -n "$(git status --porcelain)" ]; then
    echo "✅ 変更されたファイルを検出しました"
else
    echo "ℹ️  変更されたファイルはありません"
    exit 0
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
echo "📝 次のステップ:"
echo "1. GitHubリポジトリのSettings > PagesでGitHub Pagesを有効化"
echo "2. ソースを'Deploy from a branch'に設定"
echo "3. ブランチを'main'に設定"
echo "4. フォルダを'/' (root)に設定"
echo "5. Saveをクリック"
echo ""
echo "🎉 数分後にウェブサイトが公開されます！" 