# CountTimeToTimeHour
## 說明內容
```
累計StardTime到EndTime的打卡小時
```
- method: get
- path:  CheckIn/CountTimeToTimeHour?startTime=(Timestamp)&endTime=(Timestamp)
## 送出
#### 數入參數
```
    {
        startTime: Timestamp,
        endTime: Timestamp     
    }
```
#### 說明
```
    {
        startTime: 起始時間,
        endTime: 結束時間     
    }
```

## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        CountTimeToTimeHour: Float
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
        CountTimeToTimeHour: 計算start到end的總打卡時間
    }
    timestamp: 時間 
}
```