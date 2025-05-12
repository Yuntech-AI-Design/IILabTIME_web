package iilabtime.backend.Service;

import iilabtime.backend.Entity.FileStorage;
import iilabtime.backend.Entity.User;
import iilabtime.backend.Errors.InternalServerError;
import iilabtime.backend.Errors.NotFoundError;
import iilabtime.backend.Repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;
    private final String uploadDir = "./uploads";

    public long uploadFiles(MultipartFile[] images, User user){
        FileStorage fileStorage = fileRepository.save(
                FileStorage.builder()
                        .user(user)
                        .build()
        );
        long storageId = fileStorage.getId();

        File dir = new File(uploadDir + File.separator + storageId);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        for (MultipartFile image : images) {
            String originalFilename = image.getOriginalFilename();
            String contentType = image.getContentType();
            if (originalFilename == null || !isImageValid(originalFilename, contentType)) {
                throw new InternalServerError("檔案格式不支援，僅限 jpg, jpeg, png：" + originalFilename);
            }

            Path filePath = Paths.get(dir.getAbsolutePath(), originalFilename);
            System.out.println(filePath);
            try {
                image.transferTo(filePath);
            } catch (IOException e) {
                throw new RuntimeException("無法儲存檔案：" + originalFilename, e);
            }
        }
        return storageId;
    }

    public void zipAllFiles(Long storageId, OutputStream os) {
        Path dir = Paths.get(uploadDir, storageId.toString());
        if (!Files.exists(dir) || !Files.isDirectory(dir)) {
            throw new NotFoundError("Storage folder not found for id=" + storageId);
        }

        try (ZipOutputStream zipOut = new ZipOutputStream(os);
             Stream<Path> files = Files.list(dir)) {

            files.forEach(path -> {
                try {
                    // 建立 zip entry，entry 名就用檔名
                    ZipEntry entry = new ZipEntry(path.getFileName().toString());
                    zipOut.putNextEntry(entry);

                    // 把檔案內容 copy 到 zip
                    Files.copy(path, zipOut);
                    zipOut.closeEntry();
                } catch (IOException e) {
                    throw new RuntimeException("Error zipping file: " + path, e);
                }
            });

            zipOut.finish();
        } catch (IOException e) {
            throw new InternalServerError("Error creating ZIP for id=" + storageId +" "+e);
        }
    }

    private boolean isImageValid(String filename, String contentType) {
        String lowerName = filename.toLowerCase();
        boolean extValid = lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg") || lowerName.endsWith(".png");
        boolean mimeValid = contentType != null && (
                contentType.equals("image/jpeg") ||
                        contentType.equals("image/png")
        );
        return extValid && mimeValid;
    }
}
