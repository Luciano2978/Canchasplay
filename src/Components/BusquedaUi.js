import { Box, Typography, Container } from "@mui/material";
import Lupa from "../Assets/img/Lupa.png";

export default function BusquedaUi() {
  const boxStyle = {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  return (
    <Container sx={containerStyle}>
      <Box sx={boxStyle} className="boxWithAnimation">
        <img alt="Lupa" src={Lupa} className="" />
        <Typography variant="h6" color="text.primary">
          No se Encontraron Complejos cerca de tu Ubicacion
        </Typography>
      </Box>
    </Container>
  );
}
