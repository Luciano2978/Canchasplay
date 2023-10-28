import { Box, Typography } from "@mui/material";
import "../Assets/css/Loader.css"
import 'animate.css';
import Pelota from "../Assets/Pelota.png";
import PelotaBasket from "../Assets/PelotaBasket.png";
import PelotaTenis from "../Assets/PelotaTenis.png";
import CanchaPlayTransparent from "../Assets/CanchaPlayTransparent.png";

export default function Loader() {
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

    const rowStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", 
        marginBottom: "10px",
    };

    return (
        <div className="loader-container">
            <Box sx={boxStyle} className="boxWithAnimation">
                <div style={rowStyle}>
                    <img alt="Logo" src={CanchaPlayTransparent} className="animate__animated animate__zoomInDown" />
                </div>
                <div style={rowStyle}>
                    <img alt="Pelota" src={PelotaTenis} className="imgPelotaBehind animate__spinAndMove" />
                    <img alt="Pelota" src={PelotaBasket} className="imgPelotaBehind animate__spinAndMove delayed-animation-1" />
                    <img alt="Pelota" src={Pelota} className="imgPelota animate__spinAndMove delayed-animation-2" />
                </div>
            </Box>
        </div>
    )
}
