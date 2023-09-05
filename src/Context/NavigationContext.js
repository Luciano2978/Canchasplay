import { useState } from "react";
import ContextoNav from "./Context";
import dayjs from 'dayjs';




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
    

    const diaDefault = dayjs().get('date')
    const mesDefault = (dayjs().get('month')) +1
    const añoDefault = dayjs().get('year')

    const [dia,setDia ] = useState(diaDefault)
    const [mes,setMes] = useState(mesDefault)
    const [año,setAño] = useState(añoDefault)

    const ObtenerFecha = (dia,mes,año) =>{
        setDia(dia)
        setMes(mes)
        setAño(año)
    }


    return(
        <>
        
        <ContextoNav.Provider   
        value={{
            RouteNavigation,
            RouteComponent,
            ObtenerFecha,
            dia,
            mes,
            año
        }}>

        {children}
        </ContextoNav.Provider>
        
        
        
        </>
    )
}