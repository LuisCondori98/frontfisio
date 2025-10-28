import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios"

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [citas, setCitas] = useState()
  const navigate = useNavigate()

  useEffect(() => {

    axios.get("https://back-fisioterapia.onrender.com/api/cita")
      .then(response => setCitas(response.data))
  }, [])

  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/")

    window.location.reload()
  }



  const statsData = {
    admin: {
      totalUsuarios: 156,
      citasHoy: 23,
      ingresosMes: 12500,
      pacientesActivos: 89
    },
    fisioterapeuta: {
      citasHoy: 8,
      pacientesActivos: 15,
      proximaCita: "10:00 AM",
      citasSemana: 32
    },
    recepcionista: {
      citasPendientes: 12,
      nuevosPacientes: 5,
            citasHoy: 18
    },
    gerente: {
      ingresosMes: 12500,
      crecimiento: 15,
      pacientesNuevos: 28,
      eficiencia: 92
    }
  }

  console.log(citas)

  return (
    <main className="min-vh-100 bg-light">
      {
      user.rol === "paciente" ? (

        <div className="container-fluid p-0">

          <div className="bg-primary text-white shadow">
            <div className="container py-3">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h1 className="h3 mb-1">Mi Fisioterapia</h1>
                  <p className="mb-0 opacity-75">Bienvenido, {user.nombre} {user.apellidoPaterno}</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <div className="d-flex align-items-center justify-content-md-end gap-3">
                    <span className="badge bg-success fs-6">Paciente Activo</span>
                    <div className="dropdown">
                      <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i className="bi bi-person-circle me-2"></i>Mi Cuenta
                      </button>
                      <ul className="dropdown-menu">
                        <li><button className="dropdown-item">Perfil</button></li>
                        <li><button className="dropdown-item">Configuración</button></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <button onClick={handleLogout} className="dropdown-item text-danger">
                            Cerrar Sesión
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="container py-4">
            {/* Próxima Cita */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="card border-success shadow-lg">
                  <div className="card-header bg-success text-white py-3">
                    <h5 className="card-title mb-0">
                      <i className="bi bi-calendar-check me-2"></i>Próxima Cita
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h4 className="text-success mb-3">Terapia de Rehabilitación</h4>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="mb-2"><strong>Fecha:</strong> 25 de Octubre, 2024</p>
                            <p className="mb-2"><strong>Hora:</strong> 10:00 AM</p>
                          </div>
                          <div className="col-sm-6">
                            <p className="mb-2"><strong>Fisioterapeuta:</strong> Dra. Ana García</p>
                            <p className="mb-0"><strong>Ubicación:</strong> Consultorio 304</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center text-md-end">
                        <div className="d-grid gap-2 d-md-block">
                          <button className="btn btn-outline-primary btn-lg me-md-2 mb-2">
                            <i className="bi bi-pencil me-2"></i>Reprogramar
                          </button>
                          <button className="btn btn-danger btn-lg">
                            <i className="bi bi-x-circle me-2"></i>Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards de Acciones Rápidas */}
            <div className="row mb-5">
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow border-primary">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="bi bi-plus-circle display-4 text-primary"></i>
                    </div>
                    <h5 className="card-title text-primary">Generar Nueva Cita</h5>
                    <p className="card-text text-muted">Solicita una nueva cita con tu fisioterapeuta</p>
                      <Link to={"/generar-cita"} className="btn btn-primary">Agendar Cita</Link>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow border-info">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="bi bi-clock-history display-4 text-info"></i>
                    </div>
                    <h5 className="card-title text-info">Mis Citas</h5>
                    <p className="card-text text-muted">Revisa tu historial de citas anteriores</p>
                    <button className="btn btn-info btn-lg w-100 text-white">
                      <i className="bi bi-list-ul me-2"></i>Ver Historial
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow border-warning">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="bi bi-file-medical display-4 text-warning"></i>
                    </div>
                    <h5 className="card-title text-warning">Mi Tratamiento</h5>
                    <p className="card-text text-muted">Consulta tu plan de tratamiento y ejercicios</p>
                    <button className="btn btn-warning btn-lg w-100">
                      <i className="bi bi-clipboard-check me-2"></i>Ver Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-header bg-dark text-white py-3">
                    <h5 className="card-title mb-0">
                      <i className="bi bi-history me-2"></i>Historial de Citas Recientes
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Terapeuta</th>
                            <th>Tipo de Sesión</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>18/10/2024</td>
                            <td>11:30 AM</td>
                            <td>Dr. Carlos López</td>
                            <td>Evaluación Inicial</td>
                            <td><span className="badge bg-success">Completada</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="bi bi-eye"></i> Ver
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>11/10/2024</td>
                            <td>09:00 AM</td>
                            <td>Dra. Ana García</td>
                            <td>Seguimiento</td>
                            <td><span className="badge bg-success">Completada</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="bi bi-eye"></i> Ver
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>04/10/2024</td>
                            <td>03:00 PM</td>
                            <td>Dr. Carlos López</td>
                            <td>Terapia Manual</td>
                            <td><span className="badge bg-success">Completada</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="bi bi-eye"></i> Ver
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : user.rol === "admin" ? (

        <div className="container-fluid p-0">
          <div className="bg-dark text-white shadow">
            <div className="container py-3">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h1 className="h3 mb-1">Panel de Administración</h1>
                  <p className="mb-0 opacity-75">Bienvenido, {user.nombre} {user.apellidoPaterno}</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <div className="d-flex align-items-center justify-content-md-end gap-3">
                    <span className="badge bg-warning fs-6">Administrador</span>
                    <button onClick={handleLogout} className="btn btn-outline-light">
                      <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-4">

            <div className="row mb-4">
              <div className="col-md-3 mb-3">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="mb-0">{statsData.admin.totalUsuarios}</h4>
                        <p className="mb-0">Total Usuarios</p>
                      </div>
                      <i className="bi bi-people display-6 opacity-50"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="mb-0">{statsData.admin.citasHoy}</h4>
                        <p className="mb-0">Citas Hoy</p>
                      </div>
                      <i className="bi bi-calendar-day display-6 opacity-50"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-info text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="mb-0">S/ {statsData.admin.ingresosMes}</h4>
                        <p className="mb-0">Ingresos Mes</p>
                      </div>
                      <i className="bi bi-currency-dollar display-6 opacity-50"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-warning text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="mb-0">{statsData.admin.pacientesActivos}</h4>
                        <p className="mb-0">Pacientes Activos</p>
                      </div>
                      <i className="bi bi-heart-pulse display-6 opacity-50"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow border-primary">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-people display-4 text-primary mb-3"></i>
                    <h5 className="card-title">Gestión de Usuarios</h5>
                    <p className="card-text">Administra todos los usuarios del sistema</p>
                    <Link to="/usuarios" className="btn btn-primary w-100">
                      <i className="bi bi-gear me-2"></i>Gestionar Usuarios
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow border-success">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-person-plus display-4 text-success mb-3"></i>
                    <h5 className="card-title">Crear Usuario</h5>
                    <p className="card-text">Registrar nuevo personal o pacientes</p>
                    <Link to="/register" className="btn btn-success w-100">
                      <i className="bi bi-plus-circle me-2"></i>Crear Usuario
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow border-info">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-graph-up display-4 text-info mb-3"></i>
                    <h5 className="card-title">Reportes</h5>
                    <p className="card-text">Generar reportes y estadísticas</p>
                    <button className="btn btn-info w-100 text-white">
                      <i className="bi bi-file-bar-graph me-2"></i>Ver Reportes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-header bg-dark text-white py-3">
                    <h5 className="card-title mb-0">
                      <i className="bi bi-clock-history me-2"></i>Citas Recientes
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Fisioterapeuta</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Juan Pérez</td>
                            <td>25/10/2024</td>
                            <td>10:00 AM</td>
                            <td>Dra. Ana García</td>
                            <td><span className="badge bg-warning">Pendiente</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="bi bi-eye"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>María López</td>
                            <td>25/10/2024</td>
                            <td>11:30 AM</td>
                            <td>Dr. Carlos Ruiz</td>
                            <td><span className="badge bg-success">Confirmada</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="bi bi-eye"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : user.rol === "fisioterapeuta" ? (

        <div className="container-fluid p-0">
          <div className="bg-info text-white shadow">
            <div className="container py-3">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h1 className="h3 mb-1">Panel del Fisioterapeuta</h1>
                  <p className="mb-0 opacity-75">Bienvenido, {user.nombre} {user.apellidoPaterno}</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <div className="d-flex align-items-center justify-content-md-end gap-3">
                    <span className="badge bg-light text-dark fs-6">Fisioterapeuta</span>
                    <button onClick={handleLogout} className="btn btn-outline-light">
                      <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-4">

            <div className="row mb-4">
              <div className="col-md-3 mb-3">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="mb-0">{statsData.fisioterapeuta.citasHoy}</h4>
                        <p className="mb-0">Citas Hoy</p>
                      </div>
                      <i className="bi bi-calendar-day display-6 opacity-50"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="mb-0">{statsData.fisioterapeuta.pacientesActivos}</h4>
                        <p className="mb-0">Pacientes Activos</p>
                      </div>
                      <i className="bi bi-people display-6 opacity-50"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-warning text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="mb-0">{statsData.fisioterapeuta.citasSemana}</h4>
                        <p className="mb-0">Citas Esta Semana</p>
                      </div>
                      <i className="bi bi-calendar-week display-6 opacity-50"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-info text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="mb-0">{statsData.fisioterapeuta.proximaCita}</h4>
                        <p className="mb-0">Próxima Cita</p>
                      </div>
                      <i className="bi bi-clock display-6 opacity-50"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones del Fisioterapeuta */}
            <div className="row mb-5">
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow border-primary">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-calendar-check display-4 text-primary mb-3"></i>
                    <h5 className="card-title">Mis Citas</h5>
                    <p className="card-text">Gestionar mis citas programadas</p>
                    <Link to="/citas" className="btn btn-primary w-100">
                      <i className="bi bi-list-ul me-2"></i>Ver Mis Citas
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow border-success">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-file-medical display-4 text-success mb-3"></i>
                    <h5 className="card-title">Historiales Médicos</h5>
                    <p className="card-text">Revisar historiales de pacientes</p>
                    <button className="btn btn-success w-100">
                      <i className="bi bi-folder me-2"></i>Ver Historiales
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow border-warning">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-clipboard-plus display-4 text-warning mb-3"></i>
                    <h5 className="card-title">Nuevo Reporte</h5>
                    <p className="card-text">Crear reporte de sesión</p>
                    <button className="btn btn-warning w-100">
                      <i className="bi bi-plus-circle me-2"></i>Crear Reporte
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-header bg-info text-white py-3">
                    <h5 className="card-title mb-0">
                      <i className="bi bi-calendar-day me-2"></i>Mis Citas de Hoy
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Hora</th>
                            <th>Paciente</th>
                            <th>Tipo de Sesión</th>
                            <th>Duración</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>09:00 AM</td>
                            <td>Carlos Rodríguez</td>
                            <td>Rehabilitación</td>
                            <td>45 min</td>
                            <td><span className="badge bg-success">En Progreso</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="bi bi-play-circle"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>10:30 AM</td>
                            <td>Ana Martínez</td>
                            <td>Terapia Manual</td>
                            <td>60 min</td>
                            <td><span className="badge bg-warning">Pendiente</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="bi bi-eye"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>02:00 PM</td>
                            <td>Luis García</td>
                            <td>Evaluación</td>
                            <td>30 min</td>
                            <td><span className="badge bg-secondary">Programada</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="bi bi-eye"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : (

        <div className="container py-5">
          <div className="card shadow mx-auto p-4" style={{ maxWidth: "500px", textAlign: "center" }}>
            <img
              src="http://localhost:8080/img/profile.png"
              alt="profile"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover", margin: "auto" }}
            />
            <h2 className="mb-2">{user.nombre} {user.apellidoPaterno}</h2>
            <p className="text-muted">{user.rol}</p>

            <div className="mb-3 text-start">
              <p><strong>DNI:</strong> {user.dni}</p>
              <p><strong>Correo:</strong> {user.correo}</p>
              {user.celular && <p><strong>Celular:</strong> {user.celular}</p>}
            </div>

            <div className="d-flex flex-column gap-2">
              {user.rol === "admin" && (
                <>
                  <Link to="/usuarios" className="btn btn-success">Usuarios</Link>
                  <Link to="/register" className="btn btn-primary">Crear Usuario</Link>
                </>
              )}

              {user.cargo === "gerente" && (
                <Link to="/vista-contacto" className="btn btn-warning">Contacto</Link>
              )}

              {user.cargo === "recepcionista" && (
                <>
                  <Link to="/generar-cita" className="btn btn-warning">Generar Cita</Link>
                  <Link to="/vista-contacto" className="btn btn-warning">Contacto</Link>
                </>
              )}

              {user.rol === "fisioterapeuta" && (
                <Link to="/citas" className="btn btn-success">Ver Citas</Link>
              )}

              <button onClick={handleLogout} className="btn btn-danger mt-3">Cerrar Sesión</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Profile