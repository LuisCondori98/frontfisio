import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {

  const {isAuthenticated, logout, user} = useContext(AuthContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo o nombre */}
        <Link className="navbar-brand" to="/">
          Vivir en movimiento
        </Link>

        {/* Botón para el menú colapsable en móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links del menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="text-white nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="text-white nav-link" to="/servicios">
                Servicios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="text-white nav-link" to="/contacto">
                Contacto
              </Link>
            </li>
            {
              isAuthenticated?
              <li>
                <Link className="text-white btn btn-primary" to="/perfil">
                  {user.nombre}
                </Link>
              </li>
              :
              <li className="nav-item">
                <Link className="text-white btn btn-success" to="/login">
                  Iniciar sesión
                </Link>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar