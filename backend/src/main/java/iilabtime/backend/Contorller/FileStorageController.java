package iilabtime.backend.Contorller;

import iilabtime.backend.ApiResponse;
import iilabtime.backend.Repository.UserRepository;
import iilabtime.backend.Service.FileService;
import iilabtime.backend.SwaggerConfig;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;


@RestController
@RequestMapping("Project")
@SecurityRequirement(name = SwaggerConfig.securitySchemeName)
public class FileStorageController extends AuthBaseController{
    @Autowired
    private FileService fileService;

    public FileStorageController(UserRepository userRepository) {
        super(userRepository);
    }

    @RequestMapping(
            path = "/UploadImage",
            method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Long> uploadImages( @RequestPart("file") MultipartFile[] images) {
        long id = fileService.uploadFiles(images,this.getAppUser());
        return ApiResponse.ok(id);
    }

    @GetMapping("/{storageId}/zip")
    public ResponseEntity<StreamingResponseBody> downloadAllAsZip(@PathVariable Long storageId) {
        StreamingResponseBody stream = out -> {
            fileService.zipAllFiles(storageId, out);
        };

        String zipName = "files_" + storageId + ".zip";
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/zip"))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + zipName + "\"")
                .body(stream);
    }
}
