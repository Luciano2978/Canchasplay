
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from "../Assets/Logo.png";
const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const centerContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '3%',
//height: '100vh', // O ajusta esta altura según tus necesidades
  //background: 'black', // Cambia el color de fondo si es necesario
};

const whiteTextStyle = {
    color: 'black',
  };

const logoStyle = {
    position: 'fixed',
    top: '5%', // Alinea el logo en el centro verticalmente
    left: '50%', // Alinea el logo en el centro horizontalmente
    transform: 'translate(-50%, -50%)', // Centra el logo exactamente
    width: '10%', // Ajusta el ancho del logo según tus necesidades
};

export default function HeaderUsuario() {
  return (
    <ThemeProvider theme={theme}>
        <Box>
            <img src={Logo} alt="Logo" style={logoStyle} />
        </Box>
        <Box sx={centerContentStyle}>
            
            <Typography variant="h3"  sx={whiteTextStyle}>Selecciona el Deporte que deseas Jugar</Typography>
        </Box>
    </ThemeProvider>
  );
}