package iilabtime.backend.Contorller;

import iilabtime.backend.ApiResponse;
import iilabtime.backend.Entity.User;
import iilabtime.backend.Repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
public class AuthController extends AuthBaseController{

    private UserRepository userRepository;
    public AuthController(UserRepository userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }

    @Operation(summary = "取得目前登入的使用者資訊")
    @GetMapping("/me")
    public Object me(@AuthenticationPrincipal OAuth2User user) {
        return user != null ? user.getAttributes() : "未登入";
    }

    @Operation(summary = "取得登入的使用者資訊")
    @GetMapping("/Google-Login")
    public ApiResponse<Object> google_login(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return ApiResponse.fail("未登入");
        }

        String email = user.getAttribute("email");
        Optional<User> optionalUser = userRepository.findByEmail(email);

        User dbuser = optionalUser.get();
        String realname = dbuser.getRealName();
        if (realname == null){
            return ApiResponse.fail("RealName:" + null);
        }

        return ApiResponse.ok("RealName:" + realname);
    }

    @Operation(summary = "設定真實姓名")
    @PostMapping("/SetRealName")
    public ApiResponse<Object> setRealName(@AuthenticationPrincipal OAuth2User user,
                                           @RequestParam String realName) {
        if (user == null) {
            return ApiResponse.fail("未登入");
        }

        String email = user.getAttribute("email");
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return ApiResponse.fail("使用者不存在");
        }

        User dbUser = optionalUser.get();

        if (realName.isBlank()) {
            return ApiResponse.fail("請提供有效的真實姓名");
        }

        dbUser.setRealName(realName);
        userRepository.save(dbUser);

        return ApiResponse.ok("真實姓名已成功設定");
    }
}