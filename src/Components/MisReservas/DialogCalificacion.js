import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import React, { useState,useEffect } from 'react';
import {Rating } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function DialogCalificacion({open,onClose,idComplej}) {
  const theme = useTheme();
  const [localOpen, setLocalOpen] = useState(false);

  const [valueRating, setValueRating] = useState(0);
  const [titulo,setTitulo] = useState("");
  const [textoComentario, setTextoComentario] = useState("");

  useEffect(() => {
    setLocalOpen(open);
  }, [open]);


  const handleClose = () => {
    setLocalOpen(false);
    onClose(); // Llamar a la función onClose proporcionada por el padre
  };


  const enviarComentario = () => {
    axios.post("https://canchas-play.onrender.com/postComentario",{
        titulo: titulo,
        texto_Comentario: textoComentario,
        calificacion: valueRating,
        complejo_Id: idComplej,
    })
    .then((response) =>{
      console.log(response);
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  const SizeDialog = ({
    position: "absolute", // Posición absoluta para que no afecte al flujo normal
    margin: 0, // Colocarlo en la parte superior
    right: 0, // Colocarlo en el margen izquierdo
    bottom: 0,
    height: "45%", // Ocupar todo el alto
    width: "20%", // Ocupar la mitad del ancho
    backgroundColor: "rgba(250, 250, 250, 1)",
    [theme.breakpoints.down('sm')]: {
        /* Estilos específicos para pantallas pequeñas */
        // Por ejemplo:
        height: "55%", // Ocupar todo el alto
        width: "70%", // Ocupar la mitad del ancho
    }
  });

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: SizeDialog
        }}
      >
        <AppBar sx={{ position: "relative", marginBottom: 2 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="body2" component="div">
              Deja Tu Opinion 😁
            </Typography>
            <Button autoFocus color="inherit" onClick={() => enviarComentario()}>
              Enviar
            </Button>
          </Toolbar>
        </AppBar>
        <TextField
          id="outlined-helperText"
          label="Titulo"
          defaultValue=" "
          color="info"
          focused
          sx={{ marginBottom: 3 }}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TextField
          id="outlined-multiline-static"
          label="Ingrese Aqui Su Comentario"
          multiline
          rows={4}
          defaultValue=" "
          color="success"
          focused
          sx={{ marginBottom: 2 }}
          onChange={(e) => setTextoComentario(e.target.value)}
        />
        <Typography variant="subtitle2" fontWeight="bold" >Elije una puntuacion </Typography>
        <Rating
          name="simple-controlled"
          value={valueRating}
          onChange={(event, newValue) => {
            setValueRating(newValue);
          }}
          size="large"
        />
      </Dialog>
    </div>
  );
}