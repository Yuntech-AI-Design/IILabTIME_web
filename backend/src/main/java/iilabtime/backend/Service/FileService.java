package iilabtime.backend.Service;

import iilabtime.backend.Entity.FileStorage;
import iilabtime.backend.Entity.User;
import iilabtime.backend.Repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;
    private final String uploadDir = "uploads";

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

            Path filePath = Paths.get(dir.getAbsolutePath(), originalFilename);
            try {
                image.transferTo(filePath);
            } catch (IOException e) {
                throw new RuntimeException("無法儲存檔案：" + originalFilename, e);
            }
        }
        return storageId;
    }
}
