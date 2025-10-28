import axios from "axios"
import { useEffect, useState } from "react"

const ViewContacto = () => {

  const [contactoMsgs, setContactoMsgs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    axios.get("https://back-fisioterapia.onrender.com/api/contacto")
    .then(response => setContactoMsgs(response.data))
    .finally(() => {
      setLoading(false)}
    )
  })

  if(loading) {

    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Cargando consultas...</p>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="text-center mb-5 fw-bold text-primary">
        Consultas de Contacto
      </h1>

      {contactoMsgs.length === 0 ? (
        <p className="text-center text-secondary fs-5">
          No hay consultas registradas.
        </p>
      ) : (
        <div className="row g-4">
          {contactoMsgs.map((c) => (
            <div key={c._id} className="col-md-6 col-lg-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">
                    {c.nombres}
                  </h5>
                  <p className="card-text mb-1">
                    <strong>Correo:</strong> {c.correo}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Teléfono:</strong> {c.telefono}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Asunto:</strong> {c.asunto}
                  </p>
                  <p className="card-text text-secondary mt-3">
                    <strong>Mensaje:</strong> <br />
                    {c.mensaje}
                  </p>
                </div>
                <div className="card-footer bg-transparent text-end">
                  <small className="text-muted">🕓 Recibido recientemente</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default ViewContacto