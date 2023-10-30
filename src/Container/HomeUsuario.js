import FooterNavigation from "../Components/FooterNavigation";
import "../Assets/css/Background.css";
import { useContext } from "react";
import Contexto from "../Context/Context";
import SeleccionCanchas from "./SeleccionCanchas.js";
import MisReservas from "./MisReservas";
import News from "./News";



export default function Home(){

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
                            return <News></News>;
                        }
                        if (RouteComponent === "MisReservas") {
                            return  <MisReservas/>;
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