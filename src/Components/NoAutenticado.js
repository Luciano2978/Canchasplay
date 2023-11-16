// App.js
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import "../Assets/css/noAutenticado.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
function NoAutenticado() {

  const { logout } = useAuth0();

  const navigate = useNavigate()

  const handleLogout = async () => {

    await logout()

    await navigate("/")

  }

  return (
    <body className="NoAutenticado-body">
      <div className="noAutenticado-Container">
        <div className="noAutenticado-card">
          <FaExclamationCircle className="noAutenticado-icon" />
          <h1>Cuenta no activada</h1>
          <p>
            Tu cuenta aún no ha sido activada. Por favor, espera a recibir una
            respuesta para continuar.
          </p>
        </div>
        <br/>
        <button className="btn" onClick={handleLogout}>Volver</button>
      </div>
    </body>
  );
}
export default NoAutenticado;
