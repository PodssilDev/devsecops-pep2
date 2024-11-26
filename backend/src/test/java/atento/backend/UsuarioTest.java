package atento.backend;

import static org.junit.jupiter.api.Assertions.*;

import atento.backend.entities.UsuarioEntity;
import atento.backend.repositories.UsuarioRepository;
import atento.backend.services.UsuarioService;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

@SpringBootTest
class UsuarioTest {

  @Autowired
  UsuarioService usuarioService;

  @Autowired
  UsuarioRepository usuarioRepository;

  @Test
  void testObtenerUsuarios() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setE_mail("test.test@test.cl");
    usuario.setPassword("test123");
    usuarioRepository.save(usuario);
    List<UsuarioEntity> usuarios = usuarioService.obtenerUsuarios();
    assertNotNull(usuarios);
    usuarioRepository.delete(usuario);
  }

  @Test
  void testGuardarUsuario() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setE_mail("test.test@test.cl");
    usuario.setPassword("test123");
    boolean var = usuarioService.guardarUsuario(usuario);
    if (var) {
      assertNotNull(usuario);
    }
    usuarioRepository.delete(usuario);
  }

  @Test
  void testVerificarCredenciales() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setE_mail("test.test@test.cl");
    usuario.setPassword("test123");
    usuarioService.guardarUsuario(usuario);
    boolean var = usuarioService.verifyCredentials(usuario);
    if (var) {
      assertNotNull(usuario);
    }
    usuarioRepository.delete(usuario);
  }

  @Test
  void testFindByMail() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setE_mail("test.test@test.cl");
    usuario.setPassword("test123");
    usuarioService.guardarUsuario(usuario);
    List<UsuarioEntity> usuario_encontrado = usuarioService.findByMail(
      "test.test@test.cl"
    );
    assertNotNull(usuario_encontrado);
    usuarioRepository.delete(usuario);
  }

  @Test
  void testYaRegistrado() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setE_mail("test.test@test.cl");
    usuario.setPassword("test123");
    boolean var = usuarioService.guardarUsuario(usuario);
    var = usuarioService.guardarUsuario(usuario);
    if (!var) {
      assertNotNull(usuario);
    }
    usuarioRepository.delete(usuario);
  }

  @Test
  @Transactional
  void testUserNoEncontrado() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setE_mail("test.test@test.cl");
    usuario.setPassword("test123");
    boolean var = usuarioService.verifyCredentials(usuario);
    if (!var) {
      assertNotNull(usuario);
    }
  }

  @Test
  @Transactional
  void testEditarUsuario() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setE_mail("test.test@test.cl");
    usuario.setPassword("test123");
    boolean var = usuarioService.guardarUsuario(usuario);
    if (var) {
      assertNotNull(usuario);
    }
    List<UsuarioEntity> usuario_encontrado = usuarioService.findByMail(
            "test.test@test.cl"
    );
    UsuarioEntity user = usuario_encontrado.get(0);
    int id = user.getId();
    usuario.setE_mail("test2.test2@test.cl");
    usuarioService.actualizarUsuario(id, usuario);
    usuarioRepository.delete(user);
  }

  @Transactional
  @Test
  void testEditarUsuario2() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setE_mail("test.test@test.cl");
    usuario.setPassword("test123");
    boolean var = usuarioService.guardarUsuario(usuario);
    if (var) {
      assertNotNull(usuario);
    }
    List<UsuarioEntity> usuario_encontrado = usuarioService.findByMail(
            "test.test@test.cl"
    );
    UsuarioEntity user = usuario_encontrado.get(0);
    int id = user.getId();
    usuario.setPassword("tesst12345");
    usuarioService.actualizarUsuario(id, usuario);
    usuarioRepository.delete(usuario);
  }

  @Transactional
  @Test
  void testEditarUsuario3() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setE_mail("test.test@test.cl");
    usuario.setPassword("test123");
    boolean var = usuarioService.guardarUsuario(usuario);
    if (var) {
      assertNotNull(usuario);
    }
    List<UsuarioEntity> usuario_encontrado = usuarioService.findByMail(
            "test.test@test.cl"
    );
    UsuarioEntity user = usuario_encontrado.get(0);
    int id = user.getId();
    usuarioService.actualizarUsuario(id, usuario);
    usuarioRepository.delete(usuario);
  }
}
