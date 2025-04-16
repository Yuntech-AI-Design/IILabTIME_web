# CountCheckIn
## 說明內容
```
累計一學期總共打卡次數
```
- method: get
- path:  CheckIn/CountCheckIn
## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        CountCheckIn: Int
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
        CountCheckIn: 總共打卡次數
    }
    timestamp: 時間 
}
```
