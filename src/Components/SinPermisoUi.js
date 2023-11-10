import { Box, Link } from "@mui/material";
import "../Assets/css/SinPermisoUi.css";
import Warning from "../Assets/img/Warning.png"
import PelotaBasket from "../Assets/img/PelotaBasket.png";
import AroBasquet from "../Assets/img/AroBasquet.png";
import 'animate.css';



export default function SinPermisoUi(){

    const boxStyle = {
        textAlign: "center",
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    const imgWarningStyle = {
        height: "150px"
    }

    const aroBasquetStyle = {
        position: "absolute",
        top: 0,
        width: "15%",
    }
    

    return (
        <div className="Permisos-container" >
            {/* <img src={AroBasquet} alt="Aro" style={aroBasquetStyle}></img> */}
            <Box sx={boxStyle} className="boxWithAnimation">
                <div className="Tittle-404">
                    <h1>Lo Sentimos</h1>
                </div>
                <img src={Warning} alt="Warning" style={imgWarningStyle} className="animate__animated animate__tada"/>
                <div className="Text-404">
                    <p>No esta autorizado para Ingresar a esta seccion.</p>
                    <Link href="/" color="inherit">
                        CLICK AQUI: “PARA VOLVER”
                    </Link>
                </div>
                
            </Box>
            {/* <img src={PelotaBasket} alt="pelota" className="EfectosPelota"></img> */}
        </div>
    )
}