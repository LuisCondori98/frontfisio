import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const EditProfile = () => {

  const { dni } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    celular: "",
    direccion: "",
    correo: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://back-fisioterapia.onrender.com/api/user/getdni/${dni}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    fetchUser();
  }, [dni]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://back-fisioterapia.onrender.com/api/user/user-update",
        { ...user, id: user._id }
      );

      await Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/perfil");

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar usuario",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mt-4"
      style={{ maxWidth: "600px" }}
    >

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control text-uppercase"
          name="nombre"
          value={user.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Apellido Paterno</label>
        <input
          type="text"
          className="form-control text-uppercase"
          name="apellidoPaterno"
          value={user.apellidoPaterno}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Apellido Materno</label>
        <input
          type="text"
          className="form-control text-uppercase"
          name="apellidoMaterno"
          value={user.apellidoMaterno}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Celular</label>
        <input
          type="tel"
          className="form-control"
          name="celular"
          value={user.celular}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input
          type="text"
          className="form-control"
          name="direccion"
          value={user.direccion}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Correo</label>
        <input
          type="email"
          className="form-control"
          name="correo"
          value={user.correo}
          onChange={handleChange}
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
  );
};

export default EditProfile;