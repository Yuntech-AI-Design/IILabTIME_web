# API 規則

## status
- 200 
    - 成功
- 400
    - 失敗
## 後端 
- data 回傳
    - json

## 前端
```
baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000/api',
headers: {
'Content-Type': 'application/json'
}
```

# {{ filename }}
- method: get/post/delete/put
- path: xxx/xxx/xxx/xxx
## 送出
#### 數入參數
```
    {
        什麼東西: type
    }
```
#### 說明
```
    {
        object: array
    }
```

## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {

    }
    timestamp: TimeStamp

}
```
#### 說明
```
{
    status: 200/300/400
    message: 正確錯誤訊息
    data: {

    }
    timestamp: 時間 
}
```