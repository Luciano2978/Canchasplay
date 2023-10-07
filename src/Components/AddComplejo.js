
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
    Box, Container, Typography, TextField, Button, Grid,
    useMediaQuery, Paper, FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import { useJsApiLoader, Autocomplete, } from '@react-google-maps/api';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';




const AddComplejo = () => {
    const [ubicacion_Detallada, setUbicacion_Detallada] = useState("");
    const [latitud, setLatitud] = useState("");
    const [longitud, setLongitud] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [complexName, setComplexName] = useState('');

    const autocompleteRef = useRef();


    const handleComplexNameChange = (event) => {
        setComplexName(event.target.value);
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

    const handleAddComplex = () => {
        // Aquí puedes enviar los datos del complejo a tu backend o realizar cualquier otra acción necesaria
        axios
            .post("http://localhost:8080/createCancha", {
                ubicacion_Detallada: ubicacion_Detallada,
                latitud: latitud,
                longitud: longitud,

                /* archivo : archivo, */
            })
            .then(() => {
                setShowSuccessAlert(true);
            })
            .catch((error) => {
                console.error("Error al registrar:", error);
                setShowErrorAlert(true);
            });
    }
    const googleMapsApiKey = 'AIzaSyDfzAChOLCriCs3TcLULEtD7RH75ktqmI4'

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsApiKey,
    });

    return (

        <Container maxWidth="xs" sx={{
            backgroundImage: `url(https://img.freepik.com/vector-gratis/papel-pintado-abstracto-blanco_23-2148830027.jpg?w=2000)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>
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
                        value={complexName}
                        onChange={handleComplexNameChange}
                    />

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
                            onClick={handleAddComplex}
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
