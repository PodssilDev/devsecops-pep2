import React from "react"
import { Link } from "react-router-dom"
import "../styles/Home.css"
import "../styles/Background.css"

export default function Home() {
  return (
    <div className="bg">
      <div className="abs">
        <div className="container">
          <div className="button-container">
            <Link to="/ingreso-pacientes" typeof="ingreso">
              <button className="btn1"></button>
            </Link>
            <b className="btn-text">Ingresar Pacientes</b>
          </div>
          <div className="button-container">
            <Link to="/pacientes">
              <button className="btn2"></button>
            </Link>
            <b className="btn-text">Lista de Pacientes</b>
          </div>
        </div>
      </div>
    </div>
  )
}
