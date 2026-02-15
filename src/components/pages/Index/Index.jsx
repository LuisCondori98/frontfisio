import "./Index.css"
import {Link} from "react-router-dom"
import { motion } from "motion/react"

const Index = () => {

  document.title = "Inicio"

  const equipo = [
  {
    nombre: "Dr. Carlos Mendoza",
    especialidad: "Fisioterapia Ortopédica",
    img: "https://via.placeholder.com/300x300"
  },
  {
    nombre: "Lic. Ana Torres",
    especialidad: "Fisioterapia Pediátrica",
    img: "https://via.placeholder.com/300x300"
  },
  {
    nombre: "Lic. Jorge Ramírez",
    especialidad: "Fisioterapia Geriátrica",
    img: "https://via.placeholder.com/300x300"
  }
];

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

      <section class="py-5 bg-light">
        <div class="container text-center">
          <h2 class="fw-bold mb-4">¿Por qué elegirnos?</h2>
          <div class="row">
            
            <div class="col-md-3">
              <div class="p-4 shadow-sm rounded bg-white">
                <h5>Atención Personalizada</h5>
                <p class="text-muted">Planes adaptados a cada paciente.</p>
              </div>
            </div>

            <div class="col-md-3">
              <div class="p-4 shadow-sm rounded bg-white">
                <h5>Profesionales Certificados</h5>
                <p class="text-muted">Especialistas con experiencia clínica.</p>
              </div>
            </div>

            <div class="col-md-3">
              <div class="p-4 shadow-sm rounded bg-white">
                <h5>Equipamiento Moderno</h5>
                <p class="text-muted">Tecnología avanzada para rehabilitación.</p>
              </div>
            </div>

            <div class="col-md-3">
              <div class="p-4 shadow-sm rounded bg-white">
                <h5>Resultados Comprobados</h5>
                <p class="text-muted">Pacientes satisfechos nos respaldan.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/*============================== NUESTRO EQUIPO  ======================= */ }

      <section className="py-5 bg-light">
      <div className="container text-center">
        <motion.h2
          className="fw-bold mb-5"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Nuestro Equipo
        </motion.h2>

        <div className="row">
          {equipo.map((persona, index) => (
            <motion.div
              key={index}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="card shadow border-0"
              >
                <img
                  src={persona.img}
                  className="card-img-top"
                  alt={persona.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    {persona.nombre}
                  </h5>
                  <p className="card-text text-muted">
                    {persona.especialidad}
                  </p>
                  <button className="btn btn-primary btn-sm">
                    Ver Perfil
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
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
              <Link className="btn btn-primary" to={`/tratamiento/terapia-ortopedica`}>Ver mas</Link>
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
              <Link className="btn btn-primary" to={`/tratamiento/terapia-pediatrica`}>Ver mas</Link>
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
              <Link className="btn btn-primary" to={`/tratamiento/terapia-reumatologica`}>Ver mas</Link>
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