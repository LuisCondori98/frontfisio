import axios from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"

const Contacto = () => {

  const {user} = useContext(AuthContext)
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [telefono, setTelefono] = useState("")
  const [asunto, setAsunto] = useState("")
  const [mensaje, setMensaje] = useState("")

  const handleContacto = () => {

    axios.post("https://back-fisioterapia.onrender.com/api/contacto", {
      nombres: nombre,
      correo,
      telefono,
      asunto,
      mensaje
    })
      .then(response => response.data)
  }

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success">Contáctanos</h2>
        <p className="text-muted">
          En <strong>Vivir en movimiento</strong> nos preocupamos por tu bienestar.  
          Escríbenos y te ayudaremos a agendar una cita o resolver tus dudas.
        </p>
      </div>

      <div className="row g-4">
        {/* Información de contacto */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h4 className="text-success mb-3">Información</h4>
            <p><i className="bi bi-geo-alt-fill text-success me-2"></i> Av. Los Fisios 123, Lima, Perú</p>
            <p><i className="bi bi-telephone-fill text-success me-2"></i> +51 999 888 777</p>
            <p><i className="bi bi-envelope-fill text-success me-2"></i> contacto@fisiosalud.pe</p>

            <h5 className="mt-4 text-success">Horarios de Atención</h5>
            <ul className="list-unstyled">
              <li>Lunes a Viernes: 8:00 am - 7:00 pm</li>
              <li>Sábados: 9:00 am - 2:00 pm</li>
            </ul>

            <div className="mt-3">
              <a href="https://wa.me/51999888777" target="_blank" className="btn btn-success w-100">
                <i className="bi bi-whatsapp me-2"></i> Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="text-success mb-3">Envíanos un mensaje</h4>
            <form onSubmit={handleContacto}>
              <div className="row g-3">
                {
                  user?
                  <div>
                    <div className="col-md-6">
                      <label className="form-label">Nombre completo</label>
                      <input type="text"
                            className="form-control"
                            value={user.nombre}
                            onChange={e => setNombre(e.target.value)}
                            name="nombres"
                            placeholder="Tu nombre"
                            required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control"
                        value={user.correo}
                        onChange={e => setCorreo(e.target.value)}
                        name="correo" placeholder="correo@ejemplo.com" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Teléfono</label>
                        <input type="text"
                               className="form-control"
                               value={user.celular}
                               readOnly
                               onChange={e => setTelefono(e.target.value)}
                               name="telefono" placeholder="+51 999 999 999" />
                      </div>
                  </div>
                  :
                  <div>
                    <div className="col-md-6">
                      <label className="form-label">Nombre completo</label>
                      <input type="text"
                             className="form-control"
                             onChange={e => setNombre(e.target.value)}
                             name="nombres"
                             placeholder="Tu nombre"
                             required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Correo electrónico</label>
                      <input type="email"
                             className="form-control"
                             onChange={e => setCorreo(e.target.value)}
                             name="correo"
                             placeholder="correo@ejemplo.com"
                             required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Teléfono</label>
                      <input type="text"
                             className="form-control"
                             onChange={e => setTelefono(e.target.value)}
                             name="telefono" />
                    </div>
                  </div>
                }
                <div className="col-md-6">
                  <label className="form-label">Asunto</label>
                  <input type="text" className="form-control" onChange={e => setAsunto(e.target.value)}
                  name="asunto" placeholder="Reserva de cita / Consulta" />
                </div>
                <div className="col-12">
                  <label className="form-label">Mensaje</label>
                  <textarea className="form-control" onChange={e => setMensaje(e.target.value)}
                  rows="4" name="mensaje" placeholder="Escribe tu mensaje aquí..." required></textarea>
                </div>
                <div className="col-12 text-center mt-3">
                  <input type="submit" className="btn btn-success px-5 py-2" value={"Enviar"} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="mt-5">
        <h4 className="text-center text-success mb-3">Encuéntranos fácilmente</h4>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.0!2d-77.0428!3d-12.0464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8bfbbdbf11f%3A0x1bcb6f3f0c!2sLima%2C%20Perú!5e0!3m2!1ses!2spe!4v1676858499999"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}

export default Contacto