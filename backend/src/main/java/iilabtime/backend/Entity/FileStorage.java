package iilabtime.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "file_storage")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileStorage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime createDate;

    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
    }
}
