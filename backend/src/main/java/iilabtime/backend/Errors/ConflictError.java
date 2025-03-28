package iilabtime.backend.Errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ConflictError extends WebError{
    public ConflictError(String message) {
        super(message, "CONFLICT", HttpStatus.CONFLICT);
    }
}
