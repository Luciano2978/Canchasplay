import { useState } from "react";
import ContextoNav from "./Context";




export default function NavigationContext(props){

    const {children} = props;
    const [RouteComponent,setRouteComponent] = useState("");


    //Tomo ese valor y lo seteo en una const, para enviarlo al home
    const RouteNavigation = (route) =>{
        if(route === ""){
            setRouteComponent("Dashboard")
        }
        setRouteComponent(route)
    }



    const [nombreCancha, setNombreCancha ] = useState("");
    const [estadoDisplay, setEstadoDisplay] = useState(false);
    
    const displayHorarios = (NombreCancha) =>{
        console.log(nombreCancha)
        setNombreCancha(NombreCancha);
        setEstadoDisplay(true)
    }

    return(
        <>
        
        <ContextoNav.Provider   
        value={{
            RouteNavigation,
            RouteComponent,
            displayHorarios,
            nombreCancha,
            estadoDisplay
        }}>

        {children}
        </ContextoNav.Provider>
        
        
        
        </>
    )
}