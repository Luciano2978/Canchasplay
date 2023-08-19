import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import logoCanchasPlay from "../Assets/CanchaPlayTransparent.png";

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const CenteredContentBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '3%',
});

const WhiteTextStyle = styled(Typography)(({ theme }) => ({
  color: 'black', // Cambia el color a 'white' si es necesario
  [theme.breakpoints.down('sm')]: {
    marginTop: '24%',
  },
}));

  const LogoImage = styled('img')(({ theme }) => ({
    position: 'absolute',
    top: '4%',
    left: '2%',
    width: '25%',
    height: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '55%',
      top: '-5%',
      left: '26%',
      width: '55%',
      height: '28%',
    },
  }));

  export default function HeaderUsuario() {
    return (
      <ThemeProvider theme={theme}>
        <CenteredContentBox>
          <LogoImage src={logoCanchasPlay} alt="CanchasPlay Logo" />
          <WhiteTextStyle variant="h3">
            Selecciona el Deporte que deseas Jugar
          </WhiteTextStyle>
        </CenteredContentBox>
      </ThemeProvider>
    );
  }