#!/bin/bash

# 設定變數
PROFILE="local"
JAR_PATH="backend/app.jar"
ENV_PATH="backend/.env"

echo "啟動中 (Profile=$PROFILE)..."

# 啟動 PostgreSQL
docker compose up -d postgres-db

dos2unix $ENV_PATH

# 載入 .env
if [ ! -f "$ENV_PATH" ]; then
    echo "❌ .env not found at $ENV_PATH"
    exit 1
fi

while IFS= read -r line || [ -n "$line" ]; do
    line="$(echo "$line" | xargs)"
    [[ -z "$line" || "$line" =~ ^# ]] && continue
    if [[ "$line" != *=* ]]; then
        echo "⚠️ 無效的行：$line"
        continue
    fi
    key="${line%%=*}"
    value="${line#*=}"
    key="$(echo "$key" | xargs)"
    value="$(echo "$value" | xargs)"
    value="${value%\"}"; value="${value#\"}"
    value="${value%\'}"; value="${value#\'}"
    export "$key=$value"
    echo "✅ $key=$value"
done < "$ENV_PATH"

# 執行 Spring Boot
java -Dspring.profiles.active=$PROFILE -jar $JAR_PATH
