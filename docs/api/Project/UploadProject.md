# UploadProject
#### 說明內容
```
上傳圖片及文字(須滿6小時)
圖片檔案格式:.png .jpg .jpeg
```
- method: post
- path: Project/UploadProject
## 送出
#### 數入參數
```
    {
        location: string,
        content: string,
        observe_record: string,
        reflection: string,
        find_hard: string,
        solve_method: string,
        other: string,
        images: long,
    }
```
#### 說明
```
    {
        location: 實習位置,
        content: 實習內容,
        observe_record: 實習觀察記錄,
        reflection: 實習心得與反思,
        find_hard: 實習所遇到的困難,
        solve_method: 解決方法,
        other: 其他事項,
        images: 照片 id(long),
    }
```

## 回傳
#### 數據格式
```
{
    status: 200/300/400
    message: String
    data: {
        id: long
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
        id: 這筆Pkey
    }
    timestamp: 時間 
}
```