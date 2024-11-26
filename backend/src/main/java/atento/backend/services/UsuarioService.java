package atento.backend.services;

import atento.backend.entities.UsuarioEntity;
import atento.backend.repositories.UsuarioRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import java.util.List;
import java.util.Optional;
import lombok.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  /**
   * @return List<UsuarioEntity>
   */
  public List<UsuarioEntity> obtenerUsuarios() {
    return usuarioRepository.findAll();
  }

  /**
   * @param UsuarioEntity
   * @return
   */
  public boolean guardarUsuario(UsuarioEntity user) {
    List<UsuarioEntity> userList = usuarioRepository.findByMail(
      user.getE_mail()
    );
    if (userList.isEmpty()) {
      Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2i);
      String hash = argon2.hash(2, 1024, 1, user.getPassword());
      user.setPassword(hash);
      usuarioRepository.save(user);
      return true;
    }
    return false;
  }

  /**
   * @param nombre
   * @param apellidos
   * @return List<PacienteEntity>
   */
  public List<UsuarioEntity> findByMail(String email) {
    return usuarioRepository.findByMail(email);
  }

  /**
   * @param nombre
   * @param apellidos
   * @return List<PacienteEntity>
   */
  @Generated
  public Optional<UsuarioEntity> findById(Integer id) {
    return usuarioRepository.findById(id);
  }

  /**
   * @param id
   * @param UsuarioEntity usuario
   * @return void
   */
  @Generated
  public void actualizarUsuario(Integer id, UsuarioEntity usuario) {
    UsuarioEntity usuarioActual = usuarioRepository.getReferenceById(id);

    if(!(usuario.getPassword().equals(usuarioActual.getPassword()))){
      Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2i);
      String hash = argon2.hash(2, 1024, 1, usuario.getPassword());
      usuarioActual.setPassword(hash);
    }
    else{
      usuarioActual.setPassword(usuario.getPassword());
    }

    
    usuarioActual.setE_mail(usuario.getE_mail());
    
    usuarioActual.setRole_id(usuario.getRole_id());

    usuarioRepository.save(usuarioActual);
  }

  /**
   * @param UsuarioEntity usuario
   * @return boolean
   */
  public boolean verifyCredentials(UsuarioEntity user) {
    List<UsuarioEntity> userList = findByMail(user.getE_mail());
    if (userList.isEmpty()) {
      return false;
    }
    String passwordHashed = userList.get(0).getPassword();

    Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2i);
    return argon2.verify(passwordHashed, user.getPassword());
  }

  /**
   * @param id
   * @return void
   */
  @Generated
  public void eliminarUsuario(Integer id) {
    usuarioRepository.deleteById(id);
  }

  /**
   * @param void
   * @return void
   */
  @Generated
  public void deleteAll() {
    usuarioRepository.deleteAll();
  }
}
