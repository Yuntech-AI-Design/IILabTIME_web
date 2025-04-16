package iilabtime.backend.Contorller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.ModelAttribute;

public abstract class AuthBaseController {

    private OAuth2User currentUser;

    @ModelAttribute
    public void setCurrentUser(@AuthenticationPrincipal OAuth2User user) {
        this.currentUser = user;
    }

    protected OAuth2User getCurrentUser() {
        return currentUser;
    }

    protected String getEmail() {
        return currentUser != null ? currentUser.getAttribute("email") : null;
    }

    protected String getName() {
        return currentUser != null ? currentUser.getAttribute("name") : null;
    }

    protected String getPicture() {
        return currentUser != null ? currentUser.getAttribute("picture") : null;
    }
}