import * as React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Divider, FormControlLabel, IconButton, ListItem, ListItemAvatar, ListItemText, Radio, RadioGroup, Typography} from '@mui/material';
import { blue } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import LinearProgress from '@mui/material/LinearProgress';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },

  
}));

const customization = {
  texts: {
    action: 'pay',
    valueProp: 'security_details',
  },
  visual: {
      buttonBackground: 'black',
      borderRadius: '6px',
  },

 }
 
export default function DialogMetodoPago({open, onClose,HorarioSelec,FechaSelecc}) {

  const [localOpen, setLocalOpen] = React.useState(false);

  React.useEffect(() => {
    setLocalOpen(open);
  }, [open]);

  const handleClose = () => {
    setLocalOpen(false);
    onClose(); // Llamar a la función onClose proporcionada por el padre
  };

  const [value, setValue] = React.useState('Efectivo');
  const [initPublicKey, setInitPublicKey] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    
  };

  ///MERCADOPAGO///
  const [preferenceId, setPreferenceId] = React.useState(null);

  const dataToSend = {
    correo: "agustin@gmail.com"
  };
  
  React.useEffect(() => {
    axios.post('http://localhost:8080/get_PublicKey', dataToSend)
    .then((response) => {
      // Manejar la respuesta del servidor aquí
      console.log('Respuesta del servidor:', response.data);
      setInitPublicKey(response.data)
    })
    .catch((error) => {
      // Manejar errores aquí
      console.error('Error al enviar datos:', error);
    });
  },[])
  
      

  initMercadoPago(initPublicKey);
  const createPreference = async () => {
      try {
        const response = await axios.post("http://localhost:8080/create_preference", {
          Correo: "marto@gmail.com",
          description: "La Nueva Recova",
          price: 200,
          quantity: 1,
          currency_id:"ARS",  
        });
  
        const { id } = response.data;
        return id;
      } catch (error) {
        console.log(error);
      }
    };

  const metodoPagoReserva = async (req, res) => {
    if(value != "Efectivo"){
      const id = await createPreference();
        if (id) {
          setPreferenceId(id);
      }
    }
     
  };
  

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Detalles de Reserva
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            marginTop={1}
            gap={2}
            
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Fab color="primary" aria-label="add">
                <SportsSoccerRoundedIcon />
              </Fab>
              <Typography variant="caption" color="textSecondary">
                fubol
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Fab color="secondary" aria-label="edit">
                <CalendarMonthRoundedIcon />
              </Fab>
              <Typography variant="caption" color="textSecondary">
                {FechaSelecc}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Fab color="secondary" aria-label="edit">
                <WatchLaterRoundedIcon />
              </Fab>
              <Typography variant="caption" color="textSecondary">
                {HorarioSelec}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Fab color="secondary" aria-label="edit">
                <PaidRoundedIcon />
              </Fab>
              <Typography variant="caption" color="textSecondary">
                $ 5000
              </Typography>
            </Box>
          </Box>
          <Divider />
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            >
            <ListItem>  
                <Box display="flex" flexDirection="column" alignItems="center">
                  <FormControlLabel
                    value="MercadoPago"
                    control={
                      <Radio
                        icon={<LocalAtmRoundedIcon />}
                        checkedIcon={<LocalAtmRoundedIcon sx={{ color: blue[600] }}/>}
                        value="Efectivo"
                        onChange={handleChange}
                      />
                    }/>
                </Box>
                <ListItemText
                  primary="Efectivo"
                  secondary="Pagaras en la cancha una vez finalizado el horario"
                />
            </ListItem>
            <Divider />
            <ListItem>  
                <Box display="flex" flexDirection="column" alignItems="center">
                  <FormControlLabel
                    value="MercadoPago"
                    control={
                      <Radio
                        icon={<AccountBalanceRoundedIcon />}
                        checkedIcon={<AccountBalanceRoundedIcon sx={{ color: blue[600] }}/>}
                        value="MercadoPago"
                        onChange={handleChange}
                      />
                    }/>
                </Box>
                <ListItemText
                  primary="MercadoPago"
                  secondary="Podras Pagar anticipadamente la cancha"
                />
                
            </ListItem>
          </RadioGroup>
        </DialogContent>
        <DialogActions>
            {preferenceId && value != "Efectivo" ? <Wallet customization={customization} initialization={{ preferenceId , redirectMode: 'modal'}} />
            :
            <Button autoFocus onClick={metodoPagoReserva}>
              Reservar Horario
            </Button>}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
