import * as React from 'react';
import { useState } from 'react';
import { Select, selectClasses } from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import { Popper } from '@mui/base/Popper';
import { styled } from '@mui/system';
import { Box, Container, useMediaQuery, Button, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';



const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} ref={ref} slots={slots} />;
});
const breakpoints = {
  xs: '(max-width:600px)',
  sm: '(max-width:960px)',
  md: '(max-width:1280px)',
  lg: '(max-width:1920px)',
  xl: '(min-width:1920px)',
};
const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

export default function AddCancha() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDfzAChOLCriCs3TcLULEtD7RH75ktqmI4',
  });
  const isMobile = useMediaQuery(breakpoints.sm);
  const isDesktop = useMediaQuery(breakpoints.xl);
  
 

  return (
    <div>
      <Container sx={{ textAlign: "center", paddingTop: isMobile ? '40%' : (isDesktop ? '2%' : '10%'), position: "absolute", paddingLeft: isMobile ? '2px' : "2px", }}>
        <CustomSelect defaultValue={10}>
          <StyledOption value={10}>Futbol</StyledOption>
          <StyledOption value={20}>Voley</StyledOption>
          <StyledOption value={30}>Padel</StyledOption>
          <StyledOption value={40}>Baloncesto</StyledOption>
        </CustomSelect>
      </Container>
      <Box sx={{ color: "#155146", textAlign: "center", marginTop: isMobile ? '20px' : '40px' }}>
        <Typography variant={isMobile ? "h3" : "h2"}>Canchas Play</Typography>

      </Box>
      <Box sx={{ color: "#155146", textAlign: "left", marginTop: isMobile ? '40px' : '70px', mt: isDesktop ? '10%' : '10%', marginLeft: isDesktop ? '20%' : '10%' }}>
        <Typography variant={isMobile ? "h5" : "h5"}>Agregar cancha</Typography>
      </Box>
      <Box sx={{ color: "#155146", textAlign: "left", marginTop: isMobile ? '30%' : (isDesktop ? '5%' : '10%'), marginLeft: isDesktop ? '20%' : '10%' }}>
        <Typography variant={isMobile ? "h5" : "h5"}>Agregar Ubicación</Typography>
       
      </Box>
      <Box component={Paper} elevation={3} sx={{ padding: '20px' }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <div>Cargando Mapa...</div>
        )}
      </Box>
    </div>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 320px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &.${selectClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  `,
);

const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;