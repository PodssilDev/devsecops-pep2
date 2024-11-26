import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"

const tdStyle = {
  backgroundColor: "#ffffff", // Color de fondo de las celdas de datos
  textAlign: "start", // Alineación del texto
}
const icon = {
  opacity: "0.8",
  cursor: "pointer",
  textAlign: "center",
}

export default function PatientRow({ patient, handleUpdate, handleDeleteOne, handleCheckboxChange}) {
  return (
    <tr style={tdStyle}>
      <td>{patient.nombre}</td>
      <td>{patient.apellidos}</td>
      <td>{patient.celular === "" ? <b>No registrado</b> : patient.celular}</td>
      <td>{patient.e_mail === "" ? <b>No registrado</b> : patient.e_mail}</td>
      <td>{patient.estado}</td>
      
      <td style={icon} onClick={() => handleUpdate(patient)}>
        <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} />
      </td>
      <td style={icon} onClick={() => handleDeleteOne(patient)}>
        <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} />
      </td>
      <td style={icon}>
      {patient.e_mail === "" || patient.e_mail === "notiene@notiene.cl" ? null :
        <input 
          type="checkbox"
          onChange={() => handleCheckboxChange(patient.e_mail)}
        /> 
      }
      </td>
      <td style={icon}>
        {patient.celular !== "" && (
          <Link
            to={`//api.whatsapp.com/send?phone=${patient.celular}&text=Escriba%20su%20mensaje%20aquí`}
            style={{ cursor: "pointer" }}
            target="_blank"
          >
            <FontAwesomeIcon icon={faWhatsapp} style={{"color": "black"}} />
          </Link>
        )}
      </td>
    </tr>
  )
}
