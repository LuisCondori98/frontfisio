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

  console.log(user)

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

    const fetchCita = async () => {

      if (!user?.id) return;

      try {
        const response = await axios.get(
          `https://back-fisioterapia.onrender.com/api/cita/${user.id}`
        );

        setCita(response.data);

      } catch (error) {

        console.log("Error" + error.message);
      }
    };

    fetchCita();

  }, [user]);

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
                      Fecha {new Date(c.fecha).toLocaleDateString("es-PE", {timeZone: "UTC"})}
                    </h4>

                    <h5 className="card-subtitle mb-2 text-muted">
                      HORA {c.hora}
                    </h5>

                    <p className="card-text mb-1">
                      <strong>Terapeuta:</strong> {c.terapeuta?.nombre} {c.terapeuta?.apellidoPaterno}
                    </p>

                    <p className="card-text mb-1">
                      <strong>Paciente:</strong> {c.paciente?.nombre} {c.paciente.apellidoPaterno}
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
          <div className="bg-light min-vh-100 py-4">

            <div className="container">

              {/* Header */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                <h3 className="fw-bold text-primary mb-3 mb-md-0">
                  Gestión de Citas
                </h3>

                <button
                  type="button"
                  className="btn btn-primary px-4 shadow-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  + Registrar cita
                </button>
              </div>

              {/* Cards */}
              <div className="row g-4">
                {cita.map((c) => (
                  <div key={c._id} className="col-12 col-sm-6 col-lg-4">

                    <div className="card border-0 shadow-lg h-100 rounded-4">
                      <div className="card-body d-flex flex-column">

                        <div className="mb-3">
                          <h5 className="fw-bold mb-1">
                            📅 {new Date(c.fecha).toLocaleDateString("es-PE", { timeZone: "UTC" })}
                          </h5>

                          <small className="text-muted">
                            ⏰ {c.hora}
                          </small>
                        </div>

                        <hr />

                        <p className="mb-2">
                          <strong>Paciente:</strong><br />
                          {c.paciente?.nombre} {c.paciente?.apellidoPaterno}
                        </p>

                        <p className="mb-2">
                          <strong>Motivo:</strong><br />
                          {c.motivo}
                        </p>

                        <div className="mt-auto">

                          <p className="mb-3">
                            <strong>Estado:</strong>{" "}
                            <span
                              className={`badge px-3 py-2 ${
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

                          {
                            c.estado !== "completada" && (
                              <button
                                type="button"
                                className="btn btn-success w-100 rounded-pill"
                                onClick={() => c.estado === "confirmada" && handleTerapiaCompletada(c._id)}
                                disabled={c.estado !== "confirmada"}
                              >
                                Marcar como completada
                              </button>
                            )
                          }
                        </div>

                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* MODAL */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content rounded-4 border-0 shadow-lg">

                  <div className="modal-header bg-primary text-white rounded-top-4">
                    <h5 className="modal-title">Registrar cita</h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>

                  <div className="modal-body p-4">

                    <form action={"https://back-fisioterapia.onrender.com/api/cita"} method="POST">

                      <div className="row g-3">

                        <div className="col-md-6">
                          <label className="form-label">Buscar DNI</label>
                          <input
                            type="number"
                            value={dni}
                            onChange={e => setDni(e.target.value)}
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Paciente</label>
                          <input
                            type="text"
                            readOnly
                            disabled
                            name="paciente"
                            className="form-control bg-light"
                            value={`${users?.nombre ?? ""} ${users?.apellidoPaterno ?? ""} ${users?.apellidoMaterno ?? ""}`}
                          />
                          <input
                            type="hidden"
                            name="paciente"
                            value={users?._id ?? ""}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Motivo</label>
                          <input type="text" className="form-control" name="motivo" />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label">Fecha</label>
                          <input type="date" className="form-control" name="fecha" />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label">Hora</label>
                          <input type="time" className="form-control" name="hora" />
                        </div>

                        <div className="col-md-8">
                          <label className="form-label">Terapeuta</label>
                          <select className="form-select" name="terapeuta">
                            <option value={user.id}>{user.nombre} {user.apePaterno}</option>
                          </select>
                        </div>

                      </div>

                      <div className="text-end mt-4">
                        <input
                          type="submit"
                          value="Generar cita"
                          className="btn btn-success px-4 rounded-pill"
                        />
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
