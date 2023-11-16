import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Verificacion() {
  const [data, setData] = useState(null);
  const { user } = useAuth0();
  const rol = user.Nombre.user_metadata.rol;

  useEffect(() => {
    axios
      .get(`https://canchas-play.onrender.com/getVerificacion/${user.sub}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error " + error);
      });
  }, []);

  console.log(user.email_verified, "Esta autenticasdo?");

  if (rol === "Usuario" && user.email_verified == true) {
    return <Navigate to="/homeUsuario" />;
  } else if (rol === "Usuario" && user.email_verified == false) {
    return <Navigate to="/PropValidate" />;
  }

  if (rol === "Propietario") {
    if (data) {
      console.log(data);
      for (const dataProp of data) {
        if (dataProp.Verificado === 1) {
          if (dataProp.cantidad_de_complejos_relacionados === 0) {
            return <Navigate to="/Complejo" />;
          } else if (dataProp.cantidad_de_complejos_relacionados === 1) {
            return <Navigate to="/homePropietario" />;
          }
        } else if (dataProp.Verificado === 0 && user.email_verified == false) {
          return <Navigate to="/PropValidate" />;
        }
      }
    }
  }

  if (rol === "Administrador") return <Navigate to="/AdminPage" />;
}
