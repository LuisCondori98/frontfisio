import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="pt-5 pb-4 mt-5"
      style={{
        background: "linear-gradient(to right, #e0f2fe, #f8fafc)",
        borderTop: "4px solid #0d6efd"
      }}
    >
      <div className="container text-center">

        {/* Logo centrado */}
        <div className="mb-4">
          <div
            className="mx-auto d-flex align-items-center justify-content-center shadow"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#0d6efd",
              color: "white",
              fontSize: "28px",
              fontWeight: "bold"
            }}
          >
            <img src="/img/logo.jpg" alt="logo
            " />
          </div>

          <h3 className="fw-bold mt-3" style={{ color: "#0f172a" }}>
            Vivir en Movimiento
          </h3>
          <p className="text-secondary">
            Centro de Fisioterapia y Rehabilitación
          </p>
        </div>

        {/* Información */}
        <div className="row text-center mb-4">

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-primary mb-3">Enlaces</h6>
            <Link to="/" className="d-block text-dark text-decoration-none mb-2">
              Inicio
            </Link>
            <Link to="/servicios" className="d-block text-dark text-decoration-none mb-2">
              Servicios
            </Link>
            <Link to="/contacto" className="d-block text-dark text-decoration-none">
              Contacto
            </Link>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-primary mb-3">Contacto</h6>
            <p className="text-dark mb-1">📍 Huancayo - Perú</p>
            <p className="text-dark mb-1">📞 +51 900 000 000</p>
            <p className="text-dark">✉ contacto@vivirenmovimiento.com</p>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-primary mb-3">Horario</h6>
            <p className="text-dark mb-1">Lunes a Viernes</p>
            <p className="text-dark mb-1">8:00 am – 7:00 pm</p>
            <p className="text-dark">Sábados 8:00 am – 1:00 pm</p>
          </div>

        </div>

        <div
          className="pt-3"
          style={{
            borderTop: "1px solid #cbd5e1"
          }}
        >
          <p className="small text-muted mb-0">
            © {new Date().getFullYear()} Vivir en Movimiento — Todos los derechos reservados
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;