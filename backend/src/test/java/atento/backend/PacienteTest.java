package atento.backend;

import static org.junit.jupiter.api.Assertions.*;

import atento.backend.entities.PacienteEntity;
import atento.backend.repositories.PacienteRepository;
import atento.backend.services.PacienteService;
import java.util.List;
import javax.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PacienteTest {

  @Autowired
  PacienteService paciente;

  @Autowired
  PacienteRepository pacienteRepository;

  @Test
  void testObtenerPacientes() {
    PacienteEntity nuevoPaciente = paciente.crearNuevoPaciente(
      "Juanito",
      "Perez",
      "+56912345678",
      "juanito.perez@usach.cl",
      "Forida",
      "14-10-2023",
      "Atendido"
    );
    paciente.guardarPaciente(nuevoPaciente);
    assertNotNull(paciente.obtenerPacientes());
    pacienteRepository.delete(nuevoPaciente);
  }

  @Test
  void testfindByCelular() {
    paciente.guardarPacienteDB(
      "Juanito",
      "Perez",
      "+56912345678",
      "juanito.perez@usach.cl",
      "Forida",
      "14-10-2023",
      "Atendido"
    );
    List<PacienteEntity> pacientes_1 = paciente.findByCelular("+56912345678");
    PacienteEntity paciente_1 = pacientes_1.get(0);
    assertNotNull(paciente_1);
    pacienteRepository.delete(paciente_1);
  }

  @Test
  void testfindByNombre() {
    paciente.guardarPacienteDB(
      "Juanito",
      "Perez",
      "+56912345678",
      "juanito.perez@usach.cl",
      "Forida",
      "14-10-2023",
      "Atendido"
    );
    List<PacienteEntity> pacientes_2 = paciente.findByNombre(
      "Juanito",
      "Perez"
    );
    PacienteEntity paciente_2 = pacientes_2.get(0);
    assertNotNull(paciente_2);
    pacienteRepository.delete(paciente_2);
  }

  @Test
  void testfindByEstado() {
    paciente.guardarPacienteDB(
      "Juanito",
      "Perez",
      "+56912345678",
      "juanito.perez@usach.cl",
      "Forida",
      "14-10-2023",
      "Estado de Testeo"
    );
    List<PacienteEntity> pacientes_3 = paciente.findByEstado(
      "Estado de Testeo"
    );
    PacienteEntity paciente_3 = pacientes_3.get(0);
    assertNotNull(paciente_3);
    pacienteRepository.delete(paciente_3);
  }

  @Test
  void guardarTest() {
    paciente.guardarPacienteDB(
      "Juanito",
      "Perez",
      "+56912345678",
      "juanito.perez@usach.cl",
      "Forida",
      "14-10-2023",
      "Estado de Testeo"
    );
    List<PacienteEntity> pacientes_4 = paciente.findByEstado(
      "Estado de Testeo"
    );
    PacienteEntity paciente_4 = pacientes_4.get(0);
    assertNotNull(paciente_4);
    pacienteRepository.delete(paciente_4);
  }

  @Test
  @Transactional
  void testEditarPaciente() {
    paciente.guardarPacienteDB(
      "Juanito",
      "Perez",
      "+56912345678",
      "juanito.perez@usach.cl",
      "Forida",
      "14-10-2023",
      "Estado de Testeo"
    );
    PacienteEntity nuevoPaciente = paciente.crearNuevoPaciente(
      "Juanito",
      "Perez",
      "+56912345678",
      "juanito.test@usach.cl",
      "Forida",
      "14-10-2023",
      "Estado de Testeo"
    );
    List<PacienteEntity> pacientes_5 = paciente.findByCelular("+56912345678");
    PacienteEntity paciente_5 = pacientes_5.get(0);
    Integer id = paciente_5.getId();
    paciente.actualizarPaciente(id, nuevoPaciente);
    assertNotNull(paciente.findByCelular("+56912345678"));
    pacienteRepository.delete(nuevoPaciente);
  }
  @Test
  @Transactional
  void testHomologacion1() {
    paciente.guardarPacienteDB(
            "Juanito",
            "Perez",
            "+56912345678",
            "juanito.perez@usach.cl",
            "Forida",
            "14-10-2023",
            "Estado de Testeo"
    );
    paciente.guardarPacienteDB(
            "Juanito",
            "Perez",
            "+56912345678",
            "juanito.perez@usach.cl",
            "Forida",
            "14-10-2023",
            "Estado de Testeo"
    );
    List<PacienteEntity> pacientes_5 = paciente.findByCelular("+56912345678");
    PacienteEntity paciente_5 = pacientes_5.get(0);
    assertNotNull(paciente.findByCelular("+56912345678"));
    pacienteRepository.delete(paciente_5);
  }

  @Test
  @Transactional
  void testHomologacion2() {
    paciente.guardarPacienteDB(
            "Juanito",
            "Perez",
            "+56912345678",
            "juanito.perez@usach.cl",
            "Forida",
            "14-10-2023",
            "Estado de Testeo"
    );
    paciente.guardarPacienteDB(
            "Juanito",
            "Perez",
            "+56912345678",
            "juanito.perez@usach.cl",
            "La Florida",
            "14-10-2023",
            "Estado de Testing"
    );
    List<PacienteEntity> pacientes_5 = paciente.findByCelular("+56912345678");
    PacienteEntity paciente_5 = pacientes_5.get(0);
    assertNotNull(paciente.findByCelular("+56912345678"));
    pacienteRepository.delete(paciente_5);
  }

  @Test
  @Transactional
  void testHomologacion3() {
    paciente.guardarPacienteDB(
            "Juanito",
            "Perez",
            "+56912345678",
            "juanito.perez@usach.cl",
            "Forida",
            "14-10-2023",
            "Estado de Testeo"
    );
    paciente.guardarPacienteDB(
            "Juanitox",
            "Peres",
            "+56912345678",
            "juanito.perez@usach.cl",
            "La Florida",
            "14-10-2023",
            "Estado de Testing"
    );
    List<PacienteEntity> pacientes_5 = paciente.findByCelular("+56912345678");
    PacienteEntity paciente_5 = pacientes_5.get(0);
    PacienteEntity paciente_5_2 = pacientes_5.get(1);
    assertNotNull(paciente.findByCelular("+56912345678"));
    pacienteRepository.delete(paciente_5);
    pacienteRepository.delete(paciente_5_2);
  }
}
