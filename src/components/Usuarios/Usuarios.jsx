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
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-center">
      {/* Imagen decorativa */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
        alt="Acceso denegado"
        className="mb-6 animate-bounce drop-shadow-lg p-5"
        style={{height: "400px"}}
      />

      <h1 className="text-7xl font-extrabold text-red-500 drop-shadow-md mb-2">
        403
      </h1>

      <h2 className="text-3xl font-semibold mb-4">Acceso denegado</h2>

      <p className="text-gray-300 max-w-md mb-8">
        🚫 No tienes los permisos necesarios para ver esta sección.
        <br />
        Si crees que es un error, contacta al administrador del sistema.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
      >
        ⬅ Volver al inicio
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
    <main className="usuarios-layout" style={{ display: "flex", gap: "2rem", padding: "20px" }}>
  {/* 🔹 Columna izquierda (filtros) */}
  <section style={{ flex: "1", maxWidth: "250px" }}>
    <h3>Filtros</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <select onChange={handleRol} className="form-select">
        <option value="">Todos</option>
        <option value="admin">Admin</option>
        <option value="paciente">Paciente</option>
        <option value="fisioterapeuta">Fisioterapeuta</option>
      </select>

      <input
        type="text"
        onChange={(e) => setNombre(e.target.value)}
        className="form-control"
        placeholder="Buscar por nombre"
      />
    </div>
  </section>

  {/* 🔹 Columna derecha (usuarios) */}
  <section
    style={{
      flex: "3",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "1.5rem",
    }}
  >
    {users.map((u) => (
      <div
        key={u._id}
        className="card border-0 shadow-sm h-100"
        style={{
          borderRadius: "18px",
          transition: "all 0.3s ease",
        }}
        data-aos="fade-up"
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-5px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        {/* Header avatar */}
        <div
          style={{
            background: "linear-gradient(135deg, #444444, #b3b3b3)",
            borderTopLeftRadius: "18px",
            borderTopRightRadius: "18px",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <img
            src={
              u.img ? `/img/${u.img}`:
              u.genero === "masculino"
                ? "/img/profileman.png"
                : "/img/profilewoman.png"
            }
            alt="profile"
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid white",
              background: "white",
            }}
          />
        </div>

        <div className="card-body d-flex flex-column">

          {/* Nombre principal */}
          <h5 className="fw-bold text-center mb-3">
            {u.nombre} {u.apellidoPaterno}
          </h5>

          <div className="small text-muted mb-3 text-center">
            DNI: {u.dni} • Edad: {calcularEdad(u.cumpleanios)}
          </div>

          <hr />

          {/* Información */}
          <div className="small">
            <p className="mb-1"><strong>Correo:</strong> {u.correo}</p>
            <p className="mb-1"><strong>Teléfono:</strong> {u.celular}</p>
            <p className="mb-1"><strong>Dirección:</strong> {u.direccion}</p>

            {u.rol === "admin" && (
              <p className="mb-1"><strong>Cargo:</strong> {u.cargo}</p>
            )}

            {u.rol === "paciente" && (
              <>
                <p className="mb-1"><strong>Alergias:</strong> {u.alergias}</p>
                <p className="mb-1"><strong>Historial:</strong> {u.historialmedico}</p>
              </>
            )}

            {u.rol === "fisioterapeuta" && (
              <>
                <p className="mb-1"><strong>Especialidad:</strong> {u.especialidad}</p>
                <p className="mb-1"><strong>Colegiatura:</strong> {u.colegiatura}</p>
              </>
            )}
          </div>

          {/* Botones */}
          <div className="mt-auto pt-3 d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary flex-fill rounded-pill"
              onClick={() => handleEditar(u.dni)}
            >
              Editar
            </button>

            <button
              type="button"
              className={`btn ${u.estado === "activo" ? "btn-danger" : "btn-success"}`}
              onClick={() => handleEstado(u._id, u.estado)}
            >
              {u.estado === "activo" ? "Desactivar" : "Reactivar"}
            </button>
          </div>

        </div>
      </div>
    ))}
  </section>
</main>
  )
}

export default Usuarios