FROM eclipse-temurin:21-jdk
WORKDIR /app

# 安裝 dos2unix 並清理 apt cache
RUN apt-get update \
 && apt-get install -y dos2unix \
 && rm -rf /var/lib/apt/lists/*

# 複製應用程式目錄與啟動腳本
COPY backend ./backend
COPY run-test.sh ./run-test.sh

# 轉換換行並賦予執行權限
RUN dos2unix run-test.sh backend/.env \
 && chmod +x run-test.sh

# 開放 8888 埠
EXPOSE 8888

# 執行上層的 run.sh
ENTRYPOINT ["sh", "-c", "./run-test.sh"]