import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Box, Container, useMediaQuery, Button, Paper, TextField, Select, MenuItem, InputLabel, FormControl, createTheme, ThemeProvider, AppBar, Toolbar, Grid, BottomNavigationAction, BottomNavigation } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useJsApiLoader, Autocomplete, } from '@react-google-maps/api';
import FooterNavigation from './FooterNavigation';
import axios from 'axios';
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



const breakpoints = {
  xs: '(max-width:600px)',
  sm: '(max-width:960px)',
  md: '(max-width:1280px)',
  lg: '(max-width:1920px)',
  xl: '(min-width:1920px)',
  custom: '(width:1366px) and (height:768px)',
};




export default function AddCancha() {
  const [tipoCancha, setTipoCancha] = useState("futbol");
  const [descripcion, setDescripcion] = useState("");
  const [precioHora, setPrecioHora] = useState("");
  const [largo, setLargo] = useState("");
  const [ancho, setAncho] = useState("");
  const [value, setValue] = useState(0);

  const [ubicacion, setUbicacion] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [location, setLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const autocompleteRef = useRef();

  const urlad = "http://localhost/services/agregardata.php";
  const handleSubmit = (event) => {
    event.preventDefault();
    // Crear un objeto con los datos a enviar
    const dataToSend = {
      tipoCancha: tipoCancha,
      descripcion: descripcion,
      precioHora: precioHora,
      largo: largo,
      ancho: ancho,
      ubicacion: ubicacion,
      lat: lat, // Asegúrate de que las claves coincidan con los nombres de los campos en el servidor
      lng: lng,
    };

    // Enviar la solicitud POST
    axios.post(urlad, dataToSend)
      .then((response) => {
        console.log(response.data); // Si la petición es exitosa, muestra la respuesta del servidor
      })
      .catch((error) => {
        console.error(error); // Si la petición falla, muestra el error en la consola
      });
  };

  useEffect(() => {
    console.log(tipoCancha);
  }, [tipoCancha]);

  const handleChange = (e) => {
    setTipoCancha(e.target.value);
  };

  /*  const handleAutocompleteSelect = () => {
    if (autocompleteRef.current) {
      const selectedPlace = autocompleteRef.current.getPlace();
      if (selectedPlace.geometry && selectedPlace.geometry.location) {
        const { lat, lng } = selectedPlace.geometry.location;
        const newMarkerPosition = { lat: lat(), lng: lng() }; // Aquí obtén las coordenadas
 
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
      const { lat, lng } = place.geometry.location;
      setLat(lat);
      setLng(lng);
      setUbicacion(place.formatted_address);
      console.log(lat)
      console.log(lng)
    }
  };
  /*  const handleAutocompleteSelect = () => {
    if (autocompleteRef.current){
      const selectedPlace = autocompleteRef.current.getPlace();}
      if (selectedPlace.geometry && selectedPlace.geometry.location) {
        const { lat, lng } = selectedPlace.geometry.location;
        setMarkerPosition({ lat: lat, lng: lng });
        setUbicacion(selectedPlace.formatted_address);
        console.log(markerPosition)
        console.log(location)
  }
} */


  const googleMapsApiKey = 'AIzaSyDfzAChOLCriCs3TcLULEtD7RH75ktqmI4'

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
  });

  const isMobile = useMediaQuery(breakpoints.xs && breakpoints.sm);
  const isTablet = useMediaQuery(breakpoints.sm);
  const isDesktop = useMediaQuery(breakpoints.md && breakpoints.lg);


  return (

    <div >
      <Box
        component={Paper}
        elevation={4}
        sx={{
          padding: '10px',
          mt: isMobile ? '-15rem' : "",
          marginRight: isMobile ? '10px' : isDesktop ? '5%' : '',
          marginLeft: isDesktop ? '0' : isMobile ? '-10px' : '',
          width: '100%',
          pt: isDesktop ? '13rem' : '13rem',
          paddingBottom: isDesktop ?  '13rem' : "",
          backgroundImage: `url(${img})`,
          textAlign: "center"

        }}
      >
        <Box
          sx={{
            marginLeft: isMobile ? '4.5rem' : isDesktop ? '' : '',
            position: isMobile?  "relative" : "" || isDesktop ? 'absolute' : '',
            marginTop: isDesktop ? '-5rem' : isMobile ? '4.5rem' : '',
            paddingLeft: isMobile ? '0.4rem' : '',
            textAlign : isMobile? "left" : "center"
          }}
        >
          <img
            src={logo}
            alt="Descripción de la imagen"
            style={{
              width: isMobile ? "13rem" : (isDesktop ? "50%" : " "),
              height: 'auto',
              marginTop: "4.5rem"
            }}
          />
        </Box>

        <Box>
          <Container
            sx={{
              textAlign: isMobile ? 'center' : isDesktop ? '' : '',
              paddingTop: isMobile ? '40%' : isDesktop ? '3rem' : '0rem',
              marginLeft: isMobile ? '2px' : isDesktop ? 'center' : '',
            }}
          >
            <Typography
              sx={{
                color: isMobile ? 'purple' : isDesktop ? 'black' : '',
                marginBottom: '2rem',
                fontWeight: 'bolder',
                textShadow: '1px 1px 0px white',
              }}
              variant={isMobile ? 'h3' : isDesktop ? 'h3' : 'h2'}
            >
              Elegir Tipo de Cancha
            </Typography>
            <FormControl
              sx={{
                width: isDesktop ? '50%' : '100%',
                background: '#ffff',
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
                  color: 'black',
                  
                  background: '#ffff',
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipoCancha}
                onChange={handleChange}>
                <MenuItem value={"futbol"} sx={{mt: "1rem"}}>
                  <span  className="icon" ><SportsSoccerIcon sx={{color : "purple" , width: "2rem",}}/></span>Futbol </MenuItem>
                <MenuItem value={"voley"}>
                  <span className="icon"><SportsVolleyballIcon sx={{color : "purple" ,width: "2rem"}} /></span>Voley</MenuItem>
                <MenuItem value={"basket"}>
                  <span className="icon"><SportsBasketballIcon sx={{color : "purple",  width: "2rem"}} /></span>Basket</MenuItem>
                <MenuItem value={"padel"}>
                  <span className="icon"><SportsTennisIcon sx={{color : "purple",  width: "2rem"}}/></span>Padel</MenuItem>

              </Select>
            </FormControl>
            <Box>
              <div >
                
                  <TextField
                    sx={{
                      width: isMobile ? '100%' : isDesktop ? '50%' : '', 
                      borderRadius: '10px',
                      color: 'white',
                      '& .MuiInputLabel-root': {
                        fontSize: isDesktop ? '1.5rem' : isMobile ? '1.5rem' : '',
                        color: 'black',
                      },
                      '& .MuiInputBase-root' : {
                        background : "white",
                        mt: "1rem",
                        mb: "1rem",
                        
                        
                      }

                     
                    }}
                    id="outlined-multiline-static"
                    label="Características adicionales"
                    multiline
                    rows={4}
                    variant="filled"
                    value={descripcion}
                    onChange={(e) => {
                      setDescripcion(e.target.value);
                    }}
                  />
                
              </div>

              <div>
                <TextField
                  sx={{
                    width: isMobile ? '100%' : isDesktop ? '50%' : '', '& .MuiInputLabel-root': {
                      color: 'black', fontSize: '1rem',
                    },
                    '& input': {
                      background: '#ffff',
                    },
                    '& .MuiInputBase-root': {
                      background: "white"
                    },
                    border: 'solid',
                    borderRadius: '10px',
                    color: 'white',
                  }}
                  id="filled-search"
                  label="Precio por hora"
                  type="search"
                  variant="filled"
                  value={precioHora}
                  onChange={(e) => {
                    setPrecioHora(e.target.value);
                  }}
                  InputProps={{
                    startAdornment:(
                      <InputAdornment>
                        < LocalAtmIcon sx={{ fontSize: "2rem",  color : "purple", mt: "1rem"}} />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div>
                <Typography
                  sx={{
                    color: 'black', fontWeight: 'bolder', textShadow: '1px 1px 0px white',
                  }}
                  variant={isMobile ? 'h5' : isDesktop ? 'h4' : ''}
                >
                  Dimensiones
                </Typography>

                <TextField
                   sx={{
                    width: isMobile ? '100%' : isDesktop ? '50%' : '', '& .MuiInputLabel-root': {
                      color: 'black', fontSize: '1rem',
                    },
                    '& input': {
                      background: '#ffff',
                    },
                    '& .MuiInputBase-root': {
                      background: "white"
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
                  onChange={(e) => {
                    setLargo(e.target.value);
                    console.log('dimensiones:', e.target.value);
                  }}
                  InputProps={{
                    startAdornment:(
                      <InputAdornment>
                        <AddIcon sx={{ fontSize: "2rem",  color : "purple", mt: "1rem"}} />
                      </InputAdornment>
                    )
                  }}

                />
                <TextField
                  sx={{
                    width: isMobile ? '100%' : isDesktop ? '50%' : '', '& .MuiInputLabel-root': {
                      color: 'black', fontSize: '1rem',
                    },
                    '& input': {
                      background: '#ffff',
                    },
                    '& .MuiInputBase-root': {
                      background: "white"
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
                  onChange={(e) => {
                    setAncho(e.target.value);
                    
                  }}
                  InputProps={{
                    startAdornment:(
                      <InputAdornment>
                        <AddIcon sx={{ fontSize: "2rem",  color : "purple", mt: "1rem"}} />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <Typography
                sx={{
                  color: 'black',
                  fontWeight: 'bolder',
                  textShadow: '1px 1px 0px white',
                }}
                variant={isMobile ? 'h5' : isDesktop ? 'h4' : ''}
              >
                Ubicación del complejo
              </Typography>
              {isLoaded && (
                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={handleAutocompleteSelect}
                >
                  <TextField
                    sx={{
                      width: isMobile ? '100%' : isDesktop ? '20%' : '',
                      width: isMobile ? '100%' : isDesktop ? '50%' : '',
                      '& .MuiInputLabel-root': {
                        color: 'black',
                        fontSize: '1rem',
                      },
                      '& input': {
                        background: '#ffff',
                      },
                      '& .MuiInputBase-root': {
                        background : "white",

                      },
                      border: 'solid',
                      borderRadius: '10px',
                      color: 'white',
                    }}
                    id="filled-search"
                    label="Agregue su ubicación exacta"
                    type="search"
                    variant="filled"
                    value={ubicacion}
                    placeholder='Ingrese calle y altura'
                    onChange={(e) => setUbicacion(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment>
                          <AddLocationIcon sx={{fontSize : "2rem", mt : "1rem", color : "purple"}}/>
                        </InputAdornment>


                      ),
                    }}

                  />




                </Autocomplete>
              )}
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
      <FooterNavigation></FooterNavigation>
    </div >



  );
}

