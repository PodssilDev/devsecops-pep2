package atento.backend.controllers;

import atento.backend.entities.UsuarioEntity;
import atento.backend.services.AuthService;
import atento.backend.services.UsuarioService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario")
@CrossOrigin("*")
public class UsuarioController {

  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private AuthService authService;

  /**
   * @return ResponseEntity<List<UsuarioEntity>>
   */
  @GetMapping
  public ResponseEntity<List<UsuarioEntity>> obtenerUsuarios() {
    List<UsuarioEntity> usuarios = usuarioService.obtenerUsuarios();
    if (usuarios.isEmpty()) return ResponseEntity.noContent().build();
    return ResponseEntity.ok(usuarios);
  }

  /**
   * @return ResponseEntity<List<UsuarioEntity>>
   */
  @GetMapping("/{email}")
  public ResponseEntity<List<UsuarioEntity>> obtenerPorMail(
    @PathVariable("email") String email
  ) {
    List<UsuarioEntity> usuarios = usuarioService.findByMail(email);
    if (usuarios.isEmpty()) return ResponseEntity.noContent().build();
    return ResponseEntity.ok(usuarios);
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<Optional<UsuarioEntity>> obtenerPorId(
    @PathVariable Integer id
  ) {
    Optional<UsuarioEntity> nuevoUsuario = usuarioService.findById(id);
    return ResponseEntity.ok(nuevoUsuario);
  }

  @PostMapping
  public ResponseEntity<Boolean> registrarUsuario(
    @RequestBody UsuarioEntity user,
    @RequestHeader(value = "Authorization", required = false) String tokenHeader
  ) {
    if (!authService.validarToken(tokenHeader)) { // Que el token sea válido
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
    } else {
      if (authService.validarAdmin(tokenHeader)) { // Valida que tenga el rol correspondiente
        if (usuarioService.guardarUsuario(user)) {
          return ResponseEntity.status(HttpStatus.OK).body(true);
        } else {
          return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
        }
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
      }
    }
  }

  @PostMapping("/update/{id}")
  public ResponseEntity<UsuarioEntity> update(
    @PathVariable Integer id,
    @RequestBody UsuarioEntity usuario
  ) {
    usuarioService.actualizarUsuario(id, usuario);
    return ResponseEntity.ok(usuario);
  }

  @DeleteMapping("/delete/{id}")
  public void deleteEntity(@PathVariable Integer id) {
    usuarioService.eliminarUsuario(id);
  }

  @DeleteMapping
  public void deleteAllEntities() {
    usuarioService.deleteAll();
  }
}
