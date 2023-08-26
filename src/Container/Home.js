//import { useAuth0 } from "@auth0/auth0-react";
import FooterNavigation from "../Components/FooterNavigation";
import "../Assets/css/Background.css";
import HeaderUsuario from "../Components/HeaderUsuario";
import BotonDeportes from "../Components/HomeUsuario/BotonDeportes";
import { useContext } from "react";
import Contexto from "../Context/Context";
import SeleccionCanchas from "./SeleccionCanchas.js";
export default function Home(){

    //const { user} = useAuth0();
    //Recibo el valor para hacer una comparacion y mostrar el componente que necesito
    const {RouteComponent} = useContext(Contexto);

    return(
        <>
            <div className="BackgroundHomeUsuario">

                {/* <div className="HeaderHomeUsuario">
                    <HeaderUsuario></HeaderUsuario>
                </div> */}

                <div className="BodyHomeUsuario">
                    {/* Utilizo condicionales y muestro el componente*/}
                    {(() => {
                        if (RouteComponent === "Dashboard") {
                            return <SeleccionCanchas></SeleccionCanchas>
                        } 
                        if (RouteComponent === "News") {
                            return  <h1 style={{textAlign: "Center"}}>News</h1>;
                        }
                        if (RouteComponent === "Historial") {
                            return  <h1 style={{textAlign: "Center"}}>Historial</h1>;
                        }
                    })()}
                    
                    {/*<CardDeportes></CardDeportes>*/}
                </div>

                <div className="FooterHomeUsuario">
                    <FooterNavigation></FooterNavigation>
                </div>
                
                {/*
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>

                <div>
                    <h2>Boton Home</h2>
                    <LogoutButton></LogoutButton>
                    
            </div>*/}
            </div>
        </>
    
    )
}