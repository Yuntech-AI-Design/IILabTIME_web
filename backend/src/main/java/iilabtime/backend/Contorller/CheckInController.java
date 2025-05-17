package iilabtime.backend.Contorller;

import iilabtime.backend.ApiResponse;
import iilabtime.backend.Entity.CheckIn;
import iilabtime.backend.Repository.UserRepository;
import iilabtime.backend.Service.CheckInService;
import iilabtime.backend.SwaggerConfig;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("CheckIn")
@SecurityRequirement(name = SwaggerConfig.securitySchemeName)
public class CheckInController extends AuthBaseController{
    @Autowired
    private CheckInService checkInService;
    public CheckInController(UserRepository userRepository) {
        super(userRepository);
    }
    @PostMapping("/CheckIn")
    public ApiResponse<Object> checkIn(@RequestParam String note){
        checkInService.checkIn(this.getAppUser());
        return ApiResponse.ok(null);
    }

    @PostMapping("/CheckOut")
    public ApiResponse<Long> checkOut(@RequestParam String note){
        long dur = checkInService.checkOut(this.getAppUser());
        return ApiResponse.ok(dur);
    }

    /**
     * 依照傳入的 startTime 與 endTime 回傳完全相符的打卡紀錄
     *
     * @param startTime yyyy-MM-dd'T'HH:mm:ss 格式的時間字串
     * @param endTime   同上
     */
    @PostMapping("/CountTimeToTimeHour")
    public ApiResponse<List<CheckIn>> findByTime(
            @RequestParam("startTime")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime startTime,

            @RequestParam("endTime")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime endTime) {

        List<CheckIn> list = checkInService.findOverlapping(this.getAppUser(), startTime, endTime);
        return ApiResponse.ok(list);
    }

    /**
     * 取得本月已完成簽到簽退的打卡筆數
     * GET /CheckIn/CountMonthCheckTime
     */
    @GetMapping("/CountMonthCheckTime")
    public ApiResponse<Long> countThisMonth() {
        long count = checkInService.countThisMonth(this.getAppUser());
        return ApiResponse.ok(count);
    }
}
