import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="pt-5 pb-4 mt-5"
      style={{
        background: "#f8fafc",
        borderTop: "1px solid #e2e8f0"
      }}
    >
      <div className="container text-center">

        {/* Logo centrado */}
        <div className="mb-4">
          <h3 className="fw-bold" style={{ color: "#0f172a" }}>
            Vivir en Movimiento
          </h3>
          <p className="text-muted">
            Centro de Fisioterapia y Rehabilitación Integral
          </p>
        </div>

        {/* Secciones */}
        <div className="row text-start text-md-center mb-4">

          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold mb-3">Enlaces</h6>
            <ul className="list-unstyled">
              <li>
                <Link className="text-muted text-decoration-none d-block mb-2" to="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="text-muted text-decoration-none d-block mb-2" to="/servicios">
                  Servicios
                </Link>
              </li>
              <li>
                <Link className="text-muted text-decoration-none d-block" to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold mb-3">Contacto</h6>
            <p className="text-muted mb-1">📍 Huancayo - Perú</p>
            <p className="text-muted mb-1">📞 +51 900 000 000</p>
            <p className="text-muted">✉ contacto@vivirenmovimiento.com</p>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold mb-3">Horario</h6>
            <p className="text-muted mb-1">Lunes a Viernes</p>
            <p className="text-muted mb-1">8:00 am – 7:00 pm</p>
            <p className="text-muted">Sábados 8:00 am – 1:00 pm</p>
          </div>

        </div>

        <hr style={{ borderColor: "#e2e8f0" }} />

        <div className="text-muted small">
          © {new Date().getFullYear()} Vivir en Movimiento. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
};

export default Footer;