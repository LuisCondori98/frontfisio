import axios from "axios";
import { useState } from "react"
import { useParams } from "react-router-dom"

const EditProfile = () => {

    const [user, setUser] = useState({})

    const {dni} = useParams()
    console.log(dni)
    axios.get(`https://back-fisioterapia.onrender.com/api/user/getdni/${dni}`)
        .then(response => setUser(response.data))

    return (
        <>
        <div>
            <input type="text" placeholder={`${user.nombre}`} />
        </div>
        </>
    )
}

export default EditProfile