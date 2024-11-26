import React from "react"
import UserRow from "./UserRow"
import UpdateUser from "./UpdateUser"

export default function UserTable({
  displayData,
  handleToggleDetails,
  handleUpdate,
  handleDeleteOne,
  setChan,
  selectedUpdatePatient,
}) {
  const tableStyle = {
    width: "50%", // Ancho de la tabla
    borderCollapse: "collapse", // Borde de las celdas
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Sombra con desplazamiento vertical de 4px y desplazamiento horizontal de 0px
  }
  const thStyle = {
    backgroundColor: "black", // Color de fondo del encabezado de columna
    color: "#fff", // Color de texto blanco para el encabezado
    padding: "5px", // Espaciado interno
  }
  return (
    <table id="patients_table" style={tableStyle}>
      <thead>
        <tr>
          <th style={{ ...thStyle }}>E-mail</th>
          <th style={{ ...thStyle }}>Ver / Editar</th>
          <th style={{ ...thStyle }}>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {displayData.map((user) => (
          <React.Fragment key={user.id}>
            <UserRow
              user={user}
              handleToggleDetails={handleToggleDetails}
              handleUpdate={handleUpdate}
              handleDeleteOne={handleDeleteOne}
            ></UserRow>
            {selectedUpdatePatient &&
              selectedUpdatePatient.id === user.id && (
                <UpdateUser
                  id={selectedUpdatePatient.id}
                  setChange={setChan}
                ></UpdateUser>
              )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}
