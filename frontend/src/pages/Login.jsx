import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import { request, setAuthHeader, setMail } from "../helpers/axios_helper"
import swal from "sweetalert"
import logoR from "../assets/logoLogin.png"
import Toast from "../components/Toast"

const Login = () => {
  const pag = {
    background: "#FFFFFF", // Agrega el color de fondo azul aquí
    minHeight: "100vh",
  }
  const containerStyles = {
    maxWidth: "440px",
    padding: "0 20px",
    margin: "auto",
    paddingTop: "200px",
  }
  const wrapperStyles = {
    width: "100%",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  }
  const titleStyles = {
    height: "90px",
    background: "#1562C0",
    borderRadius: "5px 5px 0 0",
    color: "#fff",
    fontSize: "30px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  }

  const rowStyles = {
    marginTop: "10px",
    height: "45px",
    marginBottom: "15px",
    position: "relative",
  }
  const inputStyles = {
    height: "100%",
    width: "100%",
    outline: "none",
    padding: "0 10px", // Agrega un relleno izquierdo y derecho para separar el icono
    borderRadius: "5px",
    border: "1px solid lightgrey",
    fontSize: "16px",
    transition: "all 0.3s ease",
    maxWidth: "100%", // Añade esta línea para limitar el ancho máximo
    boxSizing: "border-box", // Añade esta línea para que el ancho incluya el relleno
    marginLeft: "10px",
    marginRight: "60px",
    marginTop: "10px",
  }
  const inputContainer = {
    display: "flex", // Alinea los elementos en la misma fila
    alignItems: "center", // Centra verticalmente los elementos
    marginLeft: "30px",
  }
  const buttonStyles = {
    height: "45px",
    width: "100%",
    color: "#fff",
    fontSize: "20px",
    background: "#1562C0",
    fontFamily: "Poppins",
    border: "0px solid #009dd1",
    cursor: "pointer",
    display: "flex",
    alignItems: "center", // Centrar verticalmente
    justifyContent: "center", // Centrar horizontalmente
  }

  const navigate = useNavigate()

  const [user, setUser] = useState({
    e_mail: "",
    password: "",
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }
  const onLogin = (e, e_mail, password) => {
    e.preventDefault()
    console.table(user)
    request("POST", "/login", {
      e_mail: user.e_mail,
      password: user.password,
    })
      .then((response) => {
        Toast.fire({
          icon: 'success',
          title: '¡Bienvenido!'
        })
        setAuthHeader(response.data)
        setMail(user.e_mail)
        navigate("/")
      })
      .catch((error) => {
        swal("Usuario o contraseña incorrectos", {
          icon: "error",
        })
        setAuthHeader(null)
        navigate("/login")
      })
  }

  return (
    <div style={pag}>
      <div style={containerStyles}>
        <div style={wrapperStyles}>
          <div style={titleStyles}>
            
            <span>Atento CallBase</span>
            {<img src={logoR} width="90" height="60" alt="LogoR"/>}
          </div>
          <form onSubmit={onLogin}>
            <div style={{ ...rowStyles, ...inputContainer }}>
              <FontAwesomeIcon icon={faUser} />
              <input
                type="login"
                id="e_mail"
                name="e_mail"
                value={user.e_mail}
                onChange={handleInputChange}
                required
                placeholder="Escriba aquí su correo"
                style={inputStyles}
              />
            </div>
            <div style={{ ...rowStyles, ...inputContainer }}>
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                required
                maxLength={12}
                placeholder="Escriba aquí su contraseña"
                style={inputStyles}
              />
            </div>
            <div className="row button">
              <input type="submit" value="Ingresar" style={buttonStyles} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
