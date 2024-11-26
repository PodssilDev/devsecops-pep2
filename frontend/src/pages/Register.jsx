import React, { useState } from "react"
import "../styles/Formulario.css"
import swal from "sweetalert"
import "../styles/Background.css"
import { request } from "../helpers/axios_helper"

export default function Register() {
  const [user, setUser] = useState({
    role_id: 2,
    e_mail: "",
    password1: "",
    password2: "",
  })

  const [realUser] = useState({
    role_id: 2,
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
  const submitButtonStyles = {
    background: "#28a745",
    color: "#fff",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontFamily: "Poppins",
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user.password1 === user.password2 && user.e_mail.includes("@")) {
      realUser.e_mail = user.e_mail
      realUser.password = user.password1
      swal({
        title: "¿Está seguro que desea registrar al usuario en el sistema?",
        text: "Una vez ingresado, la información del usuario puede ser editada.",
        icon: "warning",
        buttons: ["Cancelar", "Enviar"],
        dangerMode: true,
      }).then((respuesta) => {
        if (respuesta) {
          const req = request("POST", "/usuario", realUser)
          req
            .then((response) => {
              swal("Usuario ingresado exitosamente!", {
                icon: "success",
                timer: "3000",
              })
            })
            .catch((error) => {
              console.log(error)
              if (error.response.status === 401) {
                swal("Error al ingresar usuario. No autorizado.", {
                  icon: "error",
                  timer: "3000",
                })
              } else if (error.response.status === 406) {
                swal("Error al ingresar usuario. El usuario ya existe.", {
                  icon: "error",
                  timer: "3000",
                })
              }
            })
        } else {
          swal("Operación cancelada.", { icon: "info", timer: "3000" })
        }
      })
    } else if (!user.e_mail.includes("@") && user.password1 === user.password2) {
      swal("El correo ingresado no es valido.", {
        icon: "error",
        timer: "5000",
      })
    } else if (user.e_mail.includes("@") && user.password1 !== user.password2) {
      swal("Las contraseñas no coinciden.", { icon: "error", timer: "5000" })
    } else if (!user.e_mail.includes("@") && user.password1 !== user.password2) {
      swal("El correo ingresado no es valido y las contraseñas no coinciden.", {
        icon: "error",
        timer: "5000",
      })
    }
  }

  return (
    <div className="bg">
      <h1>Registrar nuevo usuario</h1>
      <div className="contain">
        <div className="formulario-register">
          <header></header>
          <form onSubmit={handleSubmit}>
            <label htmlFor="e_mail">Correo</label>
            <input
              type="text"
              id="e_mail"
              name="e_mail"
              value={user.e_mail}
              onChange={handleInputChange}
              required
              placeholder="Escriba aquí el correo del usuario"
              maxLength={200}
            />
            <label htmlFor="password1">Contraseña (Min. 5 caracteres)</label>
            <input
              type="password"
              id="password1"
              name="password1"
              value={user.password1}
              onChange={handleInputChange}
              pattern=".{5,12}"
              required
              maxLength={12}
              placeholder="Escriba aquí la contraseña del usuario"
            />
            <label htmlFor="password2">Confirmación de Contraseña</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={user.password2}
              onChange={handleInputChange}
              pattern=".{5,12}"
              required
              maxLength={12}
              placeholder="Vuelva a escribir aquí la contraseña del usuario"
            />
            <br />
            <br />
            <div style={{display: "flex", justifyContent: "center"}}>
            <button style={submitButtonStyles} type="submit">
              Enviar
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
