package atento.backend.services;

import atento.backend.utilities.JWT;
import lombok.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  @Autowired
  private JWT jwtUtil;

  @Generated
  public String getToken(String token) {
    return token.split(" ")[1];
  }

  @Generated
  public boolean validarRol(String tokenHeader) {
    if(validarToken(tokenHeader)){
      String token = getToken(tokenHeader);
      String usuarioRol = jwtUtil.getJwtRole(token);
      return usuarioRol.equals("2") || usuarioRol.equals("1");
    }
    return false;
  }

  @Generated
  public boolean validarAdmin(String tokenHeader) {
    String token = getToken(tokenHeader);
    String usuarioRol = jwtUtil.getJwtRole(token);
    return usuarioRol.equals("1");
  }

  @Generated
  public boolean validarToken(String token) {
    return !(token == null || token.equals("Bearer"));
  }

  @Generated
  public String getRol(String tokenHeader) {
    String token = getToken(tokenHeader);
    return jwtUtil.getJwtRole(token);
  }
}
