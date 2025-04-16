# ThisWeekInternshipWork
## 說明內容
```
這個禮拜的實習進度
要實習的時數
以實習的時數
```
- method: get
- path: Internship/ThisWeekInternshipWork
## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        ThisWeekInternshipWork: Float,
        WeekNeedInternshipWork: Float
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
        ThisWeekInternshipWork: 本週實習時數 (小時 / 小數第一位),
        WeekNeedInternshipWork: 本週應該實習時數 (小時 / 小數第一位)
    }
    timestamp: 時間 
}
```