import { useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const NavBar = () => {

  const { isAuthenticated, user } = useContext(AuthContext);
  const { total } = useContext(CartContext);

  const collapseRef = useRef(null);

  const cerrarMenu = () => {
    const bsCollapse = new window.bootstrap.Collapse(collapseRef.current, {
      toggle: false
    });
    bsCollapse.hide();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/" onClick={cerrarMenu}>
          Vivir en Movimiento
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav" ref={collapseRef}>
          <ul className="navbar-nav ms-auto gap-lg-4">

            <li className="nav-item">
              <NavLink className={({isActive}) => isActive ? "nav-link btn btn-dark" : "nav-link text-white"} to="/" onClick={cerrarMenu}>
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/servicios" onClick={cerrarMenu}>
                Servicios
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/contacto" onClick={cerrarMenu}>
                Contacto
              </Link>
            </li>

            {isAuthenticated ? (
              <li className="nav-item mt-2 mt-lg-0">
                <Link
                  className="btn btn-primary w-100 w-lg-auto"
                  to="/perfil"
                  onClick={cerrarMenu}
                >
                  {user.nombre}
                </Link>
              </li>
            ) : (
              <li className="nav-item mt-2 mt-lg-0">
                <Link
                  className="btn btn-success w-100 w-lg-auto"
                  to="/login"
                  onClick={cerrarMenu}
                >
                  Iniciar sesión
                </Link>
              </li>
            )}

            {total > 0 && (
              <li className="nav-item mt-2 mt-lg-0">
                <Link
                  className="btn btn-warning w-100 w-lg-auto"
                  to="/checkout"
                  onClick={cerrarMenu}
                >
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