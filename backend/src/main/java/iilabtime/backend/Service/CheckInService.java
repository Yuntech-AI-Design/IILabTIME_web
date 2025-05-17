package iilabtime.backend.Service;

import iilabtime.backend.Entity.CheckIn;
import iilabtime.backend.Entity.User;
import iilabtime.backend.Errors.InternalServerError;
import iilabtime.backend.Repository.CheckInRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Service
public class CheckInService {

    @Autowired
    private CheckInRepository checkInRepository;
    public void checkIn(User user) {
        if (checkInRepository.findByUserIdAndEndTimeIsNull(user.getId()).isPresent()) {
            throw new InternalServerError("您已經打卡上班，尚未下班");
        }
        CheckIn ci = CheckIn.builder()
                .user(user)
                .startTime(LocalDateTime.now())
                .build();
        checkInRepository.save(ci);
    }

    public long checkOut(User user) {
        CheckIn ci = checkInRepository.findByUserIdAndEndTimeIsNull(user.getId())
                .orElseThrow(() -> new InternalServerError("尚未打上班卡"));
        ci.setEndTime(LocalDateTime.now());
        checkInRepository.save(ci);
        return Duration
                    .between(ci.getStartTime(), ci.getEndTime())
                    .getSeconds();
    }

    public List<CheckIn> findOverlapping(User user,
                                         LocalDateTime startTime,
                                         LocalDateTime endTime) {

        return checkInRepository.findAllByUserIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                user.getId(),
                endTime,
                startTime
        );
    }

    /**
     * 回傳此使用者本月（當前年月）的已完成打卡紀錄數
     * （簽到簽退算一次）
     */
    public long countThisMonth(User user) {

        // 計算本月第一天零時與下月第一天零時
        YearMonth ym = YearMonth.from(LocalDateTime.now());
        LocalDateTime monthStart = ym.atDay(1).atStartOfDay();
        LocalDateTime monthEnd   = ym.plusMonths(1).atDay(1).atStartOfDay();

        return checkInRepository.countByUserIdAndEndTimeIsNotNullAndStartTimeBetween(
                user.getId(), monthStart, monthEnd
        );
    }
}
