import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import Box from '@mui/material/Box';
import { Avatar, Divider, FormControlLabel, ListItem, ListItemAvatar, ListItemText, Radio, RadioGroup } from '@mui/material';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function DialogMetodoPago({ open, onClose}) {

    const [localOpen, setLocalOpen] = React.useState(false);

  React.useEffect(() => {
    setLocalOpen(open);
  }, [open]);

  const handleClose = () => {
    setLocalOpen(false);
    onClose(); // Llamar a la función onClose proporcionada por el padre
  };

  const [value, setValue] = React.useState('female');

  const [selectedValue, setSelectedValue] = React.useState('');


  const handleChange = (event) => {
    setValue(event.target.value);
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
                futbol5
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Fab color="secondary" aria-label="edit">
                <CalendarMonthRoundedIcon />
              </Fab>
              <Typography variant="caption" color="textSecondary">
                27/08
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Fab color="secondary" aria-label="edit">
                <WatchLaterRoundedIcon />
              </Fab>
              <Typography variant="caption" color="textSecondary">
                12:00
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
                <ListItemAvatar>   
                  <LocalAtmRoundedIcon/>
                </ListItemAvatar>
                <ListItemText
                  primary="Efectivo"
                  secondary="Pagaras en la cancha una vez finalizado el horario"
                />
                <FormControlLabel value="Efectivo" control={<Radio />}/>
            </ListItem>
            
            <Divider />
            <ListItem>  
                <Box display="flex" flexDirection="column" alignItems="center">
                  <FormControlLabel
                    value="MercadoPago"
                    control={
                      <Radio
                        icon={<AccountBalanceRoundedIcon />}
                        checkedIcon={<AccountBalanceRoundedIcon  sx={{backgroundColor: "pink"[800],'&.Mui-checked': {backgroundColor: "pink"[600],},}}
                         />}
                        value="MercadoPago"
                        checked={selectedValue === 'MercadoPago'}
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
          {/* <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Reservar Horario
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
