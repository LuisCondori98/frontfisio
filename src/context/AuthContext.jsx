import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  const login = async (email, password) => {

    try {

      const response = await axios.post("https://back-fisioterapia.onrender.com/auth/login", {
        correo: email,
        password,
      });

      localStorage.setItem("token", response.data)

      const decoded = jwtDecode(response.data)

      setUser(decoded)

      setIsAuthenticated(true)

      await Swal.fire({
        icon: "success",
        title: "¡Sesión iniciada!",
        text: "Bienvenido al sistema",
        showConfirmButton: false,
        timer: 3000
      });

      setTimeout(() => {

        navigate("/")
      }, 3000)

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "Credenciales incorrectas",
        confirmButtonColor: "#d33",
      });

      navigate("/login")
    }
  }

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (token) {

      try {

        const decoded = jwtDecode(token);

        setUser(decoded)

        setIsAuthenticated(true)
      } catch (error) {

        console.error("Token inválido o expirado:", error.message)

        localStorage.removeItem("token")

        setIsAuthenticated(false)
      }
    } else {

      setIsAuthenticated(false)
    }
  }, [])

  const logout = () => {

    localStorage.removeItem("token");

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}