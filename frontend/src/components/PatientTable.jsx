import React from "react"
import PatientRow from "./PatientRow"
import UpdatePatient from "./UpdatePatient"

export default function PatientTable({
  displayData,
  handleToggleDetails,
  handleUpdate,
  handleDeleteOne,
  setChan,
  selectedUpdatePatient,
  handleCheckboxChange,
}) {
  const tableStyle = {
    width: "90%", // Ancho de la tabla
    borderCollapse: "collapse", // Borde de las celdas
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Sombra con desplazamiento vertical de 4px y desplazamiento horizontal de 0px
  }
  const thStyle = {
    backgroundColor: "#1562C0", // Color de fondo del encabezado de columna
    color: "#fff", // Color de texto blanco para el encabezado
    padding: "5px", // Espaciado interno
  }
  return (
    <table id="patients_table" style={tableStyle}>
      <thead>
        <tr>
          <th style={{ ...thStyle, width: "10%" }}>Nombre</th>
          <th style={{ ...thStyle, width: "15%" }}>Apellidos</th>
          <th style={{ ...thStyle, width: "15%" }}>Teléfono</th>
          <th style={{ ...thStyle }}>E-mail</th>
          <th style={{ ...thStyle, width: "30%" }}>Estado</th>
          <th style={{ ...thStyle }}>Editar</th>
          <th style={{ ...thStyle }}>Eliminar</th>
          <th style={{ ...thStyle }}>Mail</th>
          <th style={{ ...thStyle }}>Mensaje</th>
        </tr>
      </thead>
      <tbody>
        {displayData.map((patient) => (
          <React.Fragment key={patient.id}>
            <PatientRow
              patient={patient}
              handleToggleDetails={handleToggleDetails}
              handleUpdate={handleUpdate}
              handleDeleteOne={handleDeleteOne}
              handleCheckboxChange={handleCheckboxChange}
            ></PatientRow>
            {selectedUpdatePatient &&
              selectedUpdatePatient.id === patient.id && (
                <UpdatePatient
                  id={selectedUpdatePatient.id}
                  setChange={setChan}
                ></UpdatePatient>
              )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}
