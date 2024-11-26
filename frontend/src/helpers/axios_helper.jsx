import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8090"
axios.defaults.headers.post["Content-Type"] = "application/json"

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token")
}
export const getMail = () => {
  return window.localStorage.getItem("mail")
}
export const setAuthHeader = (token) => {
  window.localStorage.setItem("auth_token", token)
}
export const setMail = (mail) => {
  window.localStorage.setItem("mail", mail)
}
export const logout = () => {
  window.localStorage.clear()
  console.log(window.localStorage.getItem("auth_token"))
}
export const isValid = async () => {
  try {
    const response = await request("POST", "/validate", "")
    console.log(response.data)
    return response.data
  } catch (error) {
    // Manejar el error si la solicitud falla
    console.error("Error en la solicitud:")
    return false
  }
}
export const request = (method, url, data) => {
  let headers = {}
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { Authorization: `Bearer ${getAuthToken()}` }
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  })
}
