import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Usuarios from './components/Usuarios/Usuarios'
import Index from './components/pages/Index/Index'
import NavBar from './components/NavBar/NavBar'
import Login from './components/pages/Login/Login'
import Register from './components/pages/Register/Register'
import Profile from './components/pages/Profile/Profile'
import { AuthProvider } from './context/AuthContext'
import Citas from './components/pages/Citas/Citas'
import Contacto from './components/pages/Contacto/Contacto'
import Servicios from './components/pages/Servicios/Servicios'
import ViewContacto from './components/pages/ViewContacto/ViewContacto'
import GenerarCita from './components/pages/GenerarCita/GenerarCita'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Index />} />
        <Route path={"/perfil"} element={<Profile />} />
        <Route path={"/usuarios"} element={<Usuarios />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/cita"} element={<Citas />} />
        <Route path={"/servicios"} element={<Servicios />} />
        <Route path={"/contacto"} element={<Contacto />} />
        <Route path={"/vista-contacto"} element={<ViewContacto />} />
        <Route path={"/generar-cita"} element={<GenerarCita />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
