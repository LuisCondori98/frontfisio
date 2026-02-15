import "./Index.css"
import {Link} from "react-router-dom"

const Index = () => {

  document.title = "Inicio"

  return (
    <main>
      {/* Sección principal con fondo inspirador */}
      <section
        className="index-wall d-flex justify-content-center align-items-center text-center text-white">
        {/* Capa oscura para resaltar texto */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: "20px",
            backdropFilter: "blur(3px)",
          }}
          className="p-5 w-75 m-auto"
        >
          <h3 className="text-success fw-bold">Centro de Fisioterapia</h3>
          <h1 className="display-5 fw-bold text-light">“Vivir en movimiento”</h1>
          <p className="mt-3 fs-5">
            Cuidamos tu salud, recuperamos tu movilidad y mejoramos tu calidad de vida. 💚
          </p>
          <a href="#servicios" className="btn btn-success mt-3 px-4 py-2">
            Conoce nuestros servicios
          </a>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section id="servicios" className="py-5">
        <h3 className="text-center text-white bg-success py-3 rounded-2 w-75 m-auto">
          Nuestros Servicios
        </h3>

        <div
          className="container d-grid mt-5"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
          }}
        >
          {/* Tarjeta 1 */}
          <div
            className="card border-0 shadow-lg overflow-hidden"
            data-aos="flip-right"
          >
            <img
              className="w-100"
              src="/img/fisioOrtop.webp"
              alt="Fisioterapia ortopédica"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h4 className="text-success fw-bold">Fisioterapia Ortopédica</h4>
              <p className="text-muted">
                Tratamos lesiones en huesos, músculos, ligamentos y articulaciones para una recuperación segura.
              </p>
              <Link className="btn btn-warning" to={`/tratamiento/terapia-ortopedica`}>Ver mas</Link>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div
            className="card border-0 shadow-lg overflow-hidden"
            data-aos="flip-right"
          >
            <img
              className="w-100"
              src="/img/fisioGeria.jpg"
              alt="Fisioterapia geriátrica"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h4 className="text-success fw-bold">Fisioterapia Geriátrica</h4>
              <p className="text-muted">
                Diseñada para adultos mayores, ayudando a mantener la autonomía y prevenir caídas.
              </p>
              <Link className="btn btn-primary" to={`/tratamiento/terapia-geriatrica`}>Ver mas</Link>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div
            className="card border-0 shadow-lg overflow-hidden"
            data-aos="flip-right"
          >
            <img
              className="w-100"
              src="/img/fisioPedia.png"
              alt="Fisioterapia pediátrica"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h4 className="text-success fw-bold">Fisioterapia Pediátrica</h4>
              <p className="text-muted">
                Especial para niños y bebés con retrasos motores o discapacidades, fomentando su desarrollo.
              </p>
              <Link className="btn btn-warning" to={`/tratamiento/terapia-pediatrica`}>Ver mas</Link>
            </div>
          </div>

          {/* Tarjeta 4 */}
          <div
            className="card border-0 shadow-lg overflow-hidden"
            data-aos="flip-right"
          >
            <img
              className="w-100"
              src="/img/fisioReuma.jpg"
              alt="Fisioterapia reumatológica"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h4 className="text-success fw-bold">Fisioterapia Reumatológica</h4>
              <p className="text-muted">
                Tratamiento para enfermedades crónicas inflamatorias que afectan las articulaciones.
              </p>
              <Link className="btn btn-warning" to={`/tratamiento/terapia-reumatologica`}>Ver mas</Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <a href="/contacto" className="btn btn-outline-success px-4 py-2">
            <i className="bi bi-calendar-check me-2"></i> Agenda tu evaluación gratuita
          </a>
        </div>
      </section>
    </main>
  )
}

export default Index