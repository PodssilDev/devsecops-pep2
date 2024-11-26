import React, { useState, useEffect } from "react"
import "../styles/Formulario.css"
import axios from "axios"
import swal from "sweetalert"
import "../styles/Background.css"
import Toast from "./Toast"
import Form from "./Form"

export default function UpdatePatient({ id, setChange }) {
  function getTodayDate() {
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, "0")
    const dia = String(fecha.getDate()).padStart(2, "0")

    const fechaFormateada = `${año}-${mes}-${dia}`
    return fechaFormateada
  }
  const [newPatient, setNewPatient] = useState({
    nombre: "",
    apellidos: "",
    celular: "",
    e_mail: "",
    comuna: "",
    fecha_ultima_sesion: "",
    estado: "",
    notas: "",
  })

  const [sameNumber, setSameNumber] = useState([])
  const [sameNumberCant, setSameNumberCant] = useState(0)

  const [sameName, setSameName] = useState([])
  const [sameNameCant, setSameCant] = useState(0)

  useEffect(() => {
    if (newPatient.nombre && newPatient.apellidos) {
      const reqVerificarNombre = axios.get("/paciente/" + newPatient.nombre + "/" + newPatient.apellidos);
  
      reqVerificarNombre.then((response) => {
        setSameName(response.data);
      });
    }
  }, [newPatient.nombre, newPatient.apellidos]);
  
  useEffect(() => {
    if (newPatient.nombre && newPatient.apellidos) {
      for (let i = 0; i < sameName.length; i++) {
        if (sameName[i].id !== id) {
          setSameCant((prevCount) => prevCount + 1);
        }
      }
    }
  }, [sameName, id, newPatient.nombre, newPatient.apellidos]);

  useEffect(() => {
    const handleNumberChange = async () => {
      if (newPatient.celular) {
        try {
          console.log("Celular: ", newPatient.celular);
          const response = await axios.get("/paciente/celular/" + newPatient.celular);
          console.log("Response: ", response.data);
          setSameNumber(response.data);
          console.log("Handle: ", sameNumber);
        } catch (error) {
          console.error("Error al verificar el número de celular:", error);
        }
      }
    };
    setSameNumberCant(0);
    handleNumberChange();
  }, [newPatient.celular]);

  useEffect(() => {
    if (Array.isArray(sameNumber) && newPatient.celular) {
      for (let i = 0; i < sameNumber.length; i++) {
        if (sameNumber[i].id !== id) {
          setSameNumberCant((prevCount) => prevCount + 1);
        }
      }
    }
  }, [sameNumber, id, newPatient.celular]);

  


  useEffect(() => {
    const getPatient = async () => {
      try {
        const response2 = await axios.get("/paciente/id/" + id)
        setNewPatient(response2.data)
      } catch (error) {
        console.error("Error al obtener los datos del paciente:", error)
      }
    }
    getPatient()
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPatient({
      ...newPatient,
      [name]: value,
    })
  }
  
  const setTodaysDate = (newPatient) => {
    newPatient.fecha_ultima_sesion = getTodayDate()
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPatient.e_mail === "" || newPatient.e_mail.includes("@")) {
      swal({
        title: "¿Está seguro que desea actualizar los datos de este paciente?",
        text: "Si acepta, inmediatamente se guardarán los cambios. Asegurese de que los datos sean correctos.",
        icon: "warning",
        buttons: ["Cancelar", "Enviar"],
        dangerMode: true,
      }).then((respuesta) => {
        if (respuesta) {
          try {
            console.log(newPatient.apellidos)
              if (sameNameCant > 0) {
                swal("Ya existe un paciente registrado con exactamente el mismo nombre. Verifique que el nombre sea correcto.", {
                  icon: "error",
                })
              } else {
                console.log("test same number:", sameNumberCant)
                  if (sameNumberCant > 0) {
                    console.log(sameNumberCant)
                    console.log(sameNumber)
                    swal("El paciente fue actualizado exitosamente, pero comparte el mismo número de celular que los/las pacientes: "  + sameNumber.filter((patient) => patient.id !== id).map((patient) =>  " " + patient.nombre + " " + patient.apellidos + "") + ".", {
                      icon: "info",
                    })
                    setTodaysDate(newPatient)
                    const response = axios.post("/paciente/update/" + id, newPatient)
                    setChange(true)
                    console.log(response)
                  }
                  else{

            setTodaysDate(newPatient)
            const response = axios.post("/paciente/update/" + id, newPatient)
            console.log(id)
            Toast.fire({
              icon: "success",
              title: "¡Paciente editado!",
              position: "top",
              timer: "1300",
            })
            setChange(true)
            console.log("Respuesta: ", response.data)
          }
        }
      
    setSameCant(0)
    setSameName([])
    setSameNumberCant(0)
    setSameNumber([])
  }
  catch (error) {
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
    setSameCant(0)
    setSameNumberCant(0)
    setSameNumber([])
    setSameName([])
  }
}
}
)
}
else {
  swal("El correo electrónico no es válido.", {
    icon: "error",
    timer: "3000",
  })
      setSameCant(0)
      setSameNumberCant(0)
    setSameNumber([])
    setSameName([])
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
              <Form
                handleSubmit={handleSubmit}
                newPatient={newPatient}
                handleInputChange={handleInputChange}
              ></Form>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}
