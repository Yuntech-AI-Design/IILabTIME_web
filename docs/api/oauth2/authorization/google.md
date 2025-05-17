# google
## 說明內容
```
google登入
```
- method: get
- path: /Google-Login
## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        RealName: String
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
        RealName: 回傳真實姓名
    }
    timestamp: 時間 
}
```
