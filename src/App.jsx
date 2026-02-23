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
import EditProfile from './components/pages/EditProfile/EditProfile'
import { CartProvider } from './context/CartContext'
import CheckOut from './components/CheckOut/CheckOut'
import TipoTerapia from './components/pages/TipoTerapia/TipoTerapia'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <AuthProvider>
    <CartProvider>
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Index />} />
        <Route path={"/tratamiento/:terapia"} element={<TipoTerapia />} />
        <Route path={"/perfil"} element={<Profile />} />
        <Route path={"/edit-perfil/:dni"} element={<EditProfile />} />
        <Route path={"/usuarios"} element={<Usuarios />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/cita"} element={<Citas />} />
        <Route path={"/servicios"} element={<Servicios />} />
        <Route path={"/contacto"} element={<Contacto />} />
        <Route path={"/vista-contacto"} element={<ViewContacto />} />
        <Route path={"/generar-cita"} element={<GenerarCita />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/checkout"} element={<CheckOut />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  )
}

export default App
