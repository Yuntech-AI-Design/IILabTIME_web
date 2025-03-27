package iilabtime.backend.Contorller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Operation(summary = "取得目前登入的使用者資訊")
    @GetMapping("/me")
    public Object me(@AuthenticationPrincipal OAuth2User user) {
        return user != null ? user.getAttributes() : "未登入";
    }
}