package iilabtime.backend.Contorller;


import iilabtime.backend.ApiResponse;
import org.springframework.web.bind.annotation.*;

@AuthApiController
@RequestMapping("/test")  // 基礎路徑為 /test
public class TestController extends AuthBaseController{

    @GetMapping("/test1")
    public String test1() {
        return "Hello from test1";
    }

    @GetMapping("/test2")
    public String test2() {
        return "Hello from test2";
    }

    @PostMapping("/test3")
    public ApiResponse<String> test3(@RequestParam String ipt){
        return ApiResponse.ok(ipt);
    }
}