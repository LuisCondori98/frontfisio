import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const GenerarCita = () => {

  const [fisios, setFisios] = useState([])
  const {user} = useContext(AuthContext) 
  const [pacienteId, setPacienteId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [terapeuta, setTerapeuta] = useState("");
  const [motivo, setMotivo] = useState("");
  const [estado, setEstado] = useState("pendiente");

  useEffect(() => {
    if (user?.id) {
      setPacienteId(user.id);
    }
  }, [user]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaCita = {
      paciente: pacienteId,
      fecha,
      hora,
      terapeuta: terapeuta,
      motivo,
      estado,
    };

    axios.post("https://back-fisioterapia.onrender.com/api/cita", nuevaCita)
  }

  useEffect(() => {
    axios.get("https://back-fisioterapia.onrender.com/api/fisioterapeuta")
      .then((res) => setFisios(res.data))
      .catch((err) => console.error("Error cargando fisioterapeutas", err));
  }, []);

  console.log(user.id)

  return (
    <form className="card p-4" onSubmit={handleSubmit}>
      <h5 className="mb-3">Registrar Cita</h5>

      <div className="mb-3">
        <label className="form-label">Paciente (ID)</label>
        <input
          type="text"
          className="form-control"
          value={user.id}
          onChange={(e) => setPacienteId(e.target.value)}
          placeholder="ID del paciente"
          readOnly
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Hora</label>
        <input
          type="time"
          className="form-control"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fisioterapeuta</label>
        <select
          className="form-select"
          value={terapeuta}
          onChange={(e) => setTerapeuta(e.target.value)}
          required
        >
          <option value="">Seleccione terapeuta...</option>
          {fisios.map((f) => (
            <option key={f._id} value={f._id}>
              {f.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Motivo</label>
        <textarea
          className="form-control"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Motivo de la cita"
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select
          className="form-select"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Guardar Cita
      </button>
    </form>
  )
}

export default GenerarCita