#!/bin/bash

echo "🧹 プロジェクトクリーンアップ開始..."
echo "=================================="

# 削除するテストファイルのリスト
TEST_FILES=(
    "test.html"
    "test-layout.html"
    "test-text-display.html"
    "test-colors.html"
    "test-logo.html"
    "test-deploy.html"
    "test-mobile-menu.html"
    "mobile-layout-test.html"
    "performance-test.html"
    "simple-test.html"
    "formspree-test.html"
    "formspree-debug.html"
    "formspree-diagnostic.html"
    "contact-debug.html"
    "contact-direct.html"
    "google-maps-embed.html"
)

# 削除するドキュメントファイルのリスト
DOC_FILES=(
    "formspree-setup-guide.md"
    "formspree-setup.md"
    "contact-form-verification.md"
    "japanese-content-optimization-report.md"
    "seo-audit-report.md"
)

# 削除する古いスクリプトファイルのリスト
OLD_SCRIPT_FILES=(
    "script.js"
    "script.min.js"
    "critical.css"
)

# 削除する不要なデプロイファイルのリスト
DEPLOY_FILES=(
    "quick-deploy.sh"
    "check-status.sh"
    ".htaccess"
)

echo "📋 削除予定ファイル："
echo "-------------------"

# テストファイルを削除
echo "🗑️ テストファイルを削除中..."
for file in "${TEST_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  - $file"
        rm "$file"
    fi
done

# ドキュメントファイルを削除
echo "🗑️ ドキュメントファイルを削除中..."
for file in "${DOC_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  - $file"
        rm "$file"
    fi
done

# 古いスクリプトファイルを削除
echo "🗑️ 古いスクリプトファイルを削除中..."
for file in "${OLD_SCRIPT_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  - $file"
        rm "$file"
    fi
done

# 不要なデプロイファイルを削除
echo "🗑️ 不要なデプロイファイルを削除中..."
for file in "${DEPLOY_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  - $file"
        rm "$file"
    fi
done

echo ""
echo "📊 残存ファイル一覧："
echo "-------------------"
ls -la *.html *.css *.js *.sh *.md *.xml *.txt 2>/dev/null | grep -v node_modules

echo ""
echo "✅ クリーンアップ完了！"
echo "======================"
echo "残存ファイル："
echo "- メインページ: index.html, about.html, services.html, contact.html"
echo "- フォーム関連: contact-confirm.html, contact-success.html"
echo "- スタイル: styles.css, styles.min.css, critical.min.css"
echo "- スクリプト: script-optimized.js, script-optimized.min.js"
echo "- 設定ファイル: package.json, robots.txt, sitemap.xml, CNAME"
echo "- ビルドツール: build-optimized.sh, deploy.sh"
echo "- チェックツール: check-links.sh, cleanup-project.sh"
echo "- ドキュメント: README.md"
echo "- サービスワーカー: sw.js" 