package iilabtime.backend.Contorller;

import iilabtime.backend.Entity.User;
import iilabtime.backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.ModelAttribute;

@RequiredArgsConstructor
public abstract class AuthBaseController {

    private final UserRepository userRepository;
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

    protected User getAppUser() {
        String email = getEmail();
        if (email == null) return null;
        return userRepository.findByEmail(email).orElse(null);
    }
}