import React, { useState, useEffect } from 'react'
import { useJsApiLoader, Marker, GoogleMap } from '@react-google-maps/api';
import { Box } from '@mui/material';
import axios from 'axios';

const center = {
    lat: -33.8688,
    lng: 151.2093,
};

const containerStyle = {
    width: '400px',
    height: '300px',
};



function MaPrueba() {
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [markerPosition, setMarkerPosition] = useState (null);
    const urlad = "http://localhost/services/obtenerUbicacion.php";
    useEffect(() => {
        axios.get(urlad, { responseType: 'json' })
            .then(response => {
                const { lat, lng } = response.data;
                const parsedLat = parseFloat(lat);
                const parsedLng = parseFloat(lng);
    
                if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
                    setMarkerPosition({ lat: parsedLat, lng: parsedLng });
                } else {
                    console.error("Invalid lat or lng values received from the server.");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    console.log(markerPosition)


    const googleMapsApiKey = 'AIzaSyDfzAChOLCriCs3TcLULEtD7RH75ktqmI4'

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsApiKey,
    });

    return (
        <div>
            <Box>
                {isLoaded ? (
                    <GoogleMap mapContainerStyle={containerStyle} center={markerPosition} zoom={5}>
                        { markerPosition && <Marker position={markerPosition} />}
                    </GoogleMap>
                ) : (
                    <div>Cargando Mapa...</div>
                )}
            </Box>
        </div>
    )
}

export default MaPrueba;