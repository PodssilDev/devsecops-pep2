package atento.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.nullness.qual.NonNull;

@Entity
@Table(name = "usuario") // hace referencia a la tabla users de la base de datos
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UsuarioEntity {

  @Id
  @NonNull
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String e_mail;
  private String password;
  private Integer role_id;
}
