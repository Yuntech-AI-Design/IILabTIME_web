package iilabtime.backend.Repository;

import iilabtime.backend.Entity.FileStorage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileRepository extends JpaRepository<FileStorage, Long> {
    Optional<FileStorage> findById(long id);
    Optional<FileStorage> findAllByUser_Id(long userId);
}
