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
        console.log(response)
      })
      .catch((error) => {
        console.log("Error " + error);
      });
  }, []);


  
  console.log(data) 

  if (rol === "Usuario") return <Navigate to="/homeUsuario" />;

  if (rol === "Propietario" && data.Verificado === 1) {
    return <Navigate to="/Complejo" />;
  } else if (rol === "Propietario" && data.Verificado === 0){
    return <Navigate to="/PropValidate" />;
  }

  if (rol === "Administrador") return <Navigate to="/AdminPage" />;
}
