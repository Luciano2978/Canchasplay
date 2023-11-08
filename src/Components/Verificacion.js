
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from "react-router-dom";



export default function Verificacion(){
    
    const {user} = useAuth0();
    console.log(user)
    const rol = user.Nombre.user_metadata.rol

    if(rol === "Usuario") return <Navigate to="/homeUsuario"/>

    if(rol === "Propietario") return <Navigate to="/Complejo"/>

}