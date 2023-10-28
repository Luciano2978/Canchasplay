import React from 'react';
import { useState } from 'react';
import PieChartWithCustomizedLabel from './PieCirc';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  Radio,
  RadioGroup,
  AppBar,
  FormControlLabel,


} from '@mui/material';
import BarsDataset from './PropiChart';
import logo from '../../Assets/Logo.png';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import NotificationsIcon from '@mui/icons-material/Notifications';
import bg from '../../Assets/def.png'
const breakpoints = {
  xs: '(max-width:600px)',
  sm: '(max-width:960px)',
  md: '(max-width:1280px)',
  lg: '(max-width:1920px)',
};

function HomePropietario() {
  const isMobile = useMediaQuery(breakpoints.xs);
  const isTablet = useMediaQuery(breakpoints.sm);
  const isDesktop = useMediaQuery(breakpoints.md);
  const [complejoActivo, setComplejoActivo] = useState('activo'); // Estado para controlar la opción activa/inactiva

  const handleComplejoActivoChange = (event) => {
    setComplejoActivo(event.target.value);
  };

  return (
    <div>
      <Paper
        elevation={4}
        sx={{
          padding: '10px',
          mt: '0',
          backgroundImage: `url(${bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%', // Ajusta el ancho al 100%
          height: '100vh', // 100% de la altura de la ventana
        }}
      >
        <Box sx={{ mt: '5rem', display: 'flex', alignItems: 'center', position: "absolute", ml:"35%" }}>
          <MonetizationOnIcon sx={{ fontSize: '2rem', marginRight: '1rem', color: 'green' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Ganancia Total
          </Typography>
          
        </Box>
        <Typography variant="h4" sx={{ mt:"10rem", ml: '40%', fontWeight: 'bold', position:"absolute" }}>
            $22.900
          </Typography>
        <Box sx={{ mt: 'rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position:"absolute", ml:"95%" }}>
          {/* Icono de usuario */}
          <AccountCircleIcon sx={{ fontSize: '2rem', color: 'blue', marginBottom: '1rem' }} />
          {/* Icono de notificaciones */}
          <NotificationsIcon sx={{ fontSize: '2rem', color: 'orange' }} />
        </Box>
        <Box sx={{ ml: "70%", position: "absolute", mt: "2rem" }}>
          <Typography variant="body1" sx={{
            ml: 2,
            fontSize: '1.5rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Agrega sombreado
            fontWeight: 'bold',
          }} >El complejo se encuentra {complejoActivo === 'activo' ? 'activo' : 'inactivo'}
          </Typography>
          <RadioGroup
            row
            name="complejoActivo"
            value={complejoActivo}
            onChange={handleComplejoActivoChange}
            sx={{ ml: "5rem" }}
          >
            <FormControlLabel
              value="activo"
              control={<Radio
                sx={{
                  fontSize: '1.5rem',
                  color: 'green',
                  '&.Mui-checked': {
                    fontSize: '1.5rem',
                    '&:hover': {
                      backgroundColor: 'lightgreen', // Cambia el fondo al pasar el mouse
                      boxShadow: '0px 0px 10px rgba(0, 128, 0, 0.5)', // Sombra al pasar el mouse
                    },
                  },
                }}
              />}
              label="Activo"
              sx={{
                fontSize: '1.5rem',
                '&:hover': {
                  color: 'darkgreen', // Cambia el color del texto al pasar el mouse
                },
              }}
            />
            <FormControlLabel
              value="inactivo"
              control={<Radio
                sx={{
                  fontSize: '1.5rem',
                  color: 'red',
                  '&.Mui-checked': {
                    fontSize: '1.5rem',
                    '&:hover': {
                      backgroundColor: 'lightcoral', // Cambia el fondo al pasar el mouse
                      boxShadow: '0px 0px 10px rgba(255, 0, 0, 0.5)', // Sombra al pasar el mouse
                    },
                  },
                }}
              />}
              label="Inactivo"
              sx={{
                fontSize: '1.5rem',
                '&:hover': {
                  color: 'darkred', // Cambia el color del texto al pasar el mouse
                },
              }}
            />
          </RadioGroup>

        </Box>

        <Box
          sx={{
            mt: "-10rem",
            position: 'absolute',
            paddingLeft: isMobile ? '0.4rem' : '1rem',
            textAlign: isMobile ? 'center' : isDesktop ? 'center' : '',
            transform: isMobile ? 'translateY(-50%)' : isDesktop ? 'translateY(-50%)' : '',
            width: isMobile ? '100%' : isDesktop ? '100%' : '',
            ml:"5px"
          }}
        >
          <img
            src={logo}
            alt="Descripción de la imagen"
            style={{
              width: isMobile ? '13rem' : isDesktop ? '100%' : '',
              height: 'auto',
              marginTop: isMobile ? '1rem' : isDesktop ? '10rem' : '4.5rem',
              textAlign: 'left',
            }}
          />
        </Box>
        <Grid container spacing={isMobile ? 2 : 4}>
          <Grid item xs={12} md={6} lg={8}>
            <Box sx={{ mt: isMobile ? '2rem' : '25rem' }}>
              <Typography sx={{ textAlign: 'left', ml: isMobile ? '1rem' : '5rem' }} variant={isMobile ? 'h6' : 'h4'}>
                Ganancias
              </Typography>
              <BarsDataset />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box
              sx={{
                marginLeft: isMobile ? '0' : '-15rem',
                mt: isDesktop ? '2rem' : '25rem',
                padding: '1rem',
                borderRadius: '8px',
              }}
            >
              <Typography sx={{ mb: '1rem', textAlign: 'left' }} variant={isMobile ? 'h6' : 'h4'}>
                Tráfico por dispositivo
              </Typography>
              <PieChartWithCustomizedLabel />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div >
  );
}

export default HomePropietario;
