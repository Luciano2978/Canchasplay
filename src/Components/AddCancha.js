import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  Box, Container, useMediaQuery, Button, Paper, TextField,
  Select, MenuItem, InputLabel, FormControl,
  createTheme, ThemeProvider, AppBar, Toolbar, Grid, BottomNavigationAction, BottomNavigation
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useJsApiLoader, Autocomplete, } from '@react-google-maps/api';
/* import FooterNavigation from './FooterNavigation';
 */import axios from 'axios';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import InputAdornment from '@mui/material/InputAdornment';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import logo from '../Assets/Logo.png';
import img from '../Assets/bgmobile.jpg'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddIcon from '@mui/icons-material/Add';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';


const breakpoints = {
  xs: '(max-width:600px)',
  sm: '(max-width:960px)',
  md: '(max-width:1280px)',
  lg: '(max-width:1920px)',
  xl: '(min-width:1920px)',
  custom: '(width:1366px) and (height:768px)',
};




export default function AddCancha() {
  const [deporte, setDeporte] = useState("futbol");
  const [Caracteristicas, setCaracteristicas] = useState("");
  const [Precio_Hora, setPrecio_Hora] = useState("");
  const [largo, setLargo] = useState("");
  const [ancho, setAncho] = useState("");
  const [ubicacion_Detallada, setUbicacion_Detallada] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [info_Dimensiones, setInfo_Dimensiones] = useState("");
  const [location, setLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const autocompleteRef = useRef();


  const handleInputChange = (e, setStateFunction) => {
    const input = e.target.value;

    // Usamos una expresión regular para validar si la entrada es un número.
    if (/^\d*\.?\d*$/.test(input)) {
      setStateFunction(input);
    }
  };

/*   const urlad = "http://localhost:9000/api";
 */  const handleSubmit = (event) => {
    const dimensionesConcatenadas = `${largo} x ${ancho}`;

    // Enviar la solicitud POST
    axios.post("http://localhost:8080/createCancha", {
      deporte: deporte,
      Caracteristicas: Caracteristicas,
      Precio_Hora: Precio_Hora,
      /* largo: largo,
      ancho: ancho, */
      info_Dimensiones: dimensionesConcatenadas,
      ubicacion_Detallada: ubicacion_Detallada,
      latitud: latitud, // Asegúrate de que las claves coincidan con los nombres de los campos en el servidor
      longitud: longitud,

    }).then(() => {
      alert("registrado");
    }).catch((error) => {
      console.error("Error al registrar:", error);
      alert("Ocurrió un error al registrar los datos.");
    });
  };

  useEffect(() => {
    console.log(deporte);
  }, [deporte]);

  const handleChange = (e) => {
    setDeporte(e.target.value);
  };

  /*  const handleAutocompleteSelect = () => {
    if (autocompleteRef.current) {
      const selectedPlace = autocompleteRef.current.getPlace();
      if (selectedPlace.geometry && selectedPlace.geometry.location) {
        const { latitud, longitud } = selectedPlace.geometry.location;
        const newMarkerPosition = { latitud: latitud(), longitud: longitud() }; // Aquí obtén las coordenadas
 
         // Envía las coordenadas en el formato que necesitas
         setMarkerPosition(newMarkerPosition);
 
         setLocation(selectedPlace.formatted_address);
         console.log(newMarkerPosition);
       }
     }
    }; */

  const handleAutocompleteSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry && place.formatted_address) {
      const { latitud, longitud } = place.geometry.location;
      setLatitud(latitud);
      setLongitud(longitud);
      setUbicacion_Detallada(place.formatted_address);
      console.log(latitud)
      console.log(longitud)
    }
  };
  /*  const handleAutocompleteSelect = () => {
    if (autocompleteRef.current){
      const selectedPlace = autocompleteRef.current.getPlace();}
      if (selectedPlace.geometry && selectedPlace.geometry.location) {
        const { latitud, longitud } = selectedPlace.geometry.location;
        setMarkerPosition({ latitud: latitud, longitud: longitud });
        setUbicacion_Detallada(selectedPlace.formatted_address);
        console.log(markerPosition)
        console.log(location)
  }
} */


  const googleMapsApiKey = 'AIzaSyDfzAChOLCriCs3TcLULEtD7RH75ktqmI4'

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
  });

  const isMobile = useMediaQuery(breakpoints.xs);
  const isTablet = useMediaQuery(breakpoints.sm);
  const isDesktop = useMediaQuery(breakpoints.md && breakpoints.lg);


  return (

    <div >
      <Box
        component={Paper}
        elevation={4}
        sx={{
          padding: '10px',
          mt: '0', // Elimina el margen superior en dispositivos móviles
          marginRight: isMobile ? 'auto' : isDesktop ? '5%' : '', // Centra en dispositivos móviles
          marginLeft: isDesktop ? '0' : "0",
          ml: isMobile ? '' : '',
          backgroundImage: `url(https://img.freepik.com/vector-gratis/papel-pintado-abstracto-blanco_23-2148830027.jpg?w=2000)`,
          backgroundRepeat: "no-repeat",
          width: isDesktop ? "100%" : (isMobile ? "25rem" : "")

        }}
      >


        <Box
          sx={{
            marginLeft: isMobile ? '' : isDesktop ? '' : '',
            position: isMobile ? "absolute" : "" || isDesktop ? 'absolute' : '',
            marginTop: isDesktop ? '-5rem' : isMobile ? '4.5rem' : '',
            paddingLeft: isMobile ? '0.4rem' : '',
            textAlign: isMobile ? "center" : (isDesktop ? "center" : " "),
          }}
        >
          <img
            src={logo}
            alt="Descripción de la imagen"
            style={{
              width: isMobile ? "13rem" : (isDesktop ? "50%" : " "),
              height: 'auto',
              marginTop: "4.5rem",
              textAlign: "center"
            }}
          />
        </Box>

        <Box>

          <Container
            sx={{
              textAlign: isMobile ? 'center' : isDesktop ? 'center' : '',
              paddingTop: isMobile ? '40%' : isDesktop ? '3rem' : '0rem',
              marginLeft: isMobile ? '2px' : isDesktop ? 'center' : '',
            }}
          >
            <div>
              <Typography
                sx={{
                  color: 'black', fontWeight: 'bolder',
                  textShadow: '1px 1px 0px white',
                  textAlign: "left",
                  marginLeft: isMobile ? "8rem" : (isDesktop ? "18rem" : ""),
                  marginBottom: "-1rem"


                }}
                variant={isMobile ? 'h6' : isDesktop ? 'h6' : ''}

              >
                Deporte
              </Typography>
              <FormControl
                sx={{
                  width: isDesktop ? '50%' : '100%',
                  mt: "1rem",
                  border: 'solid',
                  borderRadius: '10px',
                  color: 'white',
                }}
              >
                <Select
                  sx={{

                    textAlign: 'left',
                    fontSize: '1.5rem',
                    border: 'solid',
                    borderRadius: '50px',
                    borderColor: 'white',
                    /*                   color: 'black',
                     */
                    /*                   background: '#ffff',
                     */

                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={deporte}
                  onChange={handleChange}
                >
                  <MenuItem value={"futbol"} sx={{ mt: "1rem" }}>
                    <span className="icon" ><SportsSoccerIcon sx={{ color: "purple", width: "2rem", }} /></span>Futbol </MenuItem>
                  <MenuItem value={"voley"}>
                    <span className="icon"><SportsVolleyballIcon sx={{ color: "purple", width: "2rem" }} /></span>Voley</MenuItem>
                  <MenuItem value={"basket"}>
                    <span className="icon"><SportsBasketballIcon sx={{ color: "purple", width: "2rem" }} /></span>Basket</MenuItem>
                  <MenuItem value={"padel"}>
                    <span className="icon"><SportsTennisIcon sx={{ color: "purple", width: "2rem" }} /></span>Padel</MenuItem>

                </Select>
              </FormControl>
            </div>

            <Box>


              <div>
                <TextField
                  sx={{
                    width: isMobile ? '100%' : isDesktop ? '50%' : '',

                    '& .MuiInputLabel-root': {
                      fontSize: isDesktop ? '20px' : isMobile ? '20px' : '',
                      color: 'black', fontWeight: 'bolder',

                    },
                    border: 'solid',
                    borderRadius: '10px',
                    color: 'white',
                  }}
                  id="filled-search"
                  label="Precio por hora"
                  type="search"
                  variant="filled"
                  value={Precio_Hora}
                  onChange={(e) => handleInputChange(e, setPrecio_Hora)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        < LocalAtmIcon sx={{ fontSize: "2rem", color: "purple", mt: "1.2rem" }} />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div>
                <Typography
                  sx={{
                    color: 'black', fontWeight: 'bolder',
                    textShadow: '1px 1px 0px white',
                    textAlign: "left",
                    marginLeft: isMobile ? "" : (isDesktop ? "18rem" : ""),

                  }}
                  variant={isMobile ? 'h6' : isDesktop ? 'h6' : ''}
                >
                  Dimensiones
                </Typography>

                <TextField
                  sx={{
                    width: isMobile ? '100%' : isDesktop ? '50%' : '',

                    '& .MuiInputLabel-root': {
                      fontSize: isDesktop ? '1.5rem' : isMobile ? '1.5rem' : '',
                      color: 'black', fontWeight: 'bolder',
                      marginTop: "-10px",
                    },
                    border: 'solid',
                    borderRadius: '10px',
                    color: 'white',
                  }}
                  id="filled-search"
                  label="Largo"
                  type="search"
                  variant="filled"
                  value={largo}
                  onChange={(e) => handleInputChange(e, setLargo)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <AddIcon sx={{ fontSize: "2rem", color: "purple", mt: "1.2rem" }} />
                      </InputAdornment>
                    )
                  }}

                />
                <TextField
                  sx={{
                    width: isMobile ? '100%' : isDesktop ? '50%' : '',


                    '& .MuiInputLabel-root': {
                      fontSize: isDesktop ? '1.5rem' : isMobile ? '1.5rem' : '',
                      color: 'black', fontWeight: 'bolder',
                    },
                    border: 'solid',
                    borderRadius: '10px',
                    color: 'white',
                  }}
                  id="filled-search"
                  label="Ancho"
                  type="search"
                  variant="filled"
                  value={ancho}
                  onChange={(e) => handleInputChange(e, setAncho)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <AddIcon sx={{ fontSize: "2rem", color: "purple", mt: "1.2rem" }} />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div>
                <Typography
                  sx={{
                    color: 'black',
                    fontWeight: 'bolder',
                    textShadow: '1px 1px 0px white',
                    textAlign: "left",
                    marginLeft: isMobile ? "" : (isDesktop ? "18rem" : ""),
                  }}
                  variant={isMobile ? 'h6' : isDesktop ? 'h6' : ''}
                >
                  Ubicación del complejo
                </Typography>


                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={handleAutocompleteSelect}
                >
                  <TextField
                    sx={{

                      width: isMobile? "100%" : "50%",
/*                       marginLeft: "",
 */                     textAlign: "center",
                      '& .MuiInputLabel-root': {
                        fontSize: isDesktop ? '20px' : isMobile ? '20px' : '',
                        color: 'black',
                        fontWeight: 'bolder',
                        
                      },
                      '& .MuiInputBase-root': {
                        width: isMobile ? "16rem" : (isDesktop ? "30rem" : ""),
                        marginRight: "25rem",
                      },
                      border: 'solid',
                      borderRadius: '10px',
                      color: 'transparent',
                    }}
                    id="filled-search"
                    label="Buscar en Google Maps"
                    type="search"
                    variant="filled"
                    value={ubicacion_Detallada}
                    placeholder="Ingrese calle y altura"
                    onChange={(e) => setUbicacion_Detallada(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment>
                          <AddLocationIcon
                            sx={{ fontSize: '2rem', mt: '1rem', color: 'purple' }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Autocomplete>


              </div>



              <div >

                <TextField
                  sx={{
                    width: isMobile ? '100%' : isDesktop ? '50%' : '',
                    borderRadius: '10px',
                    color: 'white',
                    '& .MuiInputLabel-root': {
                      fontSize: isDesktop ? '1.5rem' : isMobile ? '1.5rem' : '',
                      color: 'black', fontWeight: 'bolder',

                    },
                    '& .MuiInputBase-root': {

                      mt: "1rem",
                      mb: "1rem",


                    }


                  }}
                  id="outlined-multiline-static"
                  label="Descripción"
                  multiline
                  rows={4}
                  variant="filled"
                  value={Caracteristicas}
                  onChange={(e) => {
                    setCaracteristicas(e.target.value);
                  }}
                />

              </div>
              <Button
                sx={{
                  background: 'purple',
                  color: 'white',
                  display: isMobile ? 'block' : 'inline-block',
                  width: isMobile ? '100%' : 'auto',
                  margin: isMobile ? '1rem 0' : '0',
                  textAlign: isMobile ? 'center' : 'left',
                  mb: isMobile ? '3rem' : isDesktop ? '3rem' : '',
                  mt: isDesktop ? '1rem' : '',
                  border: 'none',
                }}
                onClick={handleSubmit}
              >
                Agregar Cancha
              </Button>

            </Box>

          </Container>
        </Box>
      </Box >
      {/*    <FooterNavigation></FooterNavigation> */}
    </div >



  );
}

