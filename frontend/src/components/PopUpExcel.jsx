import React, { useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTimes, faFileExcel } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import swal from "sweetalert"
import "../styles/loader.css"

export default function PopUpExcel() {
  const [showPopup, setShowPopup] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null) // Referencia al input de tipo archivo
  const API_URL = "/paciente"

  const openPopUp = {
    border: "0px solid #808080",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    height: "3rem",
    background: "#27A569",
    color: "white",
    borderRadius: "10px",
    fontFamily: "Poppins",
    fontSize: "1rem",
  }
  const icon = {
    fontSize: "2rem",
    paddingRight: "10px",
  }
  const txt = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  const popupStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  }

  const popupContentStyles = {
    backgroundColor: "white",
    padding: "2rem",
    height: "50%",
    width: "70%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: "5px",
    textAlign: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "6rem",
  }

  const fileInputStyles = {
    display: "none",
  }

  const grayIconStyles = {
    color: "gray",
    fontSize: "700%",
    opacity: "0.5",
    marginBottom: "1rem",
  }

  const smallButtonStyles = {
    background: "#1562C0",
    color: "#fff",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    cursor: "pointer",
    marginTop: "6px",
    borderRadius: "5px",
  }
  const uploadButtonStyles = {
    background: "#28a745",
    color: "#fff",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  }
  const x = {
    position: "absolute",
    top: "1rem",
    right: "1.5rem",
    cursor: "pointer",
    fontSize: "180%",
    opacity: "0.6",
  }

  const placeHolder = {
    opacity: "0.7",
    cursor: "pointer",
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
    setFile(null) // Limpiar el archivo cuando se cierre el popup
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    setFile(droppedFile)
    console.log("Archivo arrastrado y soltado:", droppedFile)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    console.log("Archivo seleccionado:", selectedFile)
  }

  const openFileExplorer = () => {
    // Dispara el evento click en el input de tipo archivo
    fileInputRef.current.click()
  }
  const upload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    setUploading(true)
    try {
      await axios.post(API_URL, formData, config)
      swal("Archivo cargado exitosamente! Tenga en consideración que solo se cargaron los pacientes que no estaban registrados en el sistema.", { icon: "success"})
    } catch (error) {
      swal("El archivo no cumple con el formato .csv", {
        icon: "error",
        timer: "3000",
      })
    } finally {
      // Deshabilitar el loader cuando la carga se complete
      setUploading(false)
    }
  }
  return (
    <div>
      <button style={openPopUp} onClick={togglePopup}>
        <div style={txt}>
          <FontAwesomeIcon icon={faFileExcel} style={icon} />
          Subir Archivo .csv
        </div>
      </button>
      {showPopup && (
        <div
          style={popupStyles}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div style={popupContentStyles}>
            <div style={x}>
              <FontAwesomeIcon icon={faTimes} onClick={togglePopup} />
            </div>
            <h2>Subir Archivo .csv</h2>
            <FontAwesomeIcon icon={faSave} style={grayIconStyles} /><div className="size">
            {uploading && <span className="loader"></span>}</div>
            <div>
              <input
                type="file"
                style={fileInputStyles}
                accept=".csv"
                onChange={handleFileChange}
                ref={fileInputRef} // Asociar la referencia al input de tipo archivo
              />
              <button style={smallButtonStyles} onClick={openFileExplorer}>
                Examinar
              </button>
              <p
                style={placeHolder}
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file
                  ? `Archivo seleccionado: ${file.name}`
                  : dragging
                  ? "Suelta el archivo aquí"
                  : "o arrastra aquí un archivo"}
              </p>
              <button style={uploadButtonStyles} onClick={upload}>
                Subir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
