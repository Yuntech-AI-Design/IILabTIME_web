package iilabtime.backend.Contorller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")  // 基礎路徑為 /test
public class TestController {

    @GetMapping("/test1")
    public String test1() {
        return "Hello from test1";
    }

    @GetMapping("/test2")
    public String test2() {
        return "Hello from test2";
    }
}