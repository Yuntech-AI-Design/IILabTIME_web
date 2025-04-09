package iilabtime.backend.Errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenError extends WebError{

    public ForbiddenError(String message) {
        super(message, "FORBIDDEN", HttpStatus.FORBIDDEN);
    }
}
