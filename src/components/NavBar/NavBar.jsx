import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import "./NavBar.css"

const NavBar = () => {

  const { isAuthenticated, user } = useContext(AuthContext);
  const { total } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          Vivir en Movimiento
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/servicios">
                Servicios
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/contacto">
                Contacto
              </Link>
            </li>

            {isAuthenticated ? (
              <li className="nav-item mt-2 mt-lg-0">
                <Link className="btn btn-primary w-100 w-lg-auto" to="/perfil">
                  {user.nombre}
                </Link>
              </li>
            ) : (
              <li className="nav-item mt-2 mt-lg-0">
                <Link className="btn btn-success w-100 w-lg-auto" to="/login">
                  Iniciar sesión
                </Link>
              </li>
            )}

            {total > 0 && (
              <li className="nav-item mt-2 mt-lg-0">
                <Link className="btn btn-warning w-100 w-lg-auto" to="/checkout">
                  Costo S/ {total}
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;