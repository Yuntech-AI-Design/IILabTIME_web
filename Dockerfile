FROM eclipse-temurin:21-jdk
WORKDIR /app

COPY backend/app.jar app.jar
COPY backend/.env .env
COPY backend/setup.sh setup.sh

RUN chmod +x setup.sh

# 用 ENTRYPOINT 來 source + run jar
ENTRYPOINT [ "sh", "-c", ". ./setup.sh && exec java -jar app.jar" ]
