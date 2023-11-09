import React from 'react';
import { useState, useEffect } from 'react';
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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import logo from '../../Assets/img/Logo.png';
import { useAuth0 } from '@auth0/auth0-react';
import SinPermisoUi from '../SinPermisoUi';

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
  const [complejoActivo, setComplejoActivo] = useState(0);

  const handleComplejoActivoChange = (event) => {
    const nuevoEstado = event.target.value === 'activo' ? 1 : 0;
    axios
      .put('http://localhost:8080/putEstado', {
        estado_Complejo: nuevoEstado,
      })
      .then((response) => {
        console.log('Estado del complejo actualizado con éxito');
      })
      .catch((error) => {
        console.error('Error al actualizar el estado del complejo:', error);
      });
    setComplejoActivo(nuevoEstado);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/getComplejo')
      .then((response) => {
        const estadoComplejo = response.data.estado_Complejo === 1 ? 'activo' : 'inactivo';
        setComplejoActivo(estadoComplejo);
      })
      .catch((error) => {
        console.error('Error al obtener el estado del complejo:', error);
      });
  }, []);

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          padding: '10px',
          mt: '0',
          width: '100%',
          height: '100vh',
          textAlign: isMobile ? 'center' : "left"
        }}
      >
        <Box sx={{ ml: "70%", position: "absolute", mt: "2rem" }}>
          <Typography variant="body1" sx={{
            ml: 2,
            fontSize: '1.5rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Agrega sombreado
            fontWeight: 'bold',


          }} >        El complejo se encuentra {complejoActivo === 1 ? 'activo' : 'inactivo'}

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
              control={
                <Radio
                  sx={{

                    color: 'blue', // Cambia el color del círculo
                    '&.Mui-checked': {
                      backgroundColor: 'blue', // Cambia el fondo cuando está seleccionado
                      boxShadow: '0px 0px 10px rgba(0, 128, 0, 0.5)', // Sombra cuando está seleccionado
                    },
                  }}
                />
              }
              label="Activo"
              sx={{
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
                    color: 'blue', // Cambia el color del círculo cuando está seleccionado
                    fontSize: '1.5rem',
                    '&:hover': {
                      backgroundColor: 'blue', // Cambia el fondo al pasar el mouse
                      boxShadow: '0px 0px 10px rgba(255, 0, 0, 0.5)', // Sombra al pasar el mouse
                    },
                  },
                }}
              />}
              label="Inactivo"
              sx={{
                '&:hover': {
                  color: 'darkred', // Cambia el color del texto al pasar el mouse
                },
              }}
            />
          </RadioGroup>

        </Box>
        <img
          src={logo}
          alt="Descripción de la imagen"
          style={{
            width: isMobile ? '50%' : '20%',
            height: 'auto',
            marginTop: isMobile ? '1rem' : '-40px',
            marginBottom: isMobile ? "0" : "10%"
          }}
        />
        <Box
          sx={{
            mt: isMobile ? '1rem' : '-20%',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'column',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <MonetizationOnIcon sx={{ fontSize: isMobile ? '3rem' : '2rem', marginRight: isMobile ? '0' : '1rem', color: 'green' }} />
          <Box sx={{bgcolor: "grey"}}>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold',  }}>
              Ganancia Total
            </Typography>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', textAlign:"center" }}>
              $22.900
            </Typography>
          </Box>

          <Grid container spacing={isMobile ? 2 : 4}>
            <Grid item xs={12} md={6} lg={8}>
              <Typography sx={{ textAlign: isMobile ? 'center' : 'left', ml: isMobile ? '0' : '5rem' }} variant={isMobile ? 'h5' : 'h4'}>
                Ganancias
              </Typography>
              <BarsDataset />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>

              <Typography sx={{ mb: '1rem', textAlign: 'left' }} variant={isMobile ? 'h5' : 'h4'}>
                Tráfico por dispositivo
              </Typography>
              <PieChartWithCustomizedLabel />

            </Grid>
          </Grid>
        </Box>




      </Paper>
    </div >
  )
};

export default HomePropietario;