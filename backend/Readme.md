# 🚀 後端程式執行教學

本說明將引導你在本地環境執行後端應用程式，請依照下列步驟操作。

---

## ✅ 環境需求

- Java 21 或以上版本（建議使用 [SDKMAN](https://sdkman.io/) 管理 Java 版本）
- Google Cloud Platform 帳號
- Unix-like 系統（macOS / Linux）或具備 WSL 的 Windows

---

## 📁 Step 1：設定環境變數檔案

1. 在專案根目錄找到 `example.env` 檔案。
2. 複製一份並重新命名為 `.env`：

   ```bash
   cp example.env .env
   ```
## ☁️ Step 2：建立 Google OAuth 憑證

1. 登入 [Google Cloud Console](https://console.cloud.google.com/)。
2. 建立新專案或使用既有專案。
3. 啟用 People API：
    - 前往「API 與服務」>「程式庫」
    - 搜尋 **People API** 並點擊「啟用」
4. 建立 OAuth 2.0 憑證：
    - 前往「API 與服務」>「憑證」
    - 點擊「建立憑證」>「OAuth 用戶端 ID」
    - 選擇應用程式類型（例如 Web 應用程式）
    - 設定必要的重新導向 URI（若有）
    - 建立後會取得以下資訊：
        - `GOOGLE_CLIENT_ID`
        - `GOOGLE_CLIENT_SECRET`
5. 將上述資訊填入 `.env` 檔案對應欄位：

   ```env
   GOOGLE_CLIENT_ID=你的_client_id
   GOOGLE_CLIENT_SECRET=你的_client_secret
   ```

## 🛠️ Step 3：載入環境設定

請在終端機執行下列指令來匯入 `.env` 中的變數：

```bash
source setup.sh
```
## ▶️ Step 4：執行後端應用程式

確認你已安裝 Java 21 或以上版本，然後執行：

```bash
java -jar backend-0.0.1.jar
```