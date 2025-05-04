package iilabtime.backend.Contorller;

import iilabtime.backend.ApiResponse;
import iilabtime.backend.Repository.UserRepository;
import iilabtime.backend.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("Project")
public class FileStorageController extends AuthBaseController{
    @Autowired
    private FileService fileService;

    public FileStorageController(UserRepository userRepository) {
        super(userRepository);
    }

//    @PostMapping(value = "/UploadImage",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @RequestMapping(
            path = "/UploadImage",
            method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Long> uploadImages( @RequestPart("file") MultipartFile images) {
        System.out.println(images);
        //long id = fileService.uploadFiles(images,this.getAppUser());
        return ApiResponse.ok(200l);
    }
}
