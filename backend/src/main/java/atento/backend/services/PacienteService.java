package atento.backend.services;

import atento.backend.entities.PacienteEntity;
import atento.backend.repositories.PacienteRepository;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import lombok.Generated;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class PacienteService {

  @Autowired
  private PacienteRepository pacienteRepository;

  private final Logger logg = LoggerFactory.getLogger(PacienteService.class);

  /**
   * @param file
   * @return String
   */
  @Generated
  public String guardarArchivo(MultipartFile file) {
    String filename = file.getOriginalFilename();
    if (filename != null) {
      if (!file.isEmpty()) {
        try {
          byte[] bytes = file.getBytes();
          Path path = Paths.get(file.getOriginalFilename());
          Files.write(path, bytes);
          logg.info("Archivo guardado");
        } catch (IOException e) {
          logg.error("ERROR", e);
        }
      }
      return filename;
    } else {
      return null;
    }
  }

  /**
   * @param file
   * @return boolean
   */
  @Generated
  public boolean leerCsv(MultipartFile file) {
    String direccion = guardarArchivo(file);
    BufferedReader bf = null;
    try {
      bf =
        new BufferedReader(
          new InputStreamReader(new FileInputStream(direccion), "UTF-8")
        );
      String temp = "";
      String bfRead;
      int count = 1;
      while ((bfRead = bf.readLine()) != null) {
        if (count == 1) {
          if (
            bfRead.split(";")[0].equals("\uFEFFNombre Paciente") &&
            bfRead.split(";")[1].equals("Apellidos Paciente") &&
            bfRead.split(";")[2].equals("Celular") &&
            bfRead.split(";")[3].equals("E-Mail") &&
            bfRead.split(";")[4].equals("Comuna") &&
            bfRead.split(";")[5].equals("Fecha de última sesión") &&
            bfRead.split(";")[6].equals("Estado última sesión")
          ) {
            count = 0;
          } else {
            return false;
          }
        } else {
          String numero = bfRead.split(";")[2].replaceAll("\\s+", "");
          if (!numero.contains("+") && !numero.equals("")) {
            numero = "+".concat(numero);
          }
          String newFecha = "";
          if(!bfRead.split(";")[5].equals("")) {
            String fecha = bfRead.split(";")[5];
            newFecha =
                    fecha.split("-")[2] +
                            "-" +
                            fecha.split("-")[1] +
                            "-" +
                            fecha.split("-")[0];
          }
          guardarPacienteDB(
            bfRead.split(";")[0],
            bfRead.split(";")[1],
            numero,
            bfRead.split(";")[3],
            bfRead.split(";")[4],
            newFecha,
            bfRead.split(";")[6]
          );
          temp = temp + "\n" + bfRead;
        }
      }
      return true;
    } catch (Exception e) {
      logg.info("No se encontro el archivo");
      return false;
    } finally {
      if (bf != null) {
        try {
          bf.close();
        } catch (IOException e) {
          logg.error("ERROR", e);
        }
      }
    }
  }

  /**
   * @return List<PacienteEntity>
   */
  public List<PacienteEntity> obtenerPacientes() {
    return pacienteRepository.findAll();
  }

  /**
   * @param paciente
   */
  @Generated
  public void guardarPaciente(PacienteEntity paciente) {
    try{
      List<PacienteEntity> pacientes = findByNombre(paciente.getNombre(),paciente.getApellidos());
      PacienteEntity pacienteAntiguo = pacientes.get(0);
      int id = pacienteAntiguo.getId();
      paciente.setId(id);
      if((!paciente.equals(pacienteAntiguo)) && (!(paciente.getNombre().equals(pacienteAntiguo.getNombre())) && (paciente.getApellidos().equals(pacienteAntiguo.getApellidos())))){
        pacienteRepository.save(paciente);
      }
      else if(((paciente.getNombre().equals(pacienteAntiguo.getNombre())) && (paciente.getApellidos().equals(pacienteAntiguo.getApellidos()))) && (!paciente.getEstado().equals(pacienteAntiguo.getEstado()))){
        pacienteAntiguo.setEstado(paciente.getEstado());
        LocalDate fechaHoy = LocalDate.now();
        DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String fechaComoString = fechaHoy.format(formatoFecha);
        pacienteAntiguo.setFecha_ultima_sesion(fechaComoString);
        pacienteRepository.save(pacienteAntiguo);
      }
    }
    catch (Exception e){
      pacienteRepository.save(paciente);
    }
  }

  /**
   * @param nombre
   * @param apellidos
   * @param celular
   * @param eMail
   * @param comuna
   * @param fechaUltimaSesion
   * @param estado
   */
  public void guardarPacienteDB(
    String nombre,
    String apellidos,
    String celular,
    String eMail,
    String comuna,
    String fechaUltimaSesion,
    String estado
  ) {
    PacienteEntity nuevoPaciente = crearNuevoPaciente(
      nombre,
      apellidos,
      celular,
      eMail,
      comuna,
      fechaUltimaSesion,
      estado
    );
    guardarPaciente(nuevoPaciente);
  }

  /**
   * @param nombre
   * @param apellidos
   * @param celular
   * @param eMail
   * @param comuna
   * @param fechaUltimaSesion
   * @param estado
   * @return PacienteEntity
   */
  public PacienteEntity crearNuevoPaciente(
    String nombre,
    String apellidos,
    String celular,
    String eMail,
    String comuna,
    String fechaUltimaSesion,
    String estado
  ) {
    PacienteEntity nuevoPaciente = new PacienteEntity();
    nuevoPaciente.setNombre(nombre);
    nuevoPaciente.setApellidos(apellidos);
    nuevoPaciente.setCelular(celular);
    nuevoPaciente.setE_mail(eMail);
    nuevoPaciente.setComuna(comuna);
    nuevoPaciente.setFecha_ultima_sesion(fechaUltimaSesion);
    nuevoPaciente.setEstado(estado);
    return nuevoPaciente;
  }

  /**
   * @param nombre
   * @param apellidos
   * @return List<PacienteEntity>
   */
  @Generated
  public Optional<PacienteEntity> findById(Integer id) {
    return pacienteRepository.findById(id);
  }

  /**
   * @param estado
   * @return List<PacienteEntity>
   */
  public List<PacienteEntity> findByEstado(String estado) {
    return pacienteRepository.findByEstado(estado);
  }

  /**
   * @param nombre
   * @param apellidos
   * @return List<PacienteEntity>
   */
  public List<PacienteEntity> findByNombre(String nombre, String apellidos) {
    return pacienteRepository.findByNombre(nombre, apellidos);
  }

  /**
   * @param celular
   * @return List<PacienteEntity>
   */
  public List<PacienteEntity> findByCelular(String celular) {
    return pacienteRepository.findByCelular(celular);
  }

  /**
   * @param id
   */
  @Generated
  public void eliminarPaciente(Integer id) {
    pacienteRepository.deleteById(id);
  }

  /**
   * @param id
   * @param PacienteEntity paciente
   * @return void
   */
  public void actualizarPaciente(Integer id, PacienteEntity paciente) {
    PacienteEntity pacienteActual = pacienteRepository.getReferenceById(id);
    pacienteActual.setNombre(paciente.getNombre());
    pacienteActual.setApellidos(paciente.getApellidos());
    pacienteActual.setCelular(paciente.getCelular());
    pacienteActual.setE_mail(paciente.getE_mail());
    pacienteActual.setComuna(paciente.getComuna());
    pacienteActual.setFecha_ultima_sesion(paciente.getFecha_ultima_sesion());
    pacienteActual.setEstado(paciente.getEstado());
    pacienteActual.setNotas(paciente.getNotas());
    pacienteRepository.save(pacienteActual);
  }

  @Generated
  public void eliminarTodos() {
    pacienteRepository.deleteAll();
  }
}
