FROM eclipse-temurin:21-jdk
LABEL authors="Cuzz_0908"

WORKDIR /app

COPY backend/app.jar app.jar
COPY backend/setup.sh setup.sh
COPY backend/.env .env

RUN chmod +x setup.sh

CMD ["sh", "-c", "./setup.sh && java -jar -Dspring.profiles.active=test app.jar"]
