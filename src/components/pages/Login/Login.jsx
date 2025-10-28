import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const Login = () => {

  let id=817846854540409
  const {isAuthenticated, login} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  ///////////////////////////////////////////////////////////////////////////
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      login(email, password)

      navigate("/")
    } catch (err) {

      console.log("error" + err)

      navigate("/login")
    }
  };

  ///////////////////////////////////////////////////////////////////////////

  const handleRecoveryPass = async () => {

    const { value: formValues } = await Swal.fire({
    title: "Iniciar Sesión",
    html: `
      <input id="swal-input1" class="swal2-input" placeholder="Correo electrónico" type="email">
      <input id="swal-input2" class="swal2-input" placeholder="Contraseña Nueva" type="password">
    `,
    focusConfirm: false,
    confirmButtonText: "Confirmar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    preConfirm: () => {

      const email = document.getElementById("swal-input1").value;
      const password = document.getElementById("swal-input2").value;

      if (!email || !password) {
        Swal.showValidationMessage("Ambos campos son obligatorios");
        return false;
      }

      return { email, password };
    },
    });

    if (formValues) {

      console.log("Credentials send:", formValues);

      try {
        const response = axios.post("https://back-fisioterapia.onrender.com/api/user/pass-recovery", {
          correo: formValues.email,
          password: formValues.password,

        })

        Swal.fire({
          icon: "success",
          title: "Contraseña Cambiada",
          text: `Correo: ${formValues.email}`,
        });

      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cambiar la contraseña",
        });
      }

      // Swal.fire({
      //   icon: "success",
      //   title: "Contraseña Cambiada",
      //   text: `Correo: ${formValues.email}`,
      // });
    }
  }

  const responseFacebook = async (response) => {

    console.log("Datos de Facebook:", response);

      const userData = {
        nombre: response.name,
        correo: response.email,
        alergias: ""
      };

      try {
        await axios.post("https://back-fisioterapia.onrender.com/api/user", userData);
        alert("Usuario registrado correctamente");
      } catch (err) {
        console.error(err);
        alert("Error al registrar usuario");
      }
  }

  return (
    <main>
      {
        isAuthenticated?
        <Navigate to={"/"} />
        :
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ width: "22rem" }}>
          <h3 className="text-center mb-4">Iniciar sesión</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar sesión
            </button>
            <p className="text-center mt-3">
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>

          </form>
          <button onClick={handleRecoveryPass} className="btn btn-success">Restablecer contraseña</button>
        </div>
      </div>
      }
    </main>
  )
}

export default Login