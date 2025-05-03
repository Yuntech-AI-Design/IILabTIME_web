#!/bin/bash

# 確認 .env 存在
if [ ! -f ".env" ]; then
    echo "❌ .env not found"
    exit 1
fi

# 導入變數
while IFS='=' read -r key value || [ -n "$key" ]; do
    # 跳過註解或空行
    case "$key" in
        ''|\#*) continue ;;
    esac

    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)
    value="${value%\"}"; value="${value#\"}"
    value="${value%\'}"; value="${value#\'}"

    export "$key=$value"
    echo "✅ $key=$value"
done < .env

echo "🌱 All environment variables loaded."
