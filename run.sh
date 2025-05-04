#!/bin/bash

# 設定變數
PROFILE="local"
JAR_PATH="backend/target/backend-0.0.1-SNAPSHOT.jar"
ENV_PATH="backend/.env"

echo "啟動中 (Profile=$PROFILE)..."

# 啟動 PostgreSQL（確認這裡的服務名稱和你的 docker-compose.yml 相同）
sudo docker compose up -d postgres-db

# 載入 .env 檔
if [ ! -f "$ENV_PATH" ]; then
    echo "❌ .env not found at $ENV_PATH"
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
done < "$ENV_PATH"

# 執行 Spring Boot 應用
java -Dspring.profiles.active=$PROFILE -jar $JAR_PATH
