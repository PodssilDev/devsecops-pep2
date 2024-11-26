import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"

const tdStyle = {
  backgroundColor: "#ffffff", // Color de fondo de las celdas de datos
  textAlign: "start", // Alineación del texto
}
const icon = {
  opacity: "0.8",
  cursor: "pointer",
  textAlign: "center",
}

export default function UserRow({ user, handleUpdate, handleDeleteOne }) {
  return (
    <tr style={tdStyle}>
      <td>{user.e_mail}</td>
      <td style={icon} onClick={() => handleUpdate(user)}>
        <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} />
      </td> 
     
      <td style={icon} onClick={ () => user.role_id !== 1 && handleDeleteOne(user)}>
        {user.role_id !== 1 && (
          <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} />
          )}
        </td>
    </tr>
  )
}
