import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container text-center">

        {/* Logo */}
        <div className="mb-4">
          <h4 className="fw-bold text-white">
            Vivir en Movimiento
          </h4>
          <p className="text-secondary small">
            Centro Especializado en Fisioterapia y Rehabilitación
          </p>
        </div>

        {/* Links */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Enlaces</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-secondary text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-secondary text-decoration-none">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-secondary text-decoration-none">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contacto</h6>
            <p className="text-secondary mb-1">📍 Lima, Perú</p>
            <p className="text-secondary mb-1">📞 +51 900 000 000</p>
            <p className="text-secondary">✉ contacto@vivirenmovimiento.com</p>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Horario</h6>
            <p className="text-secondary mb-1">Lunes - Viernes</p>
            <p className="text-secondary mb-1">8:00 am - 7:00 pm</p>
            <p className="text-secondary">Sábados 8:00 am - 1:00 pm</p>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="border-secondary" />

        {/* Copyright */}
        <div className="text-secondary small">
          © {new Date().getFullYear()} Vivir en Movimiento - Todos los derechos reservados
        </div>

      </div>
    </footer>
  );
};

export default Footer;