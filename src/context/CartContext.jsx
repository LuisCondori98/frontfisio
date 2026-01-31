import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import axios from "axios"

export const CartContext = createContext()

export const CartProvider = ({children}) => {

    const { user } = useContext(AuthContext)
    const [paciente, setPaciente] = useState([])
    

    useEffect(() => {
        if(!user?.id) return; 
        axios.get(`https://back-fisioterapia.onrender.com/api/cita/paciente/${user.id}`)
            .then(response => setPaciente(response.data))
    }, [user?.id])

    let total

    paciente.map(p => total = p.precio)

    console.log(total)

    return (
        <CartContext.Provider value={{total}}>
            {children}
        </CartContext.Provider>
    )
}