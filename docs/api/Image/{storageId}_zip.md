
# {storageId}/zip
#### 說明內容
```
檔案上傳
```
- method: post
- path: Image/{storageId}/zip
## 送出
#### 數入參數
```
    {
        storageId: long
    }
```
#### 說明
```
    {
        storageId: 圖片儲存的ID
    }
```

## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
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
        為下在檔案，暫空
    }
    timestamp: 時間 
}
```
