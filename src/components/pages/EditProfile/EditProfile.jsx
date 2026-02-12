import axios from "axios";
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const EditProfile = () => {

    const [user, setUser] = useState({})

    const {dni} = useParams()

    useEffect(() => {

        axios.get(`https://back-fisioterapia.onrender.com/api/user/getdni/${dni}`)
            .then(response => setUser(response.data))
    }, [])

    console.log(user)

    return (
        <form action="https://back-fisioterapia.onrender.com/api/user/user-update" method="POST" className="container mt-4" style={{ maxWidth: "600px" }}>
            <div>
                <input type="hidden" name="id" value={user._id} />
            </div>
             <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre completo</label>
                <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                placeholder={`${user.nombre}`}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellido Paterno</label>
                <input
                type="text"
                className="form-control"
                id="apePaterno"
                name="apePaterno"
                placeholder={`${user.apellidoPaterno}`}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellido Materno</label>
                <input
                type="text"
                className="form-control"
                id="apeMaterno"
                name="apeMaterno"
                placeholder={`${user.apellidoMaterno}`}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Celular</label>
                <input
                type="text"
                className="form-control"
                id="calular"
                name="celular"
                placeholder={`${user.celular}`}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Direccion</label>
                <input
                type="text"
                className="form-control"
                id="direccion"
                name="direccion"
                value={user.direccion}
                placeholder={`${user.direccion}`}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Correo</label>
                <input
                type="text"
                className="form-control"
                id="correo"
                name="correo"
                value={user.correo}
                placeholder={`${user.correo}`}
                />
            </div>
            <Link to={"/perfil"} className="btn btn-danger">Volver</Link>
            <div className="mb-3">
                <input type="submit" value="Actualizar" className="btn btn-success" />
            </div>
        </form>
    )
}

export default EditProfile