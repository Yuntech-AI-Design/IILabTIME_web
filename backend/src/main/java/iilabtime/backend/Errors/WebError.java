package iilabtime.backend.Errors;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public abstract class WebError extends RuntimeException{
    private final String message;
    private final String errorCode;
    private final HttpStatus status;
}
