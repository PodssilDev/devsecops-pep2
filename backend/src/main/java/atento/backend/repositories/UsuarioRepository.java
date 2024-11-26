package atento.backend.repositories;

import atento.backend.entities.UsuarioEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository
  extends JpaRepository<UsuarioEntity, Integer> {
  @Query("select e from UsuarioEntity e where e.e_mail = :e_mail")
  List<UsuarioEntity> findByMail(@Param("e_mail") String e_mail);
}
