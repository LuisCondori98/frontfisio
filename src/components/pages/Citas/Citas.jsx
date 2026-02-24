import axios from "axios"
import { AuthContext } from "../../../context/AuthContext"
import { useEffect, useState, useContext } from "react"

const Citas = () => {

  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState({})
  const [citas, setCitas] = useState([])
  const [cita, setCita] = useState([])
  const [terapeuta, setTerapeuta] = useState([])
  const [dni, setDni] = useState("")

  console.log(cita)

  const handleCobrarTerapia = async (id) => {
  
    await axios.put(`https://back-fisioterapia.onrender.com/api/cita/update/${id}`, {
      estado: "confirmada"
    })

    Swal.fire({
      title: "Pago exitoso",
      text: "Realizado con exito",
      icon: "success"
    });
  }

  const handleTerapiaCompletada = async (id) => {

  
    await axios.put(`https://back-fisioterapia.onrender.com/api/cita/update/${id}`, {
      estado: "completada"
    })

    Swal.fire({
      title: "Cita completada",
      text: "lavada de manos Xd",
      icon: "success"
    });
  }

  useEffect(() => {

    axios.get(`https://back-fisioterapia.onrender.com/api/cita`)
      .then(response => setCitas(response.data))
  }, [])

  useEffect(() => {

    axios.get(`https://back-fisioterapia.onrender.com/api/cita/${user.id}`)
      .then(response => setCita(response.data))
  }, [])

  useEffect(() => {

    if (dni.length === 8) {

      axios
        .get(`https://back-fisioterapia.onrender.com/api/user/getdni/${dni}`)
        .then(response => setUsers(response.data))
        .catch(() => setUsers(null));
    } else {

      setUsers(null);
    }
  }, [dni]);

  useEffect(() => {

      axios
        .get("https://back-fisioterapia.onrender.com/api/fisioterapeuta")
          .then(response => setTerapeuta(response.data))
  }, []);

  return (
    <main>
      <h3 className="bg-dark text-white text-center">Todas las citas</h3>
      {
        user.rol === "admin"?
        (
          <div className="container py-4">
          <div className="row g-4">
            {citas.map((c) => (
              <div key={c._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h4 className="card-title mb-2">
                      Fecha {new Date(c.fecha).toLocaleDateString()}
                    </h4>

                    <h5 className="card-subtitle mb-2 text-muted">
                      HORA {c.hora}
                    </h5>

                    <p className="card-text mb-1">
                      <strong>Terapeuta:</strong> {c.terapeuta?.nombre} {c.terapeuta?.apellidoPaterno}
                    </p>

                    <p className="card-text mb-1">
                      <strong>Paciente:</strong> {c.paciente?.nombre} {c.paciente?.apePaterno}
                    </p>

                    <p className="card-text mb-1">
                      <strong>Motivo:</strong> {c.motivo}
                    </p>

                    <p className="card-text mb-1">
                      <strong>Precio:</strong> {c.precio}
                    </p>

                    <p className="card-text mt-auto">
                      <strong>Estado:</strong>{" "}
                      <span
                        className={`badge ${
                          c.estado === "pendiente"
                            ? "bg-warning text-dark"
                            : c.estado === "confirmada"
                            ? "bg-success"
                            : c.estado === "cancelada"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {c.estado}
                      </span>
                    </p>
                  </div>
                  {
                    c.estado === "confirmada" || c.estado === "completada" ? 
                    <button
                    type="button"
                    disabled
                    className="btn btn-success w-100"
                    data-bs-toggle="modal"
                    data-bs-target={`#cobrarModal-${c._id}`}
                  >
                    Cobrar
                  </button>
                  :
                  <button
                    type="button"
                    className="btn btn-success w-100"
                    data-bs-toggle="modal"
                    data-bs-target={`#cobrarModal-${c._id}`}
                  >
                    Cobrar
                  </button>
                  }
                  {/*<button
                    type="button"
                    className="btn btn-success w-100"
                    data-bs-toggle="modal"
                    data-bs-target={`#cobrarModal-${c._id}`}
                  >
                    Cobrar
                  </button>*/}
                </div>



                {/*************************************** MODAL PAGAR ***************************************/}

                <div
                  className="modal fade"
                  id={`cobrarModal-${c._id}`}
                  tabIndex="-1"
                  aria-labelledby={`cobrarModalLabel-${c._id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`cobrarModalLabel-${c._id}`}>
                          Cobrar Cita
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>

                      <div className="modal-body">
                        <p><strong>Paciente:</strong> {c.paciente?.nombre} {c.paciente?.apePaterno}</p>
                        <p><strong>Terapeuta:</strong> {c.terapeuta?.nombre} {c.terapeuta?.apellidoPaterno}</p>
                        <p><strong>Fecha:</strong> {new Date(c.fecha).toLocaleDateString("es-PE", {timeZone: "UTC"})}</p>
                        <p><strong>Hora:</strong> {c.hora}</p>
                        <p><strong>Precio:</strong> {c.precio}</p>

                        {/* Aquí podrías poner un input si quieres registrar pago o método */}
                        <div className="mb-3">
                          <label htmlFor={`montoPago-${c._id}`} className="form-label">Monto a cobrar</label>
                          <input
                            type="number"
                            className="form-control"
                            id={`montoPago-${c._id}`}
                            defaultValue={c.precio}
                          />
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleCobrarTerapia(c._id)}
                          data-bs-dismiss="modal"
                        >
                          Cobrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        ): user.rol === "fisioterapeuta" ?
        (
          <div>
            <div className="container mt-4">
              <div className="row">
                {
                  cita.map((c) => (
                  <div key={c._id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title">
                          📅 {new Date(c.fecha).toLocaleString()}
                        </h5>

                        <h6 className="card-subtitle mb-2 text-muted">
                          ⏰ {c.hora}
                        </h6>

                        <p className="card-text mb-1">
                          <strong>Paciente:</strong>{" "}
                          {c.paciente?.nombre} {c.paciente?.apellidoPaterno}
                        </p>

                        <p className="card-text mb-1">
                          <strong>Motivo:</strong> {c.motivo}
                        </p>

                        <p className="card-text">
                          <strong>Estado:</strong>{" "}
                          <span
                            className={`badge ${
                              c.estado === "pendiente"
                                ? "bg-warning text-dark"
                                : c.estado === "confirmada"
                                ? "bg-success"
                                : c.estado === "cancelada"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                          >
                            {c.estado}
                          </span>
                        </p>
                        <button type="button"
                          className="btn btn-success"
                          onClick={() => handleTerapiaCompletada(c._id)}>
                          Completado...?
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          <div>
            <button type="button" className="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Registrar cita</button>
          </div>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Registrar cita</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form action={"https://back-fisioterapia.onrender.com/api/cita"} method="POST">
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Buscar:</label>
                    <input type="number" value={dni} onChange={e => setDni(e.target.value)} class="form-control" id="recipient-name" />
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Paciente:</label>
                    <input type="text"
                            readOnly
                            name="paciente"
                            disabled
                            value={`${users?.nombre ?? ""} ${users?.apellidoPaterno ?? ""} ${users?.apellidoMaterno ?? ""}`} class="form-control" id="recipient-name" />
                    <input
                      type="hidden"
                      name="paciente"
                      value={users?._id ?? ""}
                    />        
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Motivo:</label>
                    <input type="text" class="form-control" id="recipient-name" name="motivo" />
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label">Fecha:</label>
                    <input type="date" class="form-control" id="message-text" name="fecha"></input>
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label">Hora:</label>
                    <input type="time" class="form-control" id="message-text" name="hora"></input>
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label">Precio:</label>
                    <input type="number" class="form-control" name="precio"></input>
                  </div>
                  <div class="mb-3">
                    <select class="form-control" name="terapeuta">
                      <option value="">-- Elige uno --</option>

                      {
                        terapeuta.map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.nombre} {t.apePaterno}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <div>
                    <input type="submit" value="Generar" className="btn btn-success" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
          </div>
        ) : null
      }      
    </main>
  )
}

export default Citas