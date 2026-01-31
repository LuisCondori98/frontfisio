import axios from "axios"
import { useEffect, useState } from "react"

const Citas = () => {

  const [user, setUser] = useState({})
  const [terapeuta, setTerapeuta] = useState([])
  const [dni, setDni] = useState("")

  useEffect(() => {

    if (dni.length === 8) {

      axios
        .get(`https://back-fisioterapia.onrender.com/api/user/getdni/${dni}`)
        .then(response => setUser(response.data))
        .catch(() => setUser(null));
    } else {

      setUser(null);
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
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Buscar:</label>
                <input type="number" value={dni} onChange={e => setDni(e.target.value)} class="form-control" id="recipient-name" />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Paciente:</label>
                <input type="text"
                        readOnly="true"
                        name="paciente"
                        disabled
                        value={`${user?.nombre ?? ""} ${user?.apellidoPaterno ?? ""} ${user?.apellidoMaterno ?? ""}`} class="form-control" id="recipient-name" />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Motivo:</label>
                <input type="text" class="form-control" id="recipient-name" name="motivo" />
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Fecha:</label>
                <input type="text" class="form-control" id="message-text" name="fecha"></input>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Hora:</label>
                <input type="time" class="form-control" id="message-text" name="hora"></input>
              </div>
              <div>
                <select
                >
                  <option value="">-- Elige uno --</option>

                  {
                    terapeuta.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nombre} {t.apePaterno}
                      </option>
                    ))
                  }
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Send message</button>
          </div>
        </div>
      </div>
    </div>
    </main>
  )
}

export default Citas