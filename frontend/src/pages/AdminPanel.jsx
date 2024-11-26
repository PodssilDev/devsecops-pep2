import React, { useEffect, useState } from "react"
// import patients_dummy from "../resources/patients_dummy.json"
import "../styles/Background.css"
import "../styles/Buttons.css"
import swal from "sweetalert"
import "../styles/CounterBox.css"
import axios from "axios"
import UserTable from "../components/UserTable"
import ExportarCSVButton from "../components/ExportarCSVButton"

export default function AdminPanel() {
  const API_URL = "/usuario"

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  const warning = {
    backgroundColor: "#FFF3CF",
    padding: "10px",
    border: "1px solid #ffcc00",
    color: "#333",
    fontWeight: "bold",
  }


  const [users, setUsers] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [selectedUpdatePatient, setSelectedUpdatePatient] = useState(null)
  const [updateChange, setChange] = useState(false)

  const setChan = () => setChange(!updateChange)

  const handleToggleDetails = (usuario) => {
    if (selectedPatient && selectedPatient.id === usuario.id) {
      setSelectedPatient(null) // Cierra el dropdown si ya está abierto
    } else {
      setSelectedPatient(usuario) // Abre el dropdown del usuario seleccionado
    }
  }

  const handleUpdate = (usuario) => {
    if (selectedUpdatePatient && selectedUpdatePatient.id === usuario.id) {
      setSelectedUpdatePatient(null) // Cierra el dropdown si ya está abierto
    } else {
      setSelectedUpdatePatient(usuario) // Abre el dropdown del usuario seleccionado
    }
  }

  const handleDeleteOne = async (usuario) => {
    swal({
      title: "¿Está seguro que desea eliminar este usuario del sistema?",
      text: "No será posible recuperar los datos del usuario una vez eliminado.",
      icon: "warning",
      buttons: ["Cancelar", "Enviar"],
      dangerMode: true,
    }).then((respuesta) => {
      if (respuesta) {
        try {
          axios.delete("/usuario/delete/" + usuario.id)
          swal("Usuario eliminado exitosamente!", {
            icon: "success",
            timer: "3000",
          })
          setChan()
        } catch (error) {
          swal("Error al eliminar usuario", { icon: "error", timer: "3000" })
          // Manejar el error, por ejemplo, mostrar un mensaje de error
          console.error("Error al eliminar:", error)
        }
      } else {
        swal("Operación cancelada.", { icon: "info", timer: "3000" })
      }
    })
  }

  useEffect(() => {
    // Función para realizar la solicitud GET
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL)
        console.log(response.data)
        setUsers(response.data)
        if (response.data.length === 0) {
          console.log("No hay datos")
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error)
        console.error("Error completo:", error.response)
      }
    }

    // Llama a la función para obtener los datos cuando el componente se monta
    fetchData()
  }, [updateChange])

  const displayData = users

  return (
    <div className="bg">
      <div style={containerStyle}>
        <h1>Administrar Pacientes y Usuarios</h1>
        <br></br>
        <ExportarCSVButton></ExportarCSVButton>
        <br></br>
        {users.length === 0 ? (
          <div style={warning}>
            <p>No se han encontrado usuarios</p>
          </div>
        ) : (
          <UserTable
            displayData={displayData}
            handleToggleDetails={handleToggleDetails}
            handleUpdate={handleUpdate}
            handleDeleteOne={handleDeleteOne}
            setChan={setChan}
            selectedUpdatePatient={selectedUpdatePatient}
          ></UserTable>
        )}
      </div>
    </div>
  )
}
