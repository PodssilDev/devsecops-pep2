package atento.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.nullness.qual.NonNull;

@Entity
@Table(name = "paciente")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PacienteEntity {

  @Id
  @NonNull
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String nombre;
  private String apellidos;
  private String celular;
  private String e_mail;
  private String comuna;
  private String fecha_ultima_sesion;
  private String estado;
  private String notas;
}
