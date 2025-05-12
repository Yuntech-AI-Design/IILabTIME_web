package iilabtime.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "class_room")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private User teacher;

    /** 開課時間，格式 ddTHH:mm （例如 "03T15:30"） **/
    @Column(name = "meeting_time", nullable = false)
    private String meetingTime;

    /** 本班所有成員 **/
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "classroom_members",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> members = new ArrayList<>();
}
