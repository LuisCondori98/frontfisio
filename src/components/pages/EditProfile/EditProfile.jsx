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

    return (
        <form
        action="https://back-fisioterapia.onrender.com/api/user/user-update"
        method="POST"
        className="container mt-4"
        style={{ maxWidth: "600px" }}
        >

        <input type="hidden" name="id" value={user._id} />

        <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            defaultValue={user.nombre}
            style={{ textTransform: "uppercase" }}
            />
        </div>

        <div className="mb-3">
            <label htmlFor="apePaterno" className="form-label">Apellido Paterno</label>
            <input
            type="text"
            className="form-control"
            id="apePaterno"
            name="apePaterno"
            defaultValue={user.apellidoPaterno}
            style={{ textTransform: "uppercase" }}
            />
        </div>

        <div className="mb-3">
            <label htmlFor="apeMaterno" className="form-label">Apellido Materno</label>
            <input
            type="text"
            className="form-control"
            id="apeMaterno"
            name="apeMaterno"
            defaultValue={user.apellidoMaterno}
            style={{ textTransform: "uppercase" }}
            />
        </div>

        <div className="mb-3">
            <label htmlFor="celular" className="form-label">Celular</label>
            <input
            type="tel"
            className="form-control"
            id="celular"
            name="celular"
            defaultValue={user.celular}
            />
        </div>

        <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Dirección</label>
            <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            defaultValue={user.direccion}
            />
        </div>

        <div className="mb-4">
            <label htmlFor="correo" className="form-label">Correo</label>
            <input
            type="email"
            className="form-control"
            id="correo"
            name="correo"
            defaultValue={user.correo}
            />
        </div>

        <div className="d-flex justify-content-between">
            <Link to="/perfil" className="btn btn-outline-danger">
            Volver
            </Link>

            <button type="submit" className="btn btn-success">
            Actualizar
            </button>
        </div>

        </form>
    )
}

export default EditProfile