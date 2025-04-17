package iilabtime.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "app_user")
@Data                   // 自動產生 getter/setter/toString/hashCode/equals
@NoArgsConstructor      // 無參建構子
@AllArgsConstructor     // 全參建構子
@Builder                // 建立 Builder 模式
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID", updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "mail_name")
    private String mailName;

    @Column(name = "mail_picture")
    private String mailPicture;

    @Column(name = "real_name")
    private String realName;

    @Column(nullable = false)
    private String role; // teacher | student

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CheckIn> checkIns;
}