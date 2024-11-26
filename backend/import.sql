DROP DATABASE IF EXISTS clinica;
CREATE DATABASE IF NOT EXISTS clinica;
use clinica;

INSERT INTO usuario (`e_mail`, `password`, `role_id`)
SELECT 'admin@', '$argon2i$v=19$m=1024,t=2,p=1$yieiVjKvvFLog0wR1F/wxQ$EsQQEKRyw3zH4UqiiAuqO79WLSywU6YyU0gLpOJbLAI', 1
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE e_mail = 'admin@');