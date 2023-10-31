import { Box } from "@mui/material";
import "../Assets/css/SinPermisoUi.css";
import Warning from "../Assets/img/Warning.png"





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

    return (
        <div className="Permisos-container">
            <Box sx={boxStyle} className="boxWithAnimation">
                <div className="Tittle-404">
                    <h1>Lo Sentimos</h1>
                </div>
                <img src={Warning} alt="Warning" style={imgWarningStyle}></img>
                <div className="Text-404">
                    <p>No esta autorizado para Ingresar a esta seccion.</p>
                    <u>CLICK AQUI: “PARA VOLVER”</u>
                </div>
            </Box>
        </div>
    )
}