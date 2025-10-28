import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Usuarios = () => {

  const [users, setUsers] = useState([])
  const [rol, setRol] = useState("")
  const [nombre, setNombre] = useState("")
  const [error, setError] = useState(null);

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
    console.log(cumple)
    let edad = hoy.getFullYear() - cumple.getFullYear();
    const mes = hoy.getMonth() - cumple.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())) edad--;

    return edad;
  };

  return (
    <main style={{ display: "flex", gap: "2rem", padding: "20px" }}>
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
  <section style={{ flex: "3", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
    {users.map((u) => (
      <div
        key={u._id}
        className="card text-bg-light"
        style={{
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        }}
        data-aos="flip-right"
      >
        {
          u.genero == "masculino" ?
            <img src="/img/profileman.png" />
          :
            <img src="/img/profilewoman.png"/>
        }
        <div className="card-body">
          <label><strong>Nombres: </strong> {u.nombre}</label><br />
          <label><strong>Apellidos: </strong> {u.apellidoPaterno} {u.apellidoMaterno}</label><br />
          <label><strong>DNI: </strong> {u.dni}</label><br />
          <label><strong>Edad: </strong> {calcularEdad(u.cumpleanios)}</label><br />
          <label><strong>Correo: </strong> {u.correo}</label><br />
          <label><strong>Telefono: </strong> {u.celular}</label><br />
          <label><strong>Direccion: </strong> {u.direccion}</label><br />
          {u.rol === "admin" && (
            <label><strong>Cargo:</strong> {u.cargo}</label>
          )}

          {u.rol === "paciente" && (
            <>
              <label><strong>Alergias:</strong> {u.alergias}</label><br />
              <label><strong>Historial Medico: </strong> {u.historialmedico}</label>
            </>
          )}

          {u.rol === "fisioterapeuta" && (
            <>
              <label><strong>Especialidad:</strong> {u.especialidad}</label><br />
              <label><strong>Colegiatura:</strong> {u.colegiatura}</label>
            </>
          )}
        </div>
      </div>
    ))}
  </section>
</main>
  )
}

export default Usuarios