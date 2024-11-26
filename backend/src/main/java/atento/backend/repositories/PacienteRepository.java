package atento.backend.repositories;

import atento.backend.entities.PacienteEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository
  extends JpaRepository<PacienteEntity, Integer> {
  @Query("select e from PacienteEntity e where e.estado = :estado")
  List<PacienteEntity> findByEstado(@Param("estado") String estado);

  @Query(
    "select e from PacienteEntity e where e.nombre = :nombre and e.apellidos = :apellidos"
  )
  List<PacienteEntity> findByNombre(
    @Param("nombre") String estado,
    @Param("apellidos") String apellidos
  );

  @Query("select e from PacienteEntity e where e.celular = :celular")
  List<PacienteEntity> findByCelular(@Param("celular") String celular);
}
