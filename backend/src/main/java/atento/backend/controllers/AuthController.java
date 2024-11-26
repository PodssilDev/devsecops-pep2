package atento.backend.controllers;

import atento.backend.entities.UsuarioEntity;
import atento.backend.services.AuthService;
import atento.backend.services.UsuarioService;
import atento.backend.utilities.JWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class AuthController {

  @Autowired
  private AuthService authService;

  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private JWT jwtutil;

  @PostMapping("/login")
  public ResponseEntity<String> getCredentials(
    @RequestBody UsuarioEntity user
  ) {
    if (usuarioService.verifyCredentials(user)) {
      UsuarioEntity usuario = usuarioService.findByMail(user.getE_mail()).get(0);
      String token = jwtutil.create(
        String.valueOf(usuario.getId()),
        usuario.getE_mail(),
        String.valueOf(usuario.getRole_id())
      );

      return ResponseEntity.status(HttpStatus.OK).body(token);
    }
    return ResponseEntity
      .status(HttpStatus.UNAUTHORIZED)
      .body("HTTP Status will be CREATED (CODE 401)\n");
  }

  @PostMapping("/validate")
  public ResponseEntity<Boolean> validate(
    @RequestHeader(value = "Authorization", required = false) String tokenHeader
  ) {
    if (tokenHeader == null || tokenHeader.equals("Bearer")) {
      return ResponseEntity.status(HttpStatus.OK).body(false);
    }
    return ResponseEntity.status(HttpStatus.OK).body(true);
  }
  @PostMapping("/get-rol")
    public ResponseEntity<String> getRol(
    @RequestHeader(value = "Authorization", required = false) String tokenHeader
  ) {
    if (authService.validarRol(tokenHeader)) { 
      return ResponseEntity.status(HttpStatus.OK).body(authService.getRol(tokenHeader));
    }
    return ResponseEntity.status(HttpStatus.OK).body(null);  
  }
}
