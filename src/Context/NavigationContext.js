import { useState } from "react";
import ContextoNav from "./Context";
import dayjs from 'dayjs';
import { useAuth0 } from "@auth0/auth0-react";




export default function NavigationContext(props){

    const {children} = props;
    const [RouteComponent,setRouteComponent] = useState("");

    
    //Tomo ese valor y lo seteo en una const, para enviarlo al home
    const RouteNavigation = (route) =>{
        setRouteComponent(route)
    }
    

    const diaDefault = dayjs().get('date')
    const mesDefault = (dayjs().get('month')) +1
    const añoDefault = dayjs().get('year')
    const fechaDefault = dayjs().format('YYYY-MM-DD')

    const [dia,setDia ] = useState(diaDefault)
    const [mes,setMes] = useState(mesDefault)
    const [año,setAño] = useState(añoDefault)
    const [fecha,setFecha] = useState(fechaDefault)

    const ObtenerFecha = (dia,mes,año,fechaCompleta) =>{
        setDia(dia)
        setMes(mes)
        setAño(año)
        setFecha(fechaCompleta)
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
            año,
            fecha
        }}>

        {children}
        </ContextoNav.Provider>
        
        
        
        </>
    )
}