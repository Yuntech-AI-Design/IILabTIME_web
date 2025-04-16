# CountUploadProject
#### 說明內容
```
這學期上傳的Project數
```
- method: get
- path: Project/CountUploadProject
## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        CountUploadProject: Int
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
        CountUploadProject:總共的作品上傳數
    }
    timestamp: 時間 
}
```