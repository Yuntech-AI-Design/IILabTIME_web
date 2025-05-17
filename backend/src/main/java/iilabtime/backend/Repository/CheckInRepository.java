package iilabtime.backend.Repository;

import iilabtime.backend.Entity.CheckIn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CheckInRepository extends JpaRepository<CheckIn, Long> {
    Optional<CheckIn> findByUserIdAndEndTimeIsNull(Long userId);

    /**
     * 計算指定使用者，在 startTime 落在 [monthStart, monthEnd] 之間
     * 且 endTime 不為 null（已完成簽到簽退）的紀錄數
     */
    long countByUserIdAndEndTimeIsNotNullAndStartTimeBetween(
            Long userId,
            LocalDateTime monthStart,
            LocalDateTime monthEnd
    );

    /**
     * 找出指定使用者，且資料庫的 [startTime, endTime]
     * 與傳入的區間 [queryStart, queryEnd] 有重疊的所有紀錄。
     */
    List<CheckIn> findAllByUserIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
            Long userId,
            LocalDateTime queryEnd,
            LocalDateTime queryStart);

}
