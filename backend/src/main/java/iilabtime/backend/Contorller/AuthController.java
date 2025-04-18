package iilabtime.backend.Contorller;

import iilabtime.backend.ApiResponse;
import iilabtime.backend.Entity.User;
import iilabtime.backend.Repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
public class AuthController {

    private UserRepository userRepository;

    @Operation(summary = "取得目前登入的使用者資訊")
    @GetMapping("/me")
    public Object me(@AuthenticationPrincipal OAuth2User user) {
        return user != null ? user.getAttributes() : "未登入";
    }

    @Operation(summary = "取得登入的使用者資訊")
    @GetMapping("/oauth2/authorization/google")
    public ApiResponse<Object> google_login(@AuthenticationPrincipal OAuth2User user) {
        if(user != null){
            String email = user.getAttribute("email");
            Optional<User> user1 = userRepository.findByEmail(email);
            String RealName = user1.get().getRealName();
            Map<String, String> data = Map.of("RealName", RealName);

            if(RealName != null){
                return ApiResponse.ok(data);
            }else{
                return ApiResponse.fail("尚未設定真實姓名");
            }

        }else{
            return ApiResponse.fail("未登入");
        }
    }

    @Operation(summary = "設定真實姓名")
    @PostMapping("/oauth2/authorization/SetRealName")
    public ApiResponse<Object> setrealname(@AuthenticationPrincipal OAuth2User user, @RequestBody String RealName){
        String email = user.getAttribute("email");
        Optional<User> user1 = userRepository.findByEmail(email);
        user1.get().setRealName(RealName);
        if(user1.get().getRealName() != null){
            return ApiResponse.ok(null);
        }else{
            return ApiResponse.fail("error");
        }

    }

}