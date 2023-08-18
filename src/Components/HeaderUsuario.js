
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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



export default function HeaderUsuario() {
  return (
    <ThemeProvider theme={theme}>

        <Box sx={centerContentStyle}>
  
            <Typography variant="h3"  sx={whiteTextStyle}>Selecciona el Deporte que deseas Jugar</Typography>
            
        </Box>
    </ThemeProvider>
  );
}