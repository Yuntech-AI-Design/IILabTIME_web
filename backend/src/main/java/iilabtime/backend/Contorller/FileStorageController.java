package iilabtime.backend.Contorller;

import iilabtime.backend.ApiResponse;
import iilabtime.backend.Repository.UserRepository;
import iilabtime.backend.Service.FileService;
import iilabtime.backend.SwaggerConfig;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


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
}
