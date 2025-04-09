package iilabtime.backend.Errors;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundError extends WebError{
    public NotFoundError(String message) {
        super(message, "NOT_FOUND", HttpStatus.NOT_FOUND);
    }
}
