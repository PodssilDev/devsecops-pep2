package atento.backend.controllers;

import atento.backend.entities.PacienteEntity;
import atento.backend.services.AuthService;
import atento.backend.services.PacienteService;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/paciente")
@CrossOrigin("*")
public class PacienteController {

  @Autowired
  private PacienteService pacienteService;

  @Autowired
  private AuthService authService;

  /**
   * @param ms
   * @return ResponseEntity<String>
   * @throws FileNotFoundException
   * @throws ParseException
   */
  @PostMapping
  public ResponseEntity<String> guardarData(
    @RequestParam("file") MultipartFile file,
    RedirectAttributes ms
  ) throws FileNotFoundException, ParseException {
    if (pacienteService.leerCsv(file)) {
      return ResponseEntity.status(HttpStatus.OK).body("(CODE 200)\n");
    } else {
      return ResponseEntity
        .status(HttpStatus.NOT_ACCEPTABLE)
        .body("(CODE 406)\n");
    }
  }

  /**
   * @return ResponseEntity<PacienteEntity>
   */
  @PostMapping("/manual")
  public ResponseEntity<PacienteEntity> save(
    @RequestBody PacienteEntity paciente,
    @RequestHeader(value = "Authorization", required = false) String tokenHeader
  ) {
    if (!authService.validarToken(tokenHeader)) { // Que el token sea válido
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    } else {
      if (authService.validarRol(tokenHeader)) { // Valida que tenga el rol correspondiente
        pacienteService.guardarPaciente(paciente);
        return ResponseEntity.status(HttpStatus.OK).body(paciente);
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
      }
    }
  }

  /**
   * @return ResponseEntity<List<PacienteEntity>>
   */
  @GetMapping("/estado/{estado}")
  public ResponseEntity<List<PacienteEntity>> obtenerPorEstado(
    @PathVariable("estado") String estado
  ) {
    List<PacienteEntity> pacientes = pacienteService.findByEstado(estado);
    if (pacientes.isEmpty()) return ResponseEntity.noContent().build();
    return ResponseEntity.ok(pacientes);
  }

  /**
   * @return ResponseEntity<List<PacienteEntity>>
   */
  @GetMapping("/celular/{celular}")
  public ResponseEntity<List<PacienteEntity>> obtenerPorCelular(
    @PathVariable("celular") String celular
  ) {
    System.out.println(celular);
    List<PacienteEntity> pacientes = pacienteService.findByCelular(celular);
    return ResponseEntity.ok(pacientes);
  }

  /**
   * @return ResponseEntity<List<PacienteEntity>>
   */
  @GetMapping("/{nombre}/{apellidos}")
  public ResponseEntity<List<PacienteEntity>> obtenerPorNombre(
    @PathVariable("nombre") String nombre,
    @PathVariable("apellidos") String apellidos
  ) {
    List<PacienteEntity> pacientes = pacienteService.findByNombre(
      nombre,
      apellidos
    );
    if (pacientes.isEmpty()) return ResponseEntity.noContent().build();
    return ResponseEntity.ok(pacientes);
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<Optional<PacienteEntity>> obtenerPorId(
    @PathVariable Integer id
  ) {
    Optional<PacienteEntity> nuevoPaciente = pacienteService.findById(id);
    return ResponseEntity.ok(nuevoPaciente);
  }

  /**
   * @return ResponseEntity<List<PacienteEntity>>
   */
  @GetMapping
  public ResponseEntity<List<PacienteEntity>> obtenerPacientes() {
    List<PacienteEntity> pacientes = pacienteService.obtenerPacientes();
    if (pacientes.isEmpty()) return ResponseEntity.noContent().build();
    return ResponseEntity.ok(pacientes);
  }

  @PostMapping("/update/{id}")
  public ResponseEntity<PacienteEntity> update(
    @PathVariable Integer id,
    @RequestBody PacienteEntity paciente
  ) {
    pacienteService.actualizarPaciente(id, paciente);
    return ResponseEntity.ok(paciente);
  }

  @DeleteMapping("/delete/{id}")
  public void deleteEntity(@PathVariable Integer id) {
    pacienteService.eliminarPaciente(id);
  }

  @DeleteMapping
  public void deleteAllEntities() {
    pacienteService.eliminarTodos();
  }

  @PostMapping("/lista")
  public ResponseEntity<List<PacienteEntity>> saveList(
    @RequestBody List<PacienteEntity> pacientes
  ) {
    pacientes.forEach(pacienteService::guardarPaciente);
    return ResponseEntity.ok(pacientes);
  }

  @GetMapping("/csv")
  public void exportarACSV(HttpServletResponse response) throws IOException {
    response.setContentType("text/csv; charset=UTF-8");
    response.setHeader("Content-Disposition", "attachment; file=pacientes.csv");

    List<PacienteEntity> datos = pacienteService.obtenerPacientes();

    try (PrintWriter writer = new PrintWriter(new OutputStreamWriter(response.getOutputStream(), StandardCharsets.UTF_8))) {
      // Escribir el encabezado
      writer.println("\uFEFFNombre Paciente;Apellidos Paciente;Celular;E-Mail;Comuna;Fecha de última sesión;Estado última sesión");

      // Escribir los datos
      for (PacienteEntity entidad : datos) {
        // Formatear manualmente la línea
        String line = String.format("%s;%s;%s;%s;%s;%s;%s",
                entidad.getNombre(),
                entidad.getApellidos(),
                entidad.getCelular(),
                entidad.getE_mail(),
                entidad.getComuna(),
                entidad.getFecha_ultima_sesion(),
                entidad.getEstado()
        );
        writer.println(line);
      }

      // No es necesario cerrar el PrintWriter aquí
      writer.flush();
    }
  }
}
