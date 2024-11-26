import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { request } from "../helpers/axios_helper"

export default function PrivateRoute({ children }) {
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await request("POST", "/validate", "")
        console.log("Usuario válido")
        setIsValid(response.data)
      } catch (error) {
        // Manejar el error si la solicitud falla
        console.error("Usuario no autorizado:")
        setIsValid(false)
      }
    }

    validateUser()
  }, [])

  if (isValid === null) {
    // Puedes mostrar un spinner de carga mientras se verifica la autenticación
    return <h1>Cargando...</h1>
  }

  return isValid ? children : <Navigate to="/login" />
}
