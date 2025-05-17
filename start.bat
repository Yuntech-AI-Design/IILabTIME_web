@echo off
setlocal enabledelayedexpansion

REM 設定變數
set "PROFILE=local"
set "JAR_PATH=backend\target\backend-0.0.1-SNAPSHOT.jar"
set "ENV_PATH=backend\.env"

echo 啟動中 (Profile=%PROFILE%)...

REM 啟動 PostgreSQL Docker container（需要安裝 Docker Desktop 且支援 docker compose）
docker compose up -d postgres-db

REM 檢查 .env 檔是否存在
if not exist "%ENV_PATH%" (
    echo ❌ .env not found at %ENV_PATH%
    exit /b 1
)

REM 讀取 .env 並設定環境變數
for /f "usebackq tokens=1,* delims==" %%A in ("%ENV_PATH%") do (
    set "key=%%A"
    set "value=%%B"

    REM 移除前後空白
    for /f "tokens=* delims= " %%i in ("!key!") do set "key=%%i"
    for /f "tokens=* delims= " %%i in ("!value!") do set "value=%%i"

    REM 移除前後引號
    set "value=!value:"=!"
    set "value=!value:'=!"

    REM 設定環境變數
    set "!key!=!value!"
    echo ✅ !key!=!value!
)

REM 執行 Spring Boot JAR
java -Dspring.profiles.active=%PROFILE% -jar %JAR_PATH%
