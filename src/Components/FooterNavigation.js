import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const images = [
    {
      url: 'https://static.vecteezy.com/system/resources/previews/010/366/317/non_2x/cartoon-basketball-court-vector.jpg',
      title: 'Agregar Cancha',
      width: '25%',
    },
    {
      url: 'https://los40xalapa.com/wp-content/uploads/2020/04/grupo-modelo-cerveza_crop1586034287646.jpg_423682103-1024x1024.jpg',
      title: 'Productos',
      width: '25%',
    },
    {
      url: 'https://cdn-icons-png.flaticon.com/512/2808/2808667.png',
      title: 'Reservas',
      width: '25%',
    },
    {
      url: 'https://yca.org.ar/wp-content/uploads/sites/4/2019/06/perfil-avatar-hombre-icono-redondo_24640-14044.jpg',
      title: 'Perfil',
      width: '25%',
    }
  ];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
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
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function FooterPropietario() {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center', // Para centrar horizontalmente
        flexWrap: 'wrap',
        flexDirection: "initial",
        minWidth: 300,
        width: '100%',
        position : "absolute",
        bottom: 0,
      }}>
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: '100%', // Usamos el 100% para que ocupe todo el ancho disponible
              maxWidth: 400, // Define un ancho máximo para las imágenes (ajusta según tus necesidades)
              margin: '10px', // Añade un margen entre las imágenes
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
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
  );
}
