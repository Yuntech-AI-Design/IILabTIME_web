# CountTotalTime
## 說明內容
```
累計一學期總共打卡時數
```
- method: get
- path:  CheckIn/CountTotalTime
## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        CountTotalTime: Float
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
        CountTotalTime: 總打卡時數
    }
    timestamp: 時間 
}
```
