# CheckOut
#### 說明內容
```
CheckOut紀錄CheckOut的時間
```
- method: post
- path: CheckIn/CheckOut
## 送出
#### 數入參數
```
    {
        timestamp: timestamp
        note: string     
    }
```
#### 說明
```
    {
        timestamp: 時間
        note: 筆記
    }
```

## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        duration: int
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
        duration: 回傳checkin到checkout的時間
    }
    timestamp: 時間 
}
```