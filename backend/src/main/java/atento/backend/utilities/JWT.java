package atento.backend.utilities;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JWT {

  // JWT Atributes from application.properties / application.yml
  @Value("${security.jwt.secret}")
  private String key;

  @Value("${security.jwt.issuer}")
  private String issuer;

  @Value("${security.jwt.ttlMillis}")
  private long ttlMillis;

  /**
   * Create a new token.
   *
   * @param id
   * @param email
   * @param role_id
   * @return
   */
  public String create(String id, String email, String role_id) {
    long nowMillis = System.currentTimeMillis();
    long expMillis = nowMillis + ttlMillis;
    Date now = new Date(nowMillis);
    Date exp = new Date(expMillis);

    SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(this.key));
    String tokenJwt = Jwts
      .builder()
      .id(email)
      .issuedAt(now)
      .expiration(exp)
      .subject(role_id)
      .signWith(key)
      .compact();
    return tokenJwt;
  }

  /**
   * Method to validate and read the JWT
   *
   * @param jwt
   * @return
   */
  public String getJwtRole(String jwt) {
    Jws<Claims> jws;
    try {
      SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(this.key));
      jws = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt);
      return jws.getPayload().getSubject();
    } catch (JwtException ex) {
      return null;
    }
  }
}
