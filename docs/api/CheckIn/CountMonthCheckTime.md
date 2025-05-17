
# CountMonthCheckTime
## 說明內容
```
累計當月的打卡次數(打卡/下班 算一次)
```
- method: get
- path:  CheckIn/CountMonthCheckTime
## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        CountMonthCheckTime: Int
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
        CountMonthCheckTime: 當月打卡次數
    }
    timestamp: 時間 
}
```
