
# CheckInHistory
## 說明內容
```
打卡歷史紀錄
```
- method: get
- path:  CheckIn/CountTotalTime
## 送出
#### 數入參數
```
    {
        StartTime: Int,
        EndTime: Int   
    }
```
#### 說明
```
    {
        StartTime: 打卡紀錄起始筆數,
        EndTime: 打卡紀錄結束筆數   
    }
```

## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        CheckInHistory: [
            {
                StartDate: TimeStamp,
                EndDate: TimeStamp,
                TotalTime: Float,
            },
            {
                StartDate: TimeStamp,
                EndDate: TimeStamp,
                TotalTime: Float,
            },
            ...
        ]
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
        CheckInHistory: [
            {
                StartDate: 打卡開始時間,
                EndDate: 打卡結束時間,
                TotalTime: 總共打卡時間 (hour),
            },
            {
                StartDate: 打卡開始時間,
                EndDate: 打卡結束時間,
                TotalTime: 總共打卡時間 (hour),
            },
            ...
        ]
    }
    timestamp: 時間 
}
```
