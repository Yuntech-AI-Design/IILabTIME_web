#!/bin/bash

if [ ! -f ".env" ]; then
    echo "❌ .env not found"
    exit 1
fi

while IFS= read -r line || [ -n "$line" ]; do
    # 去除前後空白
    line="$(echo "$line" | xargs)"

    # 跳過空行與註解
    [[ -z "$line" || "$line" =~ ^# ]] && continue

    # 確保有等號
    if [[ "$line" != *=* ]]; then
        echo "⚠️ 無效的行：$line"
        continue
    fi

    # 拆解 key=value
    key="${line%%=*}"
    value="${line#*=}"

    # 去除 key/value 兩邊空白與引號
    key="$(echo "$key" | xargs)"
    value="$(echo "$value" | xargs)"
    value="${value%\"}"; value="${value#\"}"
    value="${value%\'}"; value="${value#\'}"

    export "$key=$value"
    echo "✅ $key=$value"
done < .env
