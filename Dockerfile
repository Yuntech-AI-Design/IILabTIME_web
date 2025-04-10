FROM ubuntu:latest
LABEL authors="Cuzz_0908"

FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY target/backend-1.0-SNAPSHOT.jar app.jar
COPY backend/setup.sh setup.sh

RUN chmod +x setup.sh

CMD ["sh", "-c", "./setup.sh && java -jar app.jar"]
