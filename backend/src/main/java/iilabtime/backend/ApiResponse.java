package iilabtime.backend;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, data, "success");
    }

    public static ApiResponse<?> fail(String message) {
        return new ApiResponse<>(false, null, message);
    }
}

