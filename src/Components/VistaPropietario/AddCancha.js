import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  Box, Container, useMediaQuery, Button, Paper, TextField,
  Select, MenuItem, InputLabel, FormControl, Fab,
  createTheme, ThemeProvider, AppBar, Toolbar, Grid, BottomNavigationAction, BottomNavigation
} from '@mui/material';
import Typography from '@mui/material/Typography';
/* import FooterNavigation from './FooterNavigation';
 */import axios from 'axios';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import InputAdornment from '@mui/material/InputAdornment';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import AddIcon from '@mui/icons-material/Add';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import background from '../../Assets/def.png'
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
  const [precio_Hora, setPrecio_Hora] = useState("");
  const [largo, setLargo] = useState("");
  const [ancho, setAncho] = useState("");
  const [nombre_Cancha, setNombre_Cancha] = useState("");
  const [file, setFile] = useState(null)
  const dimensionesConcatenadas = `${largo} x ${ancho}`;
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const selectedHandler = e => {
    setFile(e.target.files[0])
  }
  const handleInputChange = (e, setStateFunction) => {
    const input = e.target.value;

    // Usamos una expresión regular para validar si la entrada es un número.
    if (/^\d*\.?\d*$/.test(input)) {
      setStateFunction(input);
    }
  };

/*   const urlad = "http://localhost:9000/api";
 */  const handleSubmit = (event) => {

    if (
      deporte.trim() === '' ||
      Caracteristicas.trim() === '' ||
      precio_Hora.trim() === '' ||
      largo.trim() === '' ||
      ancho.trim() === ''

    ) {
      setShowErrorAlert(true);
      return; // No enviar la solicitud si falta alguno de los campos requeridos
    }
    const formdata = new FormData()
    formdata.append('deporte', deporte)
    formdata.append('Caracteristicas', Caracteristicas)
    formdata.append('precio_Hora', precio_Hora)
    formdata.append('info_Dimensiones', dimensionesConcatenadas)
    formdata.append('nombre_Cancha', nombre_Cancha)
    formdata.append('img_Cancha', file)
    // Enviar la solicitud POST
    axios
      .post("http://localhost:8080/createCancha", formdata)
      .then(() => {
        setShowSuccessAlert(true);
        // Restablecer los campos después del éxito si es necesario
        setDeporte('');
        setCaracteristicas('');
        setPrecio_Hora('');
        setLargo('');
        setAncho('');
        // Restablecer otros estados si es necesario
      })
      .catch((error) => {
        console.error("Error al registrar:", error);
        setShowErrorAlert(true);
      });

  };

  useEffect(() => {
    console.log(deporte);
  }, [deporte]);

  const handleChange = (e) => {
    setDeporte(e.target.value);
  };






  const isMobile = useMediaQuery(breakpoints.xs && breakpoints.sm);
  const isDesktop = useMediaQuery(breakpoints.md && breakpoints.lg);


  return (

    <div >

      <Box sx={{ textAlign: "center" }}>
        {showSuccessAlert && (
          <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
            <AlertTitle>Éxito</AlertTitle>

            ¡La cancha se ha registrado con éxito!
          </Alert>
        )}
        {showErrorAlert && (
          <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
            <AlertTitle>Error</AlertTitle>
            ¡Ocurrió un error al registrar los datos!
          </Alert>
        )}
      </Box>

      <Box
        component={Paper}
        elevation={4}
        sx={{
          padding: '10px',
          mt: '0', // Elimina el margen superior en dispositivos móviles
          marginRight: isMobile ? 'auto' : isDesktop ? '5%' : '', // Centra en dispositivos móviles
          marginLeft: isDesktop ? '0' : "0",
          ml: isMobile ? '-2rem' : '-2rem',
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Ajusta la imagen al tamaño del contenedor sin distorsionarla

          width: isDesktop ? "110%" : (isMobile ? "24rem" : "")

        }}
      >




        {isMobile ? (
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
                  marginLeft: isMobile ? "5rem" : (isDesktop ? "18rem" : ""),
                  marginBottom: "-1rem"


                }}
                variant={isMobile ? 'h6' : isDesktop ? 'h6' : ''}

              >
                Eliga el deporte
              </Typography>
              <FormControl
                sx={{
                  width: isMobile ? '100%' : "50%",
                  mt: "1rem",
                  border: 'solid',
                  borderRadius: '10px',
                  color: 'white',

                }}
              >
                <Select
                  sx={{
                    bgcolor: "#75FA8D",

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
                    <span className="icon" ><SportsSoccerIcon sx={{ color: "#75FA8D", width: "2rem", }} /></span>Futbol </MenuItem>
                  <MenuItem value={"voley"}>
                    <span className="icon"><SportsVolleyballIcon sx={{ color: "#75FA8D", width: "2rem" }} /></span>Voley</MenuItem>
                  <MenuItem value={"basket"}>
                    <span className="icon"><SportsBasketballIcon sx={{ color: "#75FA8D", width: "2rem" }} /></span>Basket</MenuItem>
                  <MenuItem value={"padel"}>
                    <span className="icon"><SportsTennisIcon sx={{ color: "#75FA8D", width: "2rem" }} /></span>Padel</MenuItem>

                </Select>
              </FormControl>
            </div>

            <Box>
              <div>
                <TextField
                  sx={{
                    bgcolor: "#75FA8D",

                    width: isMobile ? '100%' : isDesktop ? '50%' : '',
                    '& .MuiInputLabel-root': {
                      fontSize: isDesktop ? '20px' : isMobile ? '20px' : '',
                      color: 'black', fontWeight: 'bolder',

                    },
                    border: 'solid',
                    borderRadius: '10px',
                    color: 'white',
                    marginTop: "1.5rem",
                  }}
                  id="filled-search"
                  label="Nombre de la cancha"
                  type="search"
                  variant="filled"
                  value={nombre_Cancha}
                  onChange={(e) => setNombre_Cancha(e.target.value)}

                />
              </div>

              <div>
                <TextField
                  sx={{
                    bgcolor: "#75FA8D",

                    width: isMobile ? '100%' : isDesktop ? '50%' : '',

                    '& .MuiInputLabel-root': {
                      fontSize: isDesktop ? '20px' : isMobile ? '20px' : '',
                      color: 'black', fontWeight: 'bolder',

                    },
                    border: 'solid',
                    borderRadius: '10px',
                    color: 'white',
                    marginTop: "1.5rem",
                  }}
                  id="filled-search"
                  label="Precio por hora"
                  type="search"
                  variant="filled"
                  value={precio_Hora}
                  onChange={(e) => setPrecio_Hora(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        < LocalAtmIcon sx={{ fontSize: "2rem", color: "#75FA8D", mt: "1rem" }} />
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
                    bgcolor: "#75FA8D",

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
                      <InputAdornment position='start'>
                        <AddIcon sx={{ fontSize: "2rem", color: "#75FA8D", mt: "1.2rem" }} />
                      </InputAdornment>
                    )
                  }}

                />
                <TextField
                  sx={{
                    bgcolor: "#75FA8D",

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
                      <InputAdornment position='start'>
                        <AddIcon sx={{ fontSize: "2rem", color: "#75FA8D", mt: "1.2rem" }} />
                      </InputAdornment>
                    )
                  }}
                />
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
                      bgcolor: "#75FA8D",

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
                <Box>
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: 'none', color: "#75FA8D" }}
                      id="upload-photo"
                      name="upload-photo"
                      accept="image/*"
                      type="file"
                      onChange={selectedHandler}
                    />

                    <Fab
                      color="secondary"
                      size="small"
                      component="span"
                      aria-label="add"
                      variant="extended"
                    >
                      <AddIcon /> Cargar fotos
                    </Fab>

                  </label>
                </Box>

              </div>
              <Button
                sx={{
                  background: '#75FA8D',
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
        ) : (
          <div>
              <Grid container spacing={3} sx={{mt:"10rem", ml:"10rem"}}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{
                      color: 'black', fontWeight: 'bolder',
                      textShadow: '1px 1px 0px white',
                      textAlign: "left",
                      marginLeft: isMobile ? "5rem" : (isDesktop ? "" : ""),
                      marginBottom: "-1rem"


                    }}
                    variant={isMobile ? 'h6' : isDesktop ? 'h6' : ''}

                  >
                    Eliga el deporte
                  </Typography>
                  <FormControl
                    sx={{
                      width: isMobile ? '100%' : "50%",
                      mt: "1rem",
                      border: 'solid',
                      borderRadius: '10px',
                      color: 'white',

                    }}
                  >
                    <Select
                      sx={{
                        bgcolor: "#75FA8D",

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
                        <span className="icon" ><SportsSoccerIcon sx={{ color: "#75FA8D", width: "2rem", }} /></span>Futbol </MenuItem>
                      <MenuItem value={"voley"}>
                        <span className="icon"><SportsVolleyballIcon sx={{ color: "#75FA8D", width: "2rem" }} /></span>Voley</MenuItem>
                      <MenuItem value={"basket"}>
                        <span className="icon"><SportsBasketballIcon sx={{ color: "#75FA8D", width: "2rem" }} /></span>Basket</MenuItem>
                      <MenuItem value={"padel"}>
                        <span className="icon"><SportsTennisIcon sx={{ color: "#75FA8D", width: "2rem" }} /></span>Padel</MenuItem>

                    </Select>
                  </FormControl>

                  <Box>

                    <TextField
                      sx={{
                        bgcolor: "#75FA8D",

                        width: isMobile ? '100%' : isDesktop ? '50%' : '',
                        '& .MuiInputLabel-root': {
                          fontSize: isDesktop ? '20px' : isMobile ? '20px' : '',
                          color: 'black', fontWeight: 'bolder',

                        },
                        border: 'solid',
                        borderRadius: '10px',
                        color: 'white',
                        marginTop: "1.5rem",
                      }}
                      id="filled-search"
                      label="Nombre de la cancha"
                      type="search"
                      variant="filled"
                      value={nombre_Cancha}
                      onChange={(e) => setNombre_Cancha(e.target.value)}

                    />

                    <TextField
                      sx={{
                        bgcolor: "#75FA8D",

                        width: isMobile ? '100%' : isDesktop ? '50%' : '',

                        '& .MuiInputLabel-root': {
                          fontSize: isDesktop ? '20px' : isMobile ? '20px' : '',
                          color: 'black', fontWeight: 'bolder',

                        },
                        border: 'solid',
                        borderRadius: '10px',
                        color: 'white',
                        marginTop: "1.5rem",
                      }}
                      id="filled-search"
                      label="Precio por hora"
                      type="search"
                      variant="filled"
                      value={precio_Hora}
                      onChange={(e) => setPrecio_Hora(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            < LocalAtmIcon sx={{ fontSize: "2rem", color: "black", mt: "1rem" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            
              <Grid container spacing={3} sx={{ml: "60rem", mt: "-20rem",}}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{

                      color: 'black', fontWeight: 'bolder',
                      textShadow: '1px 1px 0px white',
                      textAlign: "left",
                      marginLeft: isMobile ? "" : (isDesktop ? "" : ""),

                    }}
                    variant={isMobile ? 'h6' : isDesktop ? 'h6' : ''}
                  >
                    Dimensiones
                  </Typography>

                  <TextField
                    sx={{
                      bgcolor: "#75FA8D",

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
                        <InputAdornment position='start'>
                          <AddIcon sx={{ fontSize: "2rem", color: "black", mt: "1.2rem" }} />
                        </InputAdornment>
                      )
                    }}

                  />
                  <TextField
                    sx={{
                      bgcolor: "#75FA8D",

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
                        <InputAdornment position='start'>
                          <AddIcon sx={{ fontSize: "2rem", color: "black", mt: "1.2rem" }} />
                        </InputAdornment>
                      )
                    }}
                  />


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
                        bgcolor: "#75FA8D",

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
                  <Box>
                    <label htmlFor="upload-photo">
                      <input
                        style={{ display: 'none', color: "#75FA8D" }}
                        id="upload-photo"
                        name="upload-photo"
                        accept="image/*"
                        type="file"
                        onChange={selectedHandler}
                      />

                      <Fab
                        color="secondary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                      >
                        <AddIcon /> Cargar fotos
                      </Fab>

                    </label>
                  </Box>
                  <Button
                    sx={{
                      background: '#75FA8D',
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
                </Grid>

              </Grid>

            </div>


        )}

      </Box>

      {/*    <FooterNavigation></FooterNavigation> */}
    </div >



  );
}

