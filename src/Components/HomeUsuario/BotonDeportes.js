import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
// import Atropos component
import Atropos from 'atropos/react';
import "../../Assets/css/atropos.css";
import 'atropos/css' 


const images = [
  {
    url: 'https://e1.pxfuel.com/desktop-wallpaper/482/213/desktop-wallpaper-lionel-messi.jpg',
    title: 'Futbol 5',
    width: '40%',
  },
  {
    url: 'https://www.elindependiente.com.ar/elindependiente/1.0/img/281523132.jpg',
    title: 'Voley',
    width: '40%',
  },
  {
    url: 'https://www.clarin.com/img/2023/06/15/1RvszVBvt_2000x1500__1.jpg',
    title: 'Padel',
    width: '40%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 250,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 150,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
  borderRadius: "5%"
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  borderRadius: "5%"
  
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
  borderRadius: "5%"
}));

const ResponsiveAtropos = styled(Atropos)(({ theme }) => ({
  // Estilos base para Atropos...
  width: '40%', // Estilo base para la web

  [theme.breakpoints.down('sm')]: {
    width: '80%', // Estilo para dispositivos móviles o pantallas pequeñas
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: '80%', // Estilo para dispositivos como iPads en modo horizontal
  },
}));

export default function BotonDeportes() {
  return (
    <div>
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minWidth: 300, 
      width: '100%' 
      }}>
      
      
      {images.map((image) => (
        <ResponsiveAtropos
        className='atropos-custom-responsive'
        style={{
          marginBottom: '16px',
        }}
      >
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: "100%",

          }}
        >

          
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          

          <ImageBackdrop className="MuiImageBackdrop-root" />
          
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}
              </Typography>
            </Image>
        </ImageButton>
        </ResponsiveAtropos>
      ))}
      
    </Box>
    </div>
  );
}
