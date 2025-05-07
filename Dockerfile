FROM eclipse-temurin:21-jdk
WORKDIR /app

RUN apt-get update && apt-get install -y dos2unix

COPY backend/app.jar app.jar
COPY backend/.env .env
COPY backend/setup.sh setup.sh

RUN dos2unix setup.sh .env

RUN chmod +x setup.sh

# 使用 ENTRYPOINT 執行腳本與 JAR
ENTRYPOINT [ "sh", "-c", ". ./setup.sh && exec java -jar app.jar" ]
