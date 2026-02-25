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

    } catch (error) {

      navigate("/login")

      console.error(error);
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