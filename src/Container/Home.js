import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Components/Logout";
import React from "react";
import FooterPropietario from "../Components/FooterNavigation";
import { makeStyles } from "@mui/material";



const useStyles = makeStyles((theme)=>({
    root: {
        background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)", // Cambia los colores según tus preferencias
        minHeight: "100vh", // Asegura que el fondo cubra toda la altura de la ventana
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      },
      content: {
        background: "#fff", // Cambia el color de fondo del contenido
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[3],
      },


} ));

export default function Home(){
    const classes = useStyles();

    const { user} = useAuth0();

    return(
        <>
            <div className={classes.root}>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>

            <div>
                <h2>Boton Home</h2>
                <LogoutButton></LogoutButton>
                <FooterPropietario></FooterPropietario>
            </div>
        </>
    
    )
}