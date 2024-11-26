import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  logout,
  getMail,
  request,
} from "../helpers/axios_helper"
import Toast from "../components/Toast"

import {
  faCog,
  faUser,
  faUserPlus,
  faList,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons"
import logoR from "../assets/logoR.png"
import swal from "sweetalert"

const Navbar = () => {
  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    background: "#1562C0",
    color: "#fff",
    boxShadow: "0px 30px 50px 0px rgba(0, 0, 0, 0.2)",
    zIndex: 1000, // Asegura que la barra esté sobre otros elementos
    marginBottom: "100px",
  }
  const navStyleAdmin = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "black",
    color: "#fff",
    boxShadow: "0px 30px 50px 0px rgba(0, 0, 0, 0.2)",
    zIndex: 1000, // Asegura que la barra esté sobre otros elementos
    marginBottom: "100px",
  }
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "20px",
  }

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
  }

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    margin: "0 15px",
    cursor: "pointer",
  }

  const iconStyle = {
    marginRight: "5px",
  }
  const handleRefreshPage = () => {
    window.location.href = "/pacientes";
  }
  const pageStyle = {
    marginTop: "95px",
  }

  const navigate = useNavigate()

  const handleLogout = () => {
    swal({
      title: "¿Está seguro que desea salir del sistema?",
      icon: "warning",
      buttons: ["Cancelar", "Salir"],
    }).then((respuesta) => {
      if (respuesta) {
        Toast.fire({
          icon: "success",
          title: "Sesión cerrada correctamente",
        })
        logout()
        navigate("/login")
      }
    })
  }
  const email = getMail()

  const location = useLocation().pathname
  const [hide, setHide] = useState(false)
  useEffect(() => {
    if (location === "/login") setHide(true)
    else setHide(false)
    request("POST", "/get-rol", "").then((response) => {
      if (response.data === 1) {
        setisAdmin(true)
      } else {
        setisAdmin(false)
      }
    })
  }, [location])
  const [isAdmin, setisAdmin] = useState(false)

  return (
    <div style={hide ? { display: "none" } : {}}>
      <nav style={isAdmin ? navStyleAdmin: navStyle}>
        <div style={containerStyle}>
          <Link to="/" style={linkStyle}>
            {<img src={logoR} width="105" height="80" alt="LogoR" />}
          </Link>
          <ul style={navLinksStyle}>
            <li>
              <Link to="/ingreso-pacientes" style={linkStyle}>
                <FontAwesomeIcon icon={faUser} style={iconStyle} />
                Ingresar Pacientes
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/administrar" style={linkStyle}>
                  <FontAwesomeIcon icon={faCog} style={iconStyle} />
                  Administrar
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/pacientes"
                style={linkStyle}
                onClick={handleRefreshPage}
              >
                <FontAwesomeIcon icon={faList} style={iconStyle} />
                Listado Pacientes
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/register" style={linkStyle}>
                  <FontAwesomeIcon icon={faUserPlus} style={iconStyle} />
                  Registrar Usuario
                </Link>
              </li>
            )}
            <li>
              <Link to="#" style={linkStyle}>
                <FontAwesomeIcon icon={faUser} style={iconStyle} />
                &nbsp;{email}
              </Link>
            </li>
            <li>
              <div onClick={handleLogout} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faRightToBracket} style={iconStyle} />
                &nbsp;Salir
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div style={pageStyle}></div>
    </div>
  )
}

export default Navbar
