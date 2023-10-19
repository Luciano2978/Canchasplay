import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import { Box, Divider, Input, Rating } from '@mui/material';
import axios from 'axios';

const ariaLabel = { 'aria-label': 'description' };


export default function DialogCalificacion({open,onClose,idComplej}) {


  const [open, setOpen] = useState(false);

  const [valueRating, setValueRating] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const enviarComentario = () => {

    axios.post("/postComentarios",{
        titulo: "",
        texto_Comentario: "",
        calificacion: valueRating,
        complejo_Id: "",
    })
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
            width: 300,
            maxWidth: '100%',

        }}
        >
        <DialogTitle >Deja tu Opinion</DialogTitle>
        <Divider></Divider>
        <Input sx={{margin:2,width:"90%"}} placeholder="Titulo" inputProps={ariaLabel} />
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            label="Comentario"
            multiline
            rows={4}
            />
        </DialogContent>

        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={enviarComentario}>Enviar</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}