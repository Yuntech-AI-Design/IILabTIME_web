# TotalInternshipWork 
#### 說明內容
```
這學期總共實習時數
```
- method: get
- path: Internship/TotalInternshipWork
## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        NeedInternshipWork: Float,
        TotalDoInternshipWork: Float   
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
        TotalNeedInternshipWork: 總共需要的實習時數,
        TotalDoInternshipWork: 已經做的實習時數   
    }
    timestamp: 時間 
}
```