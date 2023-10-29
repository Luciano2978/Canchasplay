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
  const [complejoActivo, setComplejoActivo] = useState(0); // Estado para controlar la opción activa/inactiva


  const handleComplejoActivoChange = (event) => {
    const nuevoEstado = event.target.value === 'activo' ? 1 : 0; // Convierte 'activo' a 1 y 'inactivo' a 0

    // Realiza una solicitud al servidor para actualizar el estado en la base de datos
    axios.put('http://localhost:8080/putEstado', {
      estado_Complejo: nuevoEstado,
      // Aquí puedes incluir otros datos que necesites enviar al servidor
    })
      .then((response) => {
        // La solicitud fue exitosa, puedes manejar la respuesta del servidor aquí si es necesario
        console.log('Estado del complejo actualizado con éxito');
      })
      .catch((error) => {
        // Manejar errores en caso de que la solicitud falle
        console.error('Error al actualizar el estado del complejo:', error);
      });

    setComplejoActivo(nuevoEstado);
  };
  useEffect(() => {
    // Aquí puedes agregar una solicitud al servidor para obtener el estado actual del complejo
    axios
      .get('http://localhost:8080/getComplejo')
      .then((response) => {
        // Actualiza el estado del complejo con el valor obtenido del servidor
        const estadoComplejo = response.data.estado_Complejo === 1 ? 'activo' : 'inactivo';
        setComplejoActivo(estadoComplejo);
      })
      .catch((error) => {
        // Manejar errores en caso de que la solicitud falle
        console.error('Error al obtener el estado del complejo:', error);
      });
  }, []);
  return (
    <div>
      <Paper
        elevation={4}
        sx={{
          padding: '10px',
          mt: '0',
          width: '100%', // Ajusta el ancho al 100%
          height: '100vh', // 100% de la altura de la ventana
        }}
      >
        <Box sx={{ mt: '5rem', display: 'flex', alignItems: 'center', position: "absolute", ml: "35%" }}>
          <MonetizationOnIcon sx={{ fontSize: '2rem', marginRight: '1rem', color: 'green' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Ganancia Total
          </Typography>

        </Box>
        <Typography variant="h4" sx={{ mt: "10rem", ml: '40%', fontWeight: 'bold', position: "absolute" }}>
          $22.900
        </Typography>
        <Box sx={{ mt: 'rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position: "absolute", ml: "95%" }}>
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
                    fontSize: '1.5rem',
                    color: 'blue', // Cambia el color del círculo
                    '&.Mui-checked': {
                      backgroundColor: 'lightgreen', // Cambia el fondo cuando está seleccionado
                      boxShadow: '0px 0px 10px rgba(0, 128, 0, 0.5)', // Sombra cuando está seleccionado
                    },
                  }}
                />
              }
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
                    color: 'blue', // Cambia el color del círculo cuando está seleccionado
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
            ml: "5px"
          }}
        >
          <img
            
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
