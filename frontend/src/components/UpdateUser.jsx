import React, { useState, useEffect } from "react"
import "../styles/Formulario.css"
import axios from "axios"
import swal from "sweetalert"
import "../styles/Background.css"
import Toast from "./Toast"
import FormUser from "./FormUser"

export default function UpdateUser({ id, setChange }) {
  function getTodayDate() {
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, "0")
    const dia = String(fecha.getDate()).padStart(2, "0")

    const fechaFormateada = `${año}-${mes}-${dia}`
    return fechaFormateada
  }
  const [newUser, setNewUser] = useState({
    e_mail: "",
    password: "",
    role_id: "",
  })

  useEffect(() => {
    const getPatient = async () => {
      try {
        const response2 = await axios.get("/usuario/id/" + id)
        setNewUser(response2.data)
      } catch (error) {
        console.error("Error al obtener los datos del paciente:", error)
      }
    }
    getPatient()
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser({
      ...newUser,
      [name]: value,
    })
  }
  const setTodaysDate = (newPatient) => {
    newPatient.fecha_ultima_sesion = getTodayDate()
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newUser.e_mail === "" || newUser.e_mail.includes("@")) {
      swal({
        title: "¿Está seguro que desea actualizar los datos de este paciente?",
        text: "Si acepta, inmediatamente se guardarán los cambios. Asegurese de que los datos sean correctos.",
        icon: "warning",
        buttons: ["Cancelar", "Enviar"],
        dangerMode: true,
      }).then((respuesta) => {
        if (respuesta) {
          try {
            setTodaysDate(newUser)
            const response = axios.post("/usuario/update/" + id, newUser)
            console.log(id)
            Toast.fire({
              icon: "success",
              title: "¡Usuario editado!",
              position: "top",
              timer: "1300",
            })
            setChange(true)
            console.log("Respuesta: ", response.data)
          } catch (error) {
            swal("Error al actualizar el paciente", {
              icon: "error",
              timer: "3000",
            })
            console.error("Error al enviar el formulario:", error)
          }
        } else {
          swal("Operación cancelada. Paciente no actualizado.", {
            icon: "info",
            timer: "3000",
          })
        }
      })
    } else {
      swal("Error al actualizar paciente. Correo inválido.", {
        icon: "error",
        timer: "3000",
      })
    }
  }

  return (
    <tr>
      <td colSpan="10">
        <div
          style={{
            paddingTop: "3vh",
            paddingBottom: "4vh",
            background: "white",
            borderTop: "1px solid rgba(0, 0, 0, 0.2)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="contain-editar">
            <div className="formulario-editar">
              <FormUser
                handleSubmit={handleSubmit}
                newUser={newUser}
                handleInputChange={handleInputChange}
              ></FormUser>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}
