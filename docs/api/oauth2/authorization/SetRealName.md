# SetRealName
## 說明內容
```
google登入後如果沒有真名要用
```
- method: post
- path: oauth2/authorization/SetRealName
## 送出
#### 數入參數
```
    {
        RealName: String
    }
```
#### 說明
```
    {
        RealName: 傳入真實名稱
    }
```

## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    timestamp: TimeStamp

}
```
#### 說明
```
{
    status: 200/300/400
    message: 正確錯誤訊息
    timestamp: 時間 
}
```