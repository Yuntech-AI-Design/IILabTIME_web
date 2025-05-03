package iilabtime.backend;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;
    private String timestamp;

    private static String now() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.now().format(formatter);
    }

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, data, "success", now());
    }

    public static<T> ApiResponse<T> fail(String message) {
        return new ApiResponse<>(false, null, message, now());
    }
}

