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
        <form action="https://back-fisioterapia.onrender.com/api/user/user-update" className="container mt-4" style={{ maxWidth: "600px" }}>
            <div>
                <input type="text" name={`${user.id}`} />
            </div>
             <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre completo</label>
                <input
                type="text"
                className="form-control"
                id="nombre"
                name={`${user.nombre}`}
                placeholder={`${user.nombre}`}
                />
            </div>
            <div className="mb-3">
                <input type="submit" value="Actualizar" className="btn btn-success" />
            </div>
        </form>
    )
}

export default EditProfile