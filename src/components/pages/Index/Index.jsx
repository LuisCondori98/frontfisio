import "./Index.css"
import axios from "axios";
import {Link} from "react-router-dom"
import { motion } from "motion/react"
import { useState } from "react"
import { useEffect } from "react"

const Index = () => {

  const [fisio, setFisios] = useState([])
  const [fisioById, setFisioById] = useState(null)

  document.title = "Inicio"

  useEffect(() => {

    const obtenerFisios = async () => {

      try {

        const response = await axios.get(
          "https://back-fisioterapia.onrender.com/api/fisioterapeuta"
        );

        setFisios(response.data);
      } catch (err) {

        console.error("Error al obtener fisioterapeutas:", err);
      }
    };

    obtenerFisios();

  }, []);



  const handlePerfilFisio = async (id) => {

    try {

      const response = await axios.get(`https://back-fisioterapia.onrender.com/api/fisioterapeuta/${id}`)

      setFisioById(response.data)
      console.log(response.data)
    } catch(err) {

      console.error("Error" + err)
    }
  }
  
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
          {
            fisio.length === 0 ?
            (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) :
            (
              fisio.map((f) => (
                <motion.div
                  key={f._id}
                  className="col-md-4 mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="card shadow border-0"
                  >
                    <img
                      src={`/img/${f.img}`}
                      className="card-img-top"
                      alt={f.nombre}
                      style={{ height: "310px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title fw-bold">
                        {f.nombre}
                      </h5>
                      <p className="card-text text-muted">
                        Fisioterapeuta
                      </p>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handlePerfilFisio(f._id)}
                        data-bs-toggle="modal"
                        data-bs-target="#modalFisio"
                      >
                        Ver Perfil
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            )
          }
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

          {/* Tarjeta 5 */}
          <div
            className="card border-0 shadow-lg overflow-hidden"
            data-aos="flip-right"
          >
            <img
              className="w-100"
              src="/img/fisioNeurologica.webp"
              alt="Fisioterapia reumatológica"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h4 className="text-success fw-bold">Fisioterapia Neurologica</h4>
              <p className="text-muted">
                Trata alteraciones del sistema nervioso (cerebro, médula espinal y nervios) que afectan el movimiento, el equilibrio, la coordinación y la fuerza.
              </p>
              <Link className="btn btn-primary" to={`/tratamiento/terapia-neurologica`}>Ver mas</Link>
            </div>
          </div>

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
      </section>

      {/* MODAL PERFIL FISIOTERAPEUTA */}
      <div 
        className="modal fade" 
        id="modalFisio" 
        tabIndex="-1" 
        aria-labelledby="modalFisioLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">

            {/* HEADER */}
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title" id="modalFisioLabel">
                Perfil del Fisioterapeuta
              </h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* BODY */}
            <div className="modal-body">

              {fisioById ? (
                <div className="row">

                  {/* FOTO */}
                  <div className="col-md-4 text-center">
                    <img
                      src={`/img/${fisioById.img}`}
                      alt={fisioById.nombre}
                      className="img-fluid rounded shadow-sm mb-3"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                  </div>

                  {/* INFORMACIÓN */}
                  <div className="col-md-8">

                    <h4 className="fw-bold text-dark">
                      {fisioById.nombre} {fisioById.apellidoPaterno} {fisioById.apellidoMaterno}
                    </h4>

                    <p className="text-muted mb-2">
                      <strong>Especialidad:</strong> {fisioById.especialidad}
                    </p>

                    <p className="text-muted mb-2">
                      <strong>Teléfono:</strong> {fisioById.telefono}
                    </p>

                    <p className="text-muted mb-2">
                      <strong>Email:</strong> {fisioById.email}
                    </p>

                    <p className="text-muted mb-2">
                      <strong>Estudios:</strong> {fisioById.universidad}
                    </p>

                    <p className="text-muted mb-2">
                      <strong>Experiencia:</strong> {fisioById.descProfesional}
                    </p>

                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="spinner-border text-success"></div>
                  <p className="mt-2">Cargando información...</p>
                </div>
              )}

            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default Index