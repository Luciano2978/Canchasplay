import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export default function DialogLogout({open, onClose}) {

    const [localOpen, setLocalOpen] = useState(false);

    useEffect(() => {
      setLocalOpen(open);
    }, [open]);
  
    const handleClose = () => {
      setLocalOpen(false);
      onClose(); // Llamar a la función onClose proporcionada por el padre
    };
  
    const { logout } = useAuth0();

    const desconectarse = () =>{
        logout({ logoutParams: { returnTo: "https://canchas-playfront.onrender.com/" } })
    }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Esta seguro que quiere desconectarse?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            No podra recibir notificaciones de las reservas pendientes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={desconectarse} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}