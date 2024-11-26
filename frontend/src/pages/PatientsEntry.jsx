import React, { useState } from "react"
import "../styles/Formulario.css"
import PopUpExcel from "../components/PopUpExcel.jsx"
import Form from "../components/Form"
import swal from "sweetalert"
import "../styles/Background.css"
import { request } from "../helpers/axios_helper"

export default function ManualEntry() {
  const [patient, setPatient] = useState({
    nombre: "",
    apellidos: "",
    celular: "",
    e_mail: "",
    comuna: "",
    fecha_ultima_sesion: "",
    estado: "",
    notas: "",
  })

  function getTodayDate() {
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, "0")
    const dia = String(fecha.getDate()).padStart(2, "0")

    const fechaFormateada = `${año}-${mes}-${dia}`
    return fechaFormateada
  }

  const setTodaysDate = (patient) => {
    patient.fecha_ultima_sesion = getTodayDate()
  }

  const [sameNumber, setSameNumber] = useState([])

  const handleNumberChange = (e) => {
    const reqVerificarCelular = request("GET", "/paciente/celular/" + patient.celular);
    reqVerificarCelular.then((response) => {
      setSameNumber(response.data)
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPatient({
      ...patient,
      [name]: value,
    })
    if(patient.celular.length !== 0){
      handleNumberChange()
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (patient.e_mail === "" || patient.e_mail.includes("@")) {
      swal({
        title: "¿Está seguro que desea ingresar el paciente al sistema?",
        text: "Una vez ingresado, la información del paciente puede ser editada.",
        icon: "warning",
        buttons: ["Cancelar", "Enviar"],
        dangerMode: true,
      }).then((respuesta) => {
        if (respuesta) {
          const reqVerificar = request("GET", "/paciente/" + patient.nombre + "/" + patient.apellidos);
          reqVerificar.then((response) => {
            console.log(response)
            if (response.data.length > 0) {
              swal("El paciente ya está registrado. Se ha actualizado el estado y la fecha de último contacto.", {
                icon: "info",
              })
              const req = request("POST", "/paciente/manual", patient)
              console.log(req)
            } else {
                if (sameNumber.length > 1) {
                  swal("El paciente fue ingresado exitosamente, pero comparte el mismo número de celular que los pacientes: " + sameNumber.map((patient) => " " + patient.nombre + " " + patient.apellidos + "") + ".", {
                    icon: "info",
                  })
                  const req = request("POST", "/paciente/manual", patient)
                  console.log(req)
                }
                else if (sameNumber.length === 1) {
                  swal("El paciente fue ingresado exitosamente, pero comparte el mismo número de celular que el paciente: " + sameNumber.map((patient) => " " + patient.nombre + " " + patient.apellidos + "") + ".", {
                    icon: "info",
                  })
                  const req = request("POST", "/paciente/manual", patient)
                  console.log(req)
                }
                else{
                      const req = request("POST", "/paciente/manual", patient)
                      console.log(req)
                      req
                        .then((response) => {
                          console.log(response)
                          swal("Paciente ingresado exitosamente!", {
                            icon: "success",
                            timer: "3000",
                          })
                        })
                        .catch((error) => {
                          console.error("Error al ingresar paciente:", error)
                          if (error.response.status === 401) {
                            console.log("Error al ingresar paciente")
                            swal("Error al ingresar paciente. No autorizado.", {
                              icon: "error",
                              timer: "3000",
                            })
                          }
                          swal("Error al ingresar paciente. No autorizado.", {
                            icon: "error",
                            timer: "3000",
                          })
                        }
                        )
                }
            }
          }

          )
        }
      }
      )
    }
    else {
      swal("Error al ingresar paciente. E-mail inválido.", {
        icon: "error",
        timer: "3000",
      })
    }
  }
  return (
    <div className="bg">
      <h1>Ingreso nuevo paciente</h1>
      <div className="contain">
      <PopUpExcel />
        <div
          style={{
            backgroundColor: "white",
            fontSize: "15px",
            borderRadius: "10px",
            boxShadow: "1px 1px 3px gray",
            paddingLeft: "5px"
          }}
        >
          <h3>Formato Excel</h3>
          <h5 style={{fontStyle: "italic"}}>
            Nombre Paciente; Apellidos Paciente; Celular; E-Mail; Comuna; Fecha de
            última sesión; Estado última sesión
          </h5>
        </div>
        <div className="formulario-container">
          <Form
            handleSubmit={handleSubmit}
            newPatient={patient}
            handleInputChange={handleInputChange}
          ></Form>
        </div>
      </div>
    </div>
  )
}
