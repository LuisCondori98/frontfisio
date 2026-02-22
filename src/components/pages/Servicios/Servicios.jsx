import { Link } from "react-router-dom"

const Servicios = () => {

  document.title = "Servicios"

  return (
    <>

    {/* HERO SUPERIOR */}
    <div className="bg-success text-white text-center py-5">
      <div className="container">
        <h1 className="fw-bold">Servicios de Fisioterapia Especializada</h1>
        <p className="lead mt-3">
          En <strong>Vivir en Movimiento</strong> trabajamos con tratamientos personalizados
          para ayudarte a recuperar tu movilidad y calidad de vida.
        </p>
      </div>
    </div>

    {/* SECCIÓN PROCESO */}
    <div className="container my-5">
      <div className="row text-center">
        <div className="col-md-4">
          <img src="/img/eva-inicial.avif" alt="evaluacion inicial" />
          <i className="bi bi-clipboard-check fs-1 text-success"></i>
          <h5 className="fw-bold mt-3">Evaluación Inicial</h5>
          <p className="text-muted">
            Analizamos tu condición física para diseñar el mejor tratamiento.
          </p>
        </div>

        <div className="col-md-4">
          <img src="/img/plan-personalizado.jpg" alt="plan personalizado" />
          <i className="bi bi-heart-pulse fs-1 text-success"></i>
          <h5 className="fw-bold mt-3">Plan Personalizado</h5>
          <p className="text-muted">
            Creamos un plan adaptado a tus necesidades específicas.
          </p>
        </div>

        <div className="col-md-4">
          <img src="/img/seguimiento.jpg" alt="seguimiento profesional" />
          <i className="bi bi-graph-up fs-1 text-success"></i>
          <h5 className="fw-bold mt-3">Seguimiento Profesional</h5>
          <p className="text-muted">
            Monitoreamos tu progreso para asegurar resultados efectivos.
          </p>
        </div>
      </div>
    </div>
    {/* ======================================================================================= */}
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success">Nuestros Servicios</h2>
        <p className="text-muted fs-5">
          En <strong>Vivir en movimiento</strong> te ayudamos a recuperar tu bienestar físico con terapias personalizadas
          y profesionales certificados.
        </p>
      </div>

      <div className="row g-4">
        {/* Servicio 1 */}
        <div className="col-md-4" data-aos="zoom-in">
          <div className="card border-0 shadow-sm h-100 text-center p-3">
            <img
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883"
              className="card-img-top rounded-3"
              alt="Terapia Física"
              style={{ height: '220px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title text-success fw-bold">Terapia Física</h5>
              <p className="card-text text-muted">
                Tratamientos personalizados para aliviar el dolor muscular, mejorar la movilidad y fortalecer tu cuerpo.
              </p>
            </div>
            <Link className="btn btn-dark">Ver Especialistas</Link>
          </div>
        </div>

        {/* Servicio 2 */}
        <div className="col-md-4" data-aos="zoom-in">
          <div className="card border-0 shadow-sm h-100 text-center p-3">
            <img
              src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
              className="card-img-top rounded-3"
              alt="Rehabilitación post-lesión"
              style={{ height: '220px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title text-success fw-bold">Rehabilitación Post-Lesión</h5>
              <p className="card-text text-muted">
                Recupera tu fuerza y movilidad tras lesiones musculares o articulares con apoyo de nuestros especialistas.
              </p>
            </div>
            <Link className="btn btn-dark">Ver Especialistas</Link>
          </div>
        </div>

        {/* Servicio 3 */}
        <div className="col-md-4" data-aos="zoom-in">
          <div className="card border-0 shadow-sm h-100 text-center p-3">
            <img
              src="/img/MASOTERAPIA.jpg"
              className="card-img-top rounded-3"
              alt="Masoterapia"
              style={{ height: '220px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title text-success fw-bold">Masoterapia</h5>
              <p className="card-text text-muted">
                Masajes terapéuticos que alivian tensiones, reducen el estrés y favorecen la circulación sanguínea.
              </p>
            </div>
            <Link className="btn btn-dark">Ver Especialistas</Link>
          </div>
        </div>

        {/* Servicio 4 */}
        <div className="col-md-4" data-aos="zoom-in">
          <div className="card border-0 shadow-sm h-100 text-center p-3">
            <img
              src="/img/fisioPedia.png"
              className="card-img-top rounded-3"
              alt="Terapia pediátrica"
              style={{ height: '220px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title text-success fw-bold">Fisioterapia Pediátrica</h5>
              <p className="card-text text-muted">
                Atención especializada para niños con alteraciones motoras o necesidades especiales de desarrollo.
              </p>
            </div>
            <Link className="btn btn-dark">Ver Especialistas</Link>
          </div>
        </div>

        {/* Servicio 5 */}
        <div className="col-md-4" data-aos="zoom-in">
          <div className="card border-0 shadow-sm h-100 text-center p-3">
            <img
              src="/img/fisioDeportivo.webp"
              className="card-img-top rounded-3"
              alt="Terapia deportiva"
              style={{ height: '220px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title text-success fw-bold">Fisioterapia Deportiva</h5>
              <p className="card-text text-muted">
                Prevención y recuperación de lesiones deportivas para mejorar tu rendimiento físico y movilidad.
              </p>
            </div>
            <Link className="btn btn-dark">Ver Especialistas</Link>
          </div>
        </div>

        {/* Servicio 6 */}
        <div className="col-md-4" data-aos="zoom-in">
          <div className="card border-0 shadow-sm h-100 text-center p-3">
            <img
              src="/img/fisioOcupa.jpg"
              className="card-img-top rounded-3"
              alt="Terapia ocupacional"
              style={{ height: '220px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title text-success fw-bold">Terapia Ocupacional</h5>
              <p className="card-text text-muted">
                Entrenamiento para retomar tus actividades cotidianas con independencia y confianza.
              </p>
            </div>
            <Link className="btn btn-dark">Ver Especialistas</Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h4 className="fw-bold text-success">¿No sabes qué terapia necesitas?</h4>
        <p className="text-muted mb-3">Agenda una evaluación gratuita con nuestros fisioterapeutas.</p>
        <a href="/contacto" className="btn btn-success px-4 py-2">
          <i className="bi bi-calendar-check me-2"></i> Agendar Evaluación
        </a>
      </div>
    </div>
    </>
  )
}

export default Servicios