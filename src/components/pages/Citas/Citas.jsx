import axios from "axios"
import { useEffect, useState } from "react"

const Citas = () => {

  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState({})
  const [cita, setcita] = useState([])
  const [terapeuta, setTerapeuta] = useState([])
  const [dni, setDni] = useState("")

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

      <div>
      {
        cita.map((c) => {

          <div>
            {c.paciente}
          </div>
        })
      }
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
    </main>
  )
}

export default Citas