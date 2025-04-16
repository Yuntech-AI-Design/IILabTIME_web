# CountTotalInternshipTime
## 說明內容
```
累計一學期實習時數
```
- method: get
- path: Internship/CountTotalInternshipTime
## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        CountTotalInternshipTime: Float
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
        CountTotalInternshipTime 總累計實習時數 (小時 / 小數第一位)
    }
    timestamp: 時間 
}
```