import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import React, { forwardRef, useEffect, useState } from 'react';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Rating } from '@mui/material';
import axios from 'axios';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function SlideDialogComentarios({open,onClose,nombreCancha,idComplejo}) {


    const [localOpen, setLocalOpen] = useState(false);
    

    const [datosComentarios,setDatosComentarios] = React.useState([]);

    useEffect(() => {
       setLocalOpen(open);
       const dataToSend = {
          idCom: idComplejo
        };
        axios.post("https://canchas-play.onrender.com/getComentarios",dataToSend)
        .then((response ) => {
          setDatosComentarios(response.data)
        })
        .catch((error) =>{
            console.log("Error " + error);
        })
    }, [open]);
  
    const handleClose = () => {
      setLocalOpen(false);
      onClose(); // Llamar a la función onClose proporcionada por el padre
    };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
            style: {
            position: 'absolute', // Posición absoluta para que no afecte al flujo normal
            margin: 0, // Colocarlo en la parte superior
            left: 0, // Colocarlo en el margen izquierdo
            height: '100%', // Ocupar todo el alto
            width: '70%', // Ocupar la mitad del ancho
            backgroundColor: '#fff', // Color de fondo del sidebar
            },
        }}
        >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {nombreCancha}
            </Typography>
          </Toolbar>
        </AppBar>
        {datosComentarios.map((dataComen,i) => (  
          
          <List sx={{ width: '100%', bgcolor: 'background.paper' }} key={i}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Anonimo" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={dataComen.titulo}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Anonimo
                    </Typography>
                    {" - " + dataComen.texto_Comentario}
                    {" - " + dataComen.fecha_Hora || "/"}
                  </>
                }
              />
            </ListItem>
            <Rating name="read-only" value={dataComen.calificacion} readOnly sx={{left: "70px",marginTop:"-10px",fontSize:"1.2rem"}} />

          <Divider />
        </List>
      ))}

      </Dialog>
    </div>
  );
}