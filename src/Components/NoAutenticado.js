// App.js
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import "../Assets/css/noAutenticado.css";

function NoAutenticado() {
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
      </div>
    </body>
  );
}
export default NoAutenticado;
