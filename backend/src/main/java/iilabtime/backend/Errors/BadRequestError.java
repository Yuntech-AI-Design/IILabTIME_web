package iilabtime.backend.Errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestError extends WebError{
    public BadRequestError(String message) {
        super(message, "BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
}
