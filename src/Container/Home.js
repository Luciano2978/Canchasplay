import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Components/Logout";
import React from "react";
import FooterPropietario from "../Components/FooterNavigation";
import { useContext } from "react";
import Contexto from "../Context/Context";
/* import BotonPropietario from "../Components/Botons";
 */import FooterNavigation from "../Components/FooterNavigation";
import AddCancha
 from "../Components/VistaPropietario/AddCancha";


export default function Home() {

    const { user } = useAuth0();
    const {RouteComponent} = useContext(Contexto);

    return (
        <>
            <div >
              
                
               {/*  <header>

                    <h1 >  Canchas Play  </h1>



                </header>
                 */}
                 {/* Utilizo condicionales y muestro el componente*/}
                 {(() => {
                        if (RouteComponent === "Dashboard") {
                            return <AddCancha></AddCancha>;
                        } 
                        if (RouteComponent === "News") {
                            return  <h1 style={{textAlign: "Center"}}>News</h1>;
                        }
                        if (RouteComponent === "Historial") {
                            return  <h1 style={{textAlign: "Center"}}>Historial</h1>;
                        }
                    })()}
                
            </div>
            <FooterNavigation></FooterNavigation>



        </>

    )
}