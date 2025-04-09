package iilabtime.backend;

import iilabtime.backend.Errors.WebError;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //Errors裡面的錯誤
    @ExceptionHandler(WebError.class)
    public ResponseEntity<?> handleApiException(WebError ex) {
        return ResponseEntity.status(ex.getStatus()).body(
                Map.of(
                        "error", ex.getErrorCode(),
                        "message", ex.getMessage()
                )
        );
    }
    //非Errors裡的錯誤
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleOther(Exception ex) {
        return ResponseEntity.internalServerError().body(
                Map.of(
                        "error", "UNHANDLED_EXCEPTION",
                        "message", ex.getMessage()
                )
        );
    }
}