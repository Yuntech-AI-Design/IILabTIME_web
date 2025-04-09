#!/bin/bash

# 檢查 .env 文件是否存在
if [ ! -f ".env" ]; then
    echo "錯誤：當前目錄下找不到 .env 文件"
    exit 1
fi

# 確保即使最後一行沒有換行符也能被處理
while IFS='=' read -r key value || [ -n "$key" ]; do
    # 跳過空行和註釋行（以 # 開頭）
    [[ -z "$key" || "$key" =~ ^# ]] && continue

    # 移除首尾的空白字符
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)

    # 如果 key 不為空，則導出變量
    if [ -n "$key" ]; then
        # 移除 value 兩邊的引號（如果有的話）
        value="${value%\"}"
        value="${value#\"}"
        value="${value%\'}"
        value="${value#\'}"

        export "$key=$value"
        echo "已導入: $key=$value"
    fi
done < ".env"

echo "環境變量導入完成！"