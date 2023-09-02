import { useState } from "react";
import ContextoCanchas from "./Context";



export default function CanchasContext(props){

    const {children} = props;
    const [nombreCancha, setNombreCancha ] = useState("");
    const [estadoDisplay, setEstadoDisplay] = useState(false);
    
    const displayHorarios = (NombreCancha) =>{
        setNombreCancha(NombreCancha);
        setEstadoDisplay(true)
    }


    return(
        <>
        
        <ContextoCanchas.Provider   
        value={{
            displayHorarios,
            nombreCancha,
            estadoDisplay
        }}>

        {children}
        </ContextoCanchas.Provider>
        
        
        
        </>
    )
}