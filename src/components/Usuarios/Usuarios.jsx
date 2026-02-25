import axios from "axios"
import "./Usuarios.css"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Usuarios = () => {

  const [users, setUsers] = useState([])
  const [rol, setRol] = useState("")
  const [nombre, setNombre] = useState("")
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const token = localStorage.getItem("token")

        const response = await axios.get(`https://back-fisioterapia.onrender.com/api/user/find/?rol=${rol}&name=${nombre}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = response.data
        const normalized = Array.isArray(data) ? data : (data ? [data] : [])
        setUsers(normalized)

      } catch(err) {

        setError("No eres admin")
      }
    }

    fetchUsers()
  }, [rol, nombre])

  if(error) {

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-center px-6">

        <div className="bg-white rounded-full shadow-xl p-8 mb-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
            alt="Acceso restringido"
            className="w-40 h-40 object-contain"
          />
        </div>

        <h1 className="text-6xl font-bold text-blue-700 mb-2">
          403
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Acceso Restringido
        </h2>

        <p className="text-gray-600 max-w-lg mb-8 leading-relaxed">
          No cuenta con permisos para acceder a esta sección del sistema.
          <br />
          Si necesita asistencia, comuníquese con el área administrativa de la clínica.
        </p>

        <Link
          to="/"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          Volver al inicio
        </Link>

      </div>
    )
  }

  const handleRol = (e) => {

    setRol(e.target.value)
  }

  const calcularEdad = (cumpleanios) => {

    const hoy = new Date();

    const cumple = new Date(cumpleanios);

    let edad = hoy.getFullYear() - cumple.getFullYear();

    const mes = hoy.getMonth() - cumple.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())) edad--;

    return edad;
  };

  const handleEstado = async (id, estadoActual) => {
    
    const nuevoEstado = estadoActual === "activo" ? "inactivo" : "activo";

    try {

      const response = await axios.post(`https://back-fisioterapia.onrender.com/api/user/update-status/${id}`, {
        estado: nuevoEstado
      })

      if(response.status === 200) {

        window.location.reload()
      }

    } catch(err) {

      console.error("Error", err)
    }
  }

  const handleEditar = (dni) => {

    navigate(`/edit-perfil/${dni}`)
    console.log(`Editado por id ${dni}`)
  }

  return (
    <main className="container-fluid py-4" style={{ background: "#f4f7fb", minHeight: "100vh" }}>
      <div className="row g-4">

        {/* 🔹 SIDEBAR FILTROS */}
        <aside className="col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-bold mb-3 text-primary">Filtros</h5>

            <div className="mb-3">
              <label className="form-label fw-semibold">Rol</label>
              <select onChange={handleRol} className="form-select rounded-pill">
                <option value="">Todos</option>
                <option value="admin">Administrador</option>
                <option value="paciente">Paciente</option>
                <option value="fisioterapeuta">Fisioterapeuta</option>
              </select>
            </div>

            <div>
              <label className="form-label fw-semibold">Buscar</label>
              <input
                type="text"
                onChange={(e) => setNombre(e.target.value)}
                className="form-control rounded-pill"
                placeholder="Nombre del usuario..."
              />
            </div>
          </div>
        </aside>

        {/* 🔹 GRID DE USUARIOS */}
        <section className="col-lg-9">
          <div className="row g-4">

            {users.map((u) => (
              <div key={u._id} className="col-md-6 col-xl-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 user-card">

                  {/* HEADER CON AVATAR */}
                  <div
                    className="text-center p-4"
                    style={{
                      background: "linear-gradient(135deg, #0d6efd, #6ea8fe)",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem"
                    }}
                  >
                    <img
                      src={
                        u.img
                          ? `/img/${u.img}`
                          : u.genero === "masculino"
                          ? "/img/profileman.png"
                          : "/img/profilewoman.png"
                      }
                      alt="profile"
                      className="shadow"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "4px solid white",
                        background: "white"
                      }}
                    />

                    <h5 className="fw-bold text-white mt-3 mb-0">
                      {u.nombre} {u.apellidoPaterno}
                    </h5>

                    <small className="text-light">
                      {u.rol.toUpperCase()}
                    </small>
                  </div>

                  <div className="card-body d-flex flex-column">

                    <div className="mb-3 text-muted small">
                      <div>DNI: {u.dni}</div>
                      <div>Edad: {calcularEdad(u.cumpleanios)}</div>
                    </div>

                    <hr />

                    <div className="small flex-grow-1">
                      <p><strong>Correo:</strong> {u.correo}</p>
                      <p><strong>Teléfono:</strong> {u.celular}</p>
                      <p><strong>Dirección:</strong> {u.direccion}</p>

                      {u.rol === "admin" && (
                        <span className="badge bg-dark rounded-pill">
                          Cargo: {u.cargo}
                        </span>
                      )}

                      {u.rol === "paciente" && (
                        <>
                          <p><strong>Alergias:</strong> {u.alergias}</p>
                          <p><strong>Historial:</strong> {u.historialmedico}</p>
                        </>
                      )}

                      {u.rol === "fisioterapeuta" && (
                        <>
                          <span className="badge bg-info text-dark rounded-pill">
                            {u.especialidad}
                          </span>
                          <p className="mt-2">
                            <strong>Colegiatura:</strong> {u.colegiatura}
                          </p>
                        </>
                      )}
                    </div>

                    {/* ESTADO */}
                    <div className="mb-3">
                      <span
                        className={`badge rounded-pill ${
                          u.estado === "activo"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {u.estado === "activo" ? "Activo" : "Inactivo"}
                      </span>
                    </div>

                    {/* BOTONES */}
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-primary flex-fill rounded-pill"
                        onClick={() => handleEditar(u.dni)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className={`btn ${
                          u.estado === "activo"
                            ? "btn-danger"
                            : "btn-success"
                        } rounded-pill`}
                        onClick={() => handleEstado(u._id, u.estado)}
                      >
                        {u.estado === "activo"
                          ? "Desactivar"
                          : "Reactivar"}
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </section>
      </div>
    </main>
  )
}

export default Usuarios