import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import axios from "axios"

export const CartContext = createContext()

export const CartProvider = ({children}) => {

    const { user } = useContext(AuthContext)
    const [cita, setCita] = useState([])

    useEffect(() => {

        if(!user?.id) return; 

        axios.get(`https://back-fisioterapia.onrender.com/api/cita/paciente/${user.id}`)
            .then(response => setCita(response.data))
            
    }, [user?.id])

    let total

    cita.map(c => total += c.precio)

    return (
        <CartContext.Provider value={{total, cita}}>
            {children}
        </CartContext.Provider>
    )
}