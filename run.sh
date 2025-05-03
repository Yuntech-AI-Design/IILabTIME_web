#!/bin/bash

# 設定變數
PROFILE="local"
JAR_PATH="backend/target/backend-0.0.1-SNAPSHOT.jar"

echo "啟動中 (Profile=$PROFILE)..."

# 啟動 PostgreSQL
sudo docker compose up -d postgres-db

# 執行 Spring Boot 應用
java -Dspring.profiles.active=local -jar $JAR_PATH
