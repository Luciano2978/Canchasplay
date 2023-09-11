/* import { useState } from "react";
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
    return(
        <>
        
        <ContextoNav.Provider   
        value={{
            RouteNavigation,
            RouteComponent
        }}>

        {children}
        </ContextoNav.Provider>
        
        
        
        </>
    )
} */