@echo off
set PROFILE=local
set JAR_PATH=backend\target\backend-0.0.1-SNAPSHOT.jar

echo Start（Profile=%PROFILE%）...
docker compose up -d postgres-db
java "-Dspring.profiles.active=%PROFILE%"-jar %JAR_PATH%

pause
