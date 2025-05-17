package iilabtime.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "week_result")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeekResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 地點 **/
    @Column(length = 255, nullable = false)
    private String location;

    /** 本週要點 **/
    @Column(columnDefinition = "TEXT")
    private String content;

    /** 被觀察者（或觀察紀錄的使用者） **/
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "observe_record_id", nullable = false)
    private User observeRecord;

    /** 反思 **/
    @Column(columnDefinition = "TEXT")
    private String reflection;

    /** 遇到困難 **/
    @Column(name = "find_hard", columnDefinition = "TEXT")
    private String findHard;

    /** 解決方法 **/
    @Column(name = "solve_method", columnDefinition = "TEXT")
    private String solveMethod;

    /** 其他 **/
    @Column(columnDefinition = "TEXT")
    private String other;

    /** 上傳的圖片清單 **/
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "weekresult_images",
            joinColumns = @JoinColumn(name = "week_result_id"),
            inverseJoinColumns = @JoinColumn(name = "file_id")
    )
    private List<FileStorage> images = new ArrayList<>();

    /** 提交的學生 **/
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    /** 建立時間 **/
    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @PrePersist
    public void onCreate() {
        this.createDate = LocalDateTime.now();
    }
}
