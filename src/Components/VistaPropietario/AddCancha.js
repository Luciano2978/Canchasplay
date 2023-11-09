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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useAuth0 } from '@auth0/auth0-react';


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
  const {user} = useAuth0();

  const selectedHandler = e => {
    setFile(e.target.files[0])
    setShowSuccessAlert(true);

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
    formdata.append('id_Cuenta', user.sub)
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

            ¡El dato se ha registrado con éxito!
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
        elevation={0}
        sx={{
          padding: '10px',
          maxHeight: '100%',
          backgroundColor: 'transparent', // Fondo transparente

        }}
      >
        {isMobile ? (
          <Container
            sx={{
              textAlign: isMobile ? 'center' : isDesktop ? 'center' : '',
              paddingTop: isMobile ? '40%' : isDesktop ? '3rem' : '0rem',
              marginLeft: isMobile ? '2px' : isDesktop ? 'center' : '',
              background: "#b9f6ca",
              mt:"-5rem"
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
                  background: ""

                }}
              >
                <Select
                  sx={{
                    bgcolor: "white",

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
                    <span className="icon" ><SportsSoccerIcon sx={{ color: "black", width: "2rem", }} /></span>Futbol </MenuItem>
                  <MenuItem value={"voley"}>
                    <span className="icon"><SportsVolleyballIcon sx={{ color: "black", width: "2rem" }} /></span>Voley</MenuItem>
                  <MenuItem value={"basket"}>
                    <span className="icon"><SportsBasketballIcon sx={{ color: "black", width: "2rem" }} /></span>Basket</MenuItem>
                  <MenuItem value={"padel"}>
                    <span className="icon"><SportsTennisIcon sx={{ color: "black", width: "2rem" }} /></span>Padel</MenuItem>

                </Select>
              </FormControl>
            </div>

            <Box>
              <div>
                <TextField
                  sx={{
                    bgcolor: "white",

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
                    bgcolor: "white",

                    width: isMobile ? '100%' : isDesktop ? '50%' : '',

                    '& .MuiInputLabel-root': {
                      fontSize: isDesktop ? '20px' : isMobile ? '20px' : '',
                      color: 'black', fontWeight: 'bolder',

                    },
                    '& .MuiInputBase-root': {
                      fontSize: '20px',
                      color: 'black', fontWeight: 'bolder',
                      mt: "0.5rem"

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
                        < LocalAtmIcon sx={{ fontSize: "1.5rem", color: "black", mt: "0.5rem" }} />

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
                    bgcolor: "white",

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
                        <AddIcon sx={{ fontSize: "1.5rem", color: "black", mb: "1.2rem", mt: "1rem" }} />
                      </InputAdornment>
                    )
                  }}

                />
                <TextField
                  sx={{
                    bgcolor: "white",
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
                  label="Ancho"
                  type="search"
                  variant="filled"
                  value={ancho}
                  onChange={(e) => handleInputChange(e, setAncho)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AddIcon sx={{ fontSize: "1.5rem", color: "black", mb: "1.2rem", mt: "1rem" }} />
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
                      bgcolor: "white",

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
                      style={{ display: 'none', color: "white" }}
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
                  <Button variant='contained'
                    sx={{
                      background: 'white',
                      color: 'black',
                      textAlign: 'center',
                      mb: '3rem',
                      border: 'none',
                      boxShadow: "5px 5px 5px grey",
                      mt: "3.5rem",
                    }}
                    onClick={handleSubmit}
                  >
                    Agregar Cancha
                  </Button>

                </Box>

              </div>

            </Box>

          </Container>
        ) : (
          <div>
            <Grid container spacing={3} sx={{
              backgroundColor: "#b9f6ca", width: "50%", margin: "0 auto", mt: "5rem", borderRadius: '10px',

            }}>
              <Grid item xs={12} sm={6} sx={{ alignItems: "center", justifyContent: "center", mt: "0 auto" }}>
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: 'black',
                      fontWeight: 'bolder',
                      textShadow: '1px 1px 0px white',
                      textAlign: "left",
                      mb: "1rem"
                    }}
                    variant={'h6'}
                  >
                    Seleccione el deporte
                  </Typography>
                  <Select
                    sx={{
                      bgcolor: "white",
                      textAlign: 'left',
                      fontSize: '1.5rem',
                      border: 'solid',
                      borderRadius: '50px',
                      borderColor: 'black',
                      mb: "1rem"
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={deporte}
                    onChange={handleChange}
                  >
                    <MenuItem value={"futbol"} sx={{ mt: "1rem" }}>
                      <span className="icon" ><SportsSoccerIcon sx={{ color: "black", width: "2rem", }} /></span>Futbol </MenuItem>
                    <MenuItem value={"voley"}>
                      <span className="icon"><SportsVolleyballIcon sx={{ color: "black", width: "2rem" }} /></span>Voley</MenuItem>
                    <MenuItem value={"basket"}>
                      <span className="icon"><SportsBasketballIcon sx={{ color: "black", width: "2rem" }} /></span>Basket</MenuItem>
                    <MenuItem value={"padel"}>
                      <span className="icon"><SportsTennisIcon sx={{ color: "black", width: "2rem" }} /></span>Padel</MenuItem>

                  </Select>

                  <TextField
                    sx={{

                      '& .MuiInputBase-input': {
                        fontSize: '20px',
                        color: 'black', fontWeight: 'bold',

                      },
                      background: "#FFFFFF",
                      border: 'solid',
                      borderRadius: '10px',
                      borderColor: 'black',
                      mb: "1rem",
                      fontWeight:"bold"
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
                      bgcolor: "white",
                      '& .MuiInputLabel-root': {
                        fontSize: '20px',
                        color: 'black', fontWeight: 'bolder',

                      },
                      '& .MuiInputBase-root': {
                        fontSize: '20px',
                        color: 'black', fontWeight: 'bolder',
                        mt: "0.5rem"

                      },
                      border: 'solid',
                      borderRadius: '10px',
                      color: 'black',
                      mb: "1rem"
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
                          < LocalAtmIcon sx={{ fontSize: "1.5rem", color: "black", mt: "0.2rem" }} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <label htmlFor="upload-photo"  >
                    <input style={{ display: 'none', color: "white", mt: "1.5rem" }}
                      id="upload-photo"
                      name="upload-photo"
                      accept="image/*"
                      type="file"
                      onChange={selectedHandler}
                    />

                    <Fab sx={{ mt: "1rem", width: "50%", textAlign: "center", justifyContent: "center", ml: "5.5rem" }}
                      color="secondary"
                      size="small"
                      component="span"
                      aria-label="add"
                      variant="extended"
                    >
                      <AddIcon /> Cargar fotos
                    </Fab>

                  </label>
                </FormControl>


              </Grid>


              <Grid item xs={12} sm={6} sx={{
                alignItems: "center", justifyContent: "center",
              }} >
                <FormControl sx={{
                  width: "100%",

                }}>
                  <Typography
                    sx={{
                      color: 'black',
                      fontWeight: 'bolder',
                      textShadow: '1px 1px 0px white',
                      textAlign: "left",
                      mb: "1rem"

                    }}
                    variant={"h6"}
                  >
                    Dimensiones
                  </Typography>

                  <TextField
                    sx={{
                      bgcolor: "white",
                      '& .MuiInputLabel-root': {
                        fontSize: "1.5rem",
                        color: 'black', fontWeight: 'bolder',
                        marginTop: "-10px",
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '20px',
                        color: 'black', fontWeight: 'bold',

                      },
                      width: "90%",
                      border: 'solid',
                      borderRadius: '10px',
                      color: 'black',
                      mb: "1rem",



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
                          <AddIcon sx={{ fontSize: "1.5rem", color: "black", mb: "1.2rem", mt: "1rem" }} />
                        </InputAdornment>
                      )
                    }}

                  />
                  <TextField
                    sx={{
                      bgcolor: "white",
                      '& .MuiInputLabel-root': {
                        fontSize: "1.5rem",
                        color: 'black', fontWeight: 'bolder',
                        marginTop: "-10px",


                      },
                      '& .MuiInputBase-input': {
                        fontSize: '20px',
                        color: 'black', fontWeight: 'bold',

                      },
                      border: 'solid',
                      borderRadius: '10px',
                      color: 'black',
                      width: "90%",
                      mb: "1rem"

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
                          <AddIcon sx={{ fontSize: "1.5rem", color: "black", mb: "1.2rem", mt: "1rem" }} />
                        </InputAdornment>
                      )
                    }}
                  />


                  <TextField
                    sx={{
                      borderRadius: '16px',
                      borderColor: 'black',
                      width: "90%",
                      '& .MuiInputLabel-root': {
                        fontSize: '1.5rem',
                        color: 'black', fontWeight: 'bolder',
                      },
                      '& .MuiInputBase-root': {
                        bgcolor: "white",
                      }, '& .MuiInputBase-input': {
                        fontSize: '20px',
                        color: 'black', fontWeight: 'bold',

                      }, mb: "1rem"
                    }}
                    id="outlined-multiline-static"
                    label="Descripción"
                    multiline
                    rows={4}
                    defaultValue=""
                    value={Caracteristicas}
                    onChange={(e) => {
                      setCaracteristicas(e.target.value);
                    }}
                  />



                </FormControl>

              </Grid>

              <Button variant='contained'
                sx={{
                  background: 'white',
                  color: 'black',
                  textAlign: 'center',
                  mb: '3rem',
                  border: 'none',
                  ml: "40%",
                  boxShadow: "5px 5px 5px grey",
                  mt: "3.5rem",
                }}
                onClick={handleSubmit}
              >
                Agregar Cancha
              </Button>

            </Grid>

          </div>


        )}

      </Box>
    </div >



  );
}

