
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
    Box, Container, Typography, TextField, Button, Grid,
    useMediaQuery, Paper, FormControl, InputLabel, MenuItem, Select, Fab
} from '@mui/material';
import { useJsApiLoader, Autocomplete, } from '@react-google-maps/api';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AddIcon from '@mui/icons-material/Add';
import { useAuth0 } from '@auth0/auth0-react';


const AddComplejo = () => {
    const [ubicacion_Detallada, setUbicacion_Detallada] = useState("");
    const [latitud, setLatitud] = useState("");
    const [longitud, setLongitud] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [nombre_Lugar, setNombre_Lugar] = useState('');
    const autocompleteRef = useRef();
    const [file, setFile] = useState(null)
    const {user} = useAuth0();
    const selectedHandler = e => {
        setFile(e.target.files[0])
        setShowSuccessAlert(true);

      }
      
    
    const handlenombre_LugarChange = (event) => {
        console.log(nombre_Lugar)
        setNombre_Lugar(event.target.value);
    };

    const handleAutocompleteSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry && place.formatted_address) {
            const { lat, lng } = place.geometry.location;
            setLatitud(lat);
            setLongitud(lng);
            setUbicacion_Detallada(place.formatted_address);
            console.log(latitud)
            console.log(longitud)
        }
    };

    const sendHandler = () => {
        if(!file){
          alert('you must upload file')

          return
        }


        
        const formdata = new FormData()
        formdata.append('id_Cuenta', user.sub)
        formdata.append('nombre_Lugar', nombre_Lugar)
        formdata.append('logo_Complejo', file)
        formdata.append('latitud', latitud)
        formdata.append('longitud', longitud)
        formdata.append('ubicacion_Detallada', ubicacion_Detallada)


    
        axios.post('https://canchas-play.onrender.com/images/post', formdata)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
        
    
    
/*         document.getElementById('fileinput').value = null
 */    
        setFile(null)
      }
      
    const googleMapsApiKey = 'AIzaSyDfzAChOLCriCs3TcLULEtD7RH75ktqmI4'

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsApiKey,
    });

    return (

        <Container maxWidth="xl2" sx={{
          
        }}>
            <Box sx={{ textAlign: "center" }}>
                {showSuccessAlert && (
                    <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
                        <AlertTitle>Éxito</AlertTitle>

                        ¡El logo se ha registrado con éxito!
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
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                    justifyContent: 'center',

                }}
            >
                <Paper elevation={3} sx={{ padding: '2rem', maxWidth: '100%' }}>
                    <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                        Agregar Complejo
                    </Typography>
                    <TextField
                        label="Nombre del Complejo"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={nombre_Lugar}
                        onChange={handlenombre_LugarChange}
                    />
                    <Box>
                        <label htmlFor="upload-photo">
                            <input
                                style={{ display: 'none', color: "purple" }}
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
                                <AddIcon /> Cargar logo
                            </Fab>

                        </label>
                    </Box>
                    <div>
                        <Typography


                        >
                            Ubicación del complejo
                        </Typography>


                        <Autocomplete
                            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                            onPlaceChanged={handleAutocompleteSelect}
                        >
                            <TextField

                                id="filled-search"
                                label="Buscar en Google Maps"
                                type="search"
                                variant="filled"
                                value={ubicacion_Detallada}
                                placeholder="Ingrese calle y altura"
                                onChange={(e) => setUbicacion_Detallada(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AddLocationIcon
                                                sx={{ fontSize: '2rem', mt: '1rem', color: 'purple' }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Autocomplete>


                    </div>


                    <Link to="/HomePropietario" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: '1rem' }}
                            onClick={sendHandler}
                        >
                            Agregar Complejo
                        </Button>
                    </Link>
                </Paper>
            </Box>
        </Container>
    );
};

export default AddComplejo;
