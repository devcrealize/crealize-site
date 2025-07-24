#!/bin/bash

echo "🔍 死リンクチェック開始..."
echo "=========================="

# チェックするHTMLファイル
HTML_FILES=("index.html" "about.html" "services.html" "contact.html" "contact-confirm.html" "contact-success.html")

# 存在するファイルのリスト
EXISTING_FILES=(
    "index.html"
    "about.html" 
    "services.html"
    "contact.html"
    "contact-confirm.html"
    "contact-success.html"
    "images/favicon.svg"
    "images/logo.svg"
    "images/company-image.jpg"
    "images/case1.jpg"
    "images/case2.jpg"
)

echo "📋 チェック対象ファイル："
echo "----------------------"
for file in "${HTML_FILES[@]}"; do
    echo "  - $file"
done

echo ""
echo "🔍 死リンクチェック結果："
echo "----------------------"

# 各HTMLファイルのリンクをチェック
for html_file in "${HTML_FILES[@]}"; do
    if [ -f "$html_file" ]; then
        echo "📄 $html_file:"
        
        # href属性を持つリンクを抽出
        links=$(grep -o 'href="[^"]*"' "$html_file" | sed 's/href="//g' | sed 's/"//g')
        
        for link in $links; do
            # 外部リンクはスキップ
            if [[ $link == http* ]]; then
                continue
            fi
            
            # アンカーリンクはスキップ
            if [[ $link == \#* ]]; then
                continue
            fi
            
            # アンカーリンクを含むファイルリンクはチェック
            if [[ $link == *\#* ]]; then
                file_part=$(echo $link | cut -d'#' -f1)
                anchor_part=$(echo $link | cut -d'#' -f2)
                
                # ファイル部分の存在チェック
                if [ ! -f "$file_part" ]; then
                    echo "  ❌ 死リンク: $link (ファイルが存在しません)"
                    continue
                fi
                
                # アンカーの存在チェック
                if ! grep -q "id=\"$anchor_part\"" "$file_part"; then
                    echo "  ❌ 死リンク: $link (アンカーが存在しません)"
                else
                    echo "  ✅ 正常: $link"
                fi
                continue
            fi
            
            # 空のリンクはスキップ
            if [[ -z "$link" ]]; then
                continue
            fi
            
            # ファイルの存在チェック
            if [ ! -f "$link" ]; then
                echo "  ❌ 死リンク: $link"
            else
                echo "  ✅ 正常: $link"
            fi
        done
        echo ""
    fi
done

echo "✅ 死リンクチェック完了！" 