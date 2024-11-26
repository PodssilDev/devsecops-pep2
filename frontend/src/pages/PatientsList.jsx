import React, { useEffect, useState } from "react"
// import patients_dummy from "../resources/patients_dummy.json"
import "../styles/Background.css"
import estados from "../resources/estados.json"
import "../styles/Buttons.css"
import swal from "sweetalert"
import "../styles/CounterBox.css"
import axios from "axios"
import PatientTable from "../components/PatientTable"
import { Link } from "react-router-dom"

export default function PatientsList() {
  const API_URL = "/paciente"

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

  const filterBar = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    padding: "10px",
  }
 

  const openGmail = (emailAddresses) => {
    // Reemplaza 'correo_electronico' con la dirección de correo electrónico deseada
    const emailAddress = 'clinicadental.atentodent@gmail.com'

    let bccRecipients = emailAddresses.join(',');
    // Crea la URL de Gmail con los parámetros especificados
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&bcc=${encodeURIComponent(bccRecipients)}&su=&body=`

    // Abre una nueva ventana del navegador con la URL de Gmail
    return gmailUrl
    //window.open(gmailUrl, '_blank');
  }
  


  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(100)
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [selectedUpdatePatient, setSelectedUpdatePatient] = useState(null)
  const [nameFilter, setNameFilter] = useState("") // Agrega estado para el filtro de nombre
  const [phoneFilter, setPhoneFilter] = useState("") // Agrega estado para el filtro de teléfono
  const [searchResults, setSearchResults] = useState([])
  const [state, setState] = useState("all")
  const [updateChange, setChange] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Función que se ejecutará cuando el estado del checkbox cambie
  const handleCheckboxChange = (value) => {
    // Verifica si el valor ya está en el arreglo
    if (value.toLowerCase() !== "no registrado" && value.toLowerCase() !== "notiene@notiene.cl" && value.toLowerCase() !== ""){
      const isSelected = selectedItems.includes(value);
      // Si está seleccionado, quítalo del arreglo; si no está seleccionado, agrégalo
      setSelectedItems((prevSelectedItems) =>
          isSelected
          ? prevSelectedItems.filter((item) => item !== value)
          : [...prevSelectedItems, value]
        )
    }
  }

  const setChan = () => setChange(!updateChange)

  const handleToggleDetails = (patient) => {
    if (selectedPatient && selectedPatient.id === patient.id) {
      setSelectedPatient(null) // Cierra el dropdown si ya está abierto
    } else {
      setSelectedPatient(patient) // Abre el dropdown del paciente seleccionado
    }
  }

  const handleUpdate = (patient) => {
    if (selectedUpdatePatient && selectedUpdatePatient.id === patient.id) {
      setSelectedUpdatePatient(null) // Cierra el dropdown si ya está abierto
    } else {
      setSelectedUpdatePatient(patient) // Abre el dropdown del paciente seleccionado
    }
  }

  const handleDeleteOne = async (patient) => {
    swal({
      title: "¿Está seguro que desea eliminar este paciente del sistema?",
      text: "No será posible recuperar los datos del paciente una vez eliminado.",
      icon: "warning",
      buttons: ["Cancelar", "Enviar"],
      dangerMode: true,
    }).then((respuesta) => {
      if (respuesta) {
        try {
          axios.delete("/paciente/delete/" + patient.id)
          swal("Paciente eliminado exitosamente!", {
            icon: "success",
            timer: "3000",
          })
          setChan()
        } catch (error) {
          swal("Error al eliminar paciente", { icon: "error", timer: "3000" })
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
        setPatients(response.data)
        const results = response.data
          .filter((patient) => patient.estado === state || state === "all")
          .filter((patient) =>
            patient.nombre
              .toLowerCase()
              .concat(" ".concat(patient.apellidos.toLowerCase()))
              .includes(nameFilter.toLowerCase())
          )
          .filter((patient) => patient.celular.includes(phoneFilter))
        setSearchResults(results)
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
  const handleStateChange = (e) => {
    const { value } = e.target
    setState(value)
  }
  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value) // Actualiza el filtro de nombre
  }
  const handlePhoneFilterChange = (e) => {
    setPhoneFilter(e.target.value) // Actualiza el filtro de teléfono
  }
  const handleSearch = () => {
    // Realiza la búsqueda y actualiza los resultados
    const results = patients
      .filter((patient) => patient.estado === state || state === "all")
      .filter((patient) =>
        patient.nombre
          .toLowerCase()
          .concat(" ".concat(patient.apellidos.toLowerCase()))
          .includes(nameFilter.toLowerCase())
      )
      .filter((patient) => patient.celular.includes(phoneFilter))

    setSearchResults(results)
    setCurrentPage(1)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayData = searchResults.slice(startIndex, endIndex)
  const totalPages = Math.ceil(searchResults.length / itemsPerPage)
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(1)
  }

  const handleFirstPage = () => {
    setCurrentPage(1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleLastPage = () => {
    setCurrentPage(totalPages)
  }

  return (
    <div className="bg">
      <div style={containerStyle}>
        <h1>Lista de Pacientes</h1>
        <div style={filterBar}>
          <select id="estado" name="estado" onChange={handleStateChange}>
            <option value="all">Estado</option>
            {estados.map((estado, index) => (
              <option key={index} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Buscar nombre"
            onChange={handleNameFilterChange}
          />
          <input
            type="text"
            placeholder="Buscar teléfono"
            onChange={handlePhoneFilterChange}
          />
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="50">50 por página</option>
            <option value="100">100 por página</option>
            <option value="500">500 por página</option>
          </select>
          {/* Botón de búsqueda */}
        </div>
        <button onClick={handleSearch} className="rounded-corners-button">
          Buscar
        </button>
        <div>
        <button onClick={() => window.open(openGmail(selectedItems), '_blank')} className= "button-to-mail"> 
          Enviar Email
        </button>
        </div>
        <div className="box-counter">
          <h4 className="counter-box">
            Página {currentPage} de {totalPages}
          </h4>
        </div>
        <div style={{position: "fixed", bottom: 0, paddingBottom: "10px"}}>
          <button
            className="little-rounded-corners-button"
            onClick={handleFirstPage}
          >
            Primero
          </button>
          <button
            className="little-rounded-corners-button"
            onClick={handlePreviousPage}
          >
            Anterior
          </button>

          <button
            className="little-rounded-corners-button"
            onClick={handleNextPage}
          >
            Siguiente
          </button>
          <button
            className="little-rounded-corners-button"
            onClick={handleLastPage}
          >
            Último
          </button>
        </div>
        <br />
        {displayData.length === 0 ? (
          <div style={warning}>
            <p>No se han encontrado pacientes</p>
          </div>
        ) : (
          <PatientTable
            displayData={displayData}
            handleToggleDetails={handleToggleDetails}
            handleUpdate={handleUpdate}
            handleDeleteOne={handleDeleteOne}
            setChan={setChan}
            selectedUpdatePatient={selectedUpdatePatient}
            handleCheckboxChange={handleCheckboxChange}
          ></PatientTable>
        )}
      </div>
    </div>
  )
}
