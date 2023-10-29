import VistaCanchas from "../Components/SeleccionCanchas/VistaCanchas";
import "../Assets/css/Background.css";
import InformacionUsuario from "../Components/SeleccionCanchas/InformacionUsuario";



export default function SeleccionCanchas(){





    return (
        <>

        <div className="BackgroundHomeUsuario">

            <div className="Header">
                <InformacionUsuario></InformacionUsuario>
            </div>

            <div className="body">
                <VistaCanchas></VistaCanchas>
            </div>
        

        </div>

        </>
    )
}