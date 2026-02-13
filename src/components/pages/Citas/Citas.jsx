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
      <h2>Citas</h2>
      {
        user.rol === "admin"?
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {citas.map((c) => (
              <div key={c._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
                <div className="p-4 flex-1">
                  <h4 className="text-lg font-semibold mb-1">
                    Fecha {new Date(c.fecha).toLocaleDateString()}
                  </h4>

                  <h5 className="text-sm text-gray-500 mb-2">
                    HORA {c.hora}
                  </h5>

                  <p className="text-gray-700 mb-1">
                    <strong>Terapeuta:</strong> {c.terapeuta?.nombre} {c.terapeuta?.apellidoPaterno}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <strong>Paciente:</strong> {c.paciente?.nombre} {c.paciente?.apePaterno}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <strong>Motivo:</strong> {c.motivo}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <strong>Precio:</strong> {c.precio}
                  </p>

                  <p className="mt-2">
                    <strong>Estado:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-1 text-sm font-medium rounded ${
                        c.estado === "pendiente"
                          ? "bg-yellow-300 text-yellow-900"
                          : c.estado === "confirmada"
                          ? "bg-green-500 text-white"
                          : c.estado === "cancelada"
                          ? "bg-red-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {c.estado}
                    </span>
                  </p>
                </div>

                <button className="bg-green-500 text-white py-2 px-4 m-4 rounded-lg hover:bg-green-600 transition-colors">
                  Cobrar
                </button>
              </div>
            ))}
          </div>
        ): user.rol === "fisioterapeuta" ?
        (
          <div>
            <div className="container mt-4">
              <div className="row">
                {cita.map((c) => (
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Registrar cita</button>
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