import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const Register = () => {

  const {user, isAuthenticated} = useContext(AuthContext)
  const navigate = useNavigate()
  const [typeUsuatio, setTypeUsuario] = useState("")

  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dni: "",
    genero: "",
    cumpleanios: "",
    celular: "",
    direccion: "",
    correo: "",
    password: "",
    cargo: "",
    alergias: "",
    historialMedico: "",
    especialidad: "",
    colegiatura: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await axios.post(
      `https://back-fisioterapia.onrender.com/api/${typeUsuatio ? typeUsuatio: "paciente"}`,
      formData
    );

    navigate("/login")
  }

  const handleUsuarioRol = (e) => {

    setTypeUsuario(e.target.value)
  }

  return (
    <main>
      {
        isAuthenticated && user.rol !== "admin" ?(
        <Navigate to={"/"}/>)
        :(
        <div className="container mt-5 p-4 rounded shadow" style={{ backgroundColor: "#f7fdf9" }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: "#009688" }}>
              Registro de Usuario – Centro de Fisioterapia
            </h2>
            <p className="text-secondary">Completa tus datos para registrarte en nuestro sistema</p>
          </div>
          <form onSubmit={handleSubmit} className="row g-3">
            {/* Nombres */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: Luis"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Apellido Paterno</label>
              <input
                type="text"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: Pérez"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Apellido Materno</label>
              <input
                type="text"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: Gutiérrez"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Genero</label>
              <select
                      className="form-select"
                      name="genero"
                      value={formData.genero}
                      onChange={handleChange}>
                <option value="-1">Seleccione</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>

            {/* Datos personales */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">DNI</label>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className="form-control"
                maxLength="8"
                placeholder="Ej: 12345678"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Cumpleaños</label>
              <input
                type="date"
                name="cumpleanios"
                value={formData.cumpleanios}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Celular</label>
              <input
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                className="form-control"
                maxLength="9"
                placeholder="Ej: 987654321"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: Av. Los Olivos 123"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: nombre@correo.com"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="********"
                required
              />
            </div>
            {
              user.rol == "admin"?
              <div className="col-md-6">
              <label className="form-label fw-semibold">Tipo de usuario</label>
              <select
                className="form-select"
                onChange={handleUsuarioRol}
                style={{ cursor: "pointer" }}
              >
                <option value="-1">-- Seleccione usuario --</option>
                <option value="admin">Administrador</option>
                <option value="paciente">Paciente</option>
                <option value="fisioterapeuta">Fisioterapeuta</option>
              </select>
            </div>
              :
              <></>
            }

            {/* Paciente */}
            {typeUsuatio === "paciente" && (
              <div className="col-md-6">
                <label className="form-label fw-semibold">Alergias</label>
                <input
                      type="text"
                      name="alergias"
                      value={formData.alergias}
                      onChange={handleChange}
                      className="form-control mb-2"
                      placeholder="Ej: Polvo, medicamentos..." />
                <label className="form-label fw-semibold">Historial médico</label>
                <input type="text" name="historialMedico"
                      value={formData.historialMedico}
                      onChange={handleChange} className="form-control" placeholder="Ej: Asma, operaciones, etc." />
              </div>
            )}

            {/* Fisioterapeuta */}
            {typeUsuatio === "fisioterapeuta" && (
              <div className="col-md-6">
                <label className="form-label fw-semibold">Especialidad</label>
                <input type="text"
                      name="especialidad"
                      value={formData.especialidad}
                      onChange={handleChange}
                      className="form-control mb-2" placeholder="Ej: Fisioterapia pediátrica" />
                <label className="form-label fw-semibold">Colegiatura</label>
                <input type="text"
                      name="colegiatura"
                      value={formData.colegiatura}
                      onChange={handleChange}
                      className="form-control" placeholder="Ej: 12345-CMP" />
              </div>
            )}

            {/* Admin */}
            {typeUsuatio === "admin" && (
              <div className="col-md-6">
                <label className="form-label fw-semibold">Cargo</label>
                <select
                  className="form-select"
                  onChange={handleChange}
                  name="cargo"
                  value={formData.cargo}
                >
                  <option value="-1">Seleccione</option>
                  <option value="gerente">Gerente</option>
                  <option value="cajero">Cajero</option>
                  <option value="recepcionista">Recepcionista</option>
                </select>
              </div>
            )}

            <div className="col-12 text-center mt-4">
              <button type="submit" className="btn btn-success px-5 py-2 fw-semibold">
                Registrar Usuario
              </button>
            </div>
          </form>
        </div>)
      }
  </main>
  )
}

export default Register