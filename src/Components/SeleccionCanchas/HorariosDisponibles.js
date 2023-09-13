import * as React from 'react';
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
import Contexto from '../../Context/Context';
import DialogMetodoPago from './DialogMetodoPago';
import CalendarioUI from './CalendarioUI';


    

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HorariosDisponibles({ nombreCancha, open, onClose,nombreDeporte}) {

  const [localOpen, setLocalOpen] = React.useState(false);

  React.useEffect(() => {
    setLocalOpen(open);
  }, [open]);

  const handleClose = () => {
    setLocalOpen(false);
    onClose(); // Llamar a la función onClose proporcionada por el padre
  };

  //console.log(estadoDisplay,nombreCancha)

  //lo que tendria que recibir del propietario,desde la sql digamos
  const HorariosDisponibles = 
  [
    {"id":1,"nombreCanchas":"La Nueva Recova 2","Horario":"21:00","Dia":15,"Mes":9,"Año":2023,"estado":true},
    {"id":2,"nombreCanchas":"Centro","Horario":"22:00","Dia":1,"Mes":9,"Año":2023,"estado":true},
    {"id":3,"nombreCanchas":"Juancito Futbol5","Horario":"23:00","Dia":1,"Mes":9,"Año":2023,"estado":true},
    {"id":4,"nombreCanchas":"La Nueva Recova 2","Horario":"00:00","Dia":15,"Mes":9,"Año":2023,"estado":true},
    {"id":5,"nombreCanchas":"La Nueva Recova 2","Horario":"10:00","Dia":16,"Mes":9,"Año":2023,"estado":true},
    {"id":6,"nombreCanchas":"Centro","Horario":"11:00","Dia":27,"Mes":8,"Año":2023,"estado":true},
    {"id":7,"nombreCanchas":"Centro","Horario":"14:00","Dia":27,"Mes":8,"Año":2023,"estado":true},
    {"id":8,"nombreCanchas":"Juancito Futbol5","Horario":"11:00","Dia":28,"Mes":8,"Año":2023,"estado":true},
    {"id":9,"nombreCanchas":"Centro","Horario":"20:00","Dia":28,"Mes":8,"Año":2023,"estado":true},
    {"id":10,"nombreCanchas":"La Nueva Recova 2","Horario":"21:00","Dia":28,"Mes":8,"Año":2023,"estado":true},
    {"id":11,"nombreCanchas":"Centro","Horario":"22:00","Dia":28,"Mes":8,"Año":2023,"estado":true},

  ]

 
  const {dia,mes,año} = React.useContext(Contexto)



  //fin fecha



  const [showHorariosDialog, setShowHorariosDialog] = React.useState(false);
  const [horarioSeleccionado,setHorarioSeleccionado] = React.useState();
  const [diaSeleccionado,setDiaSeleccionado] = React.useState();
  const [mesSeleccionado,setMesSeleccionado] = React.useState();
  const [añoSeleccionado,setAñoSeleccionado] = React.useState();

  //otra cosa
  const handleOpenHorariosDialog = (HorarioSelec,DiaSele,MesSelec,AñoSelec) => {
    setHorarioSeleccionado(HorarioSelec);
    setDiaSeleccionado(DiaSele);
    setMesSeleccionado(MesSelec);
    setAñoSeleccionado(AñoSelec);
    setShowHorariosDialog(true);
  };

  const handleCloseHorariosDialog = () => {
      setShowHorariosDialog(false);
  };
  return (
    
    <div>
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative',backgroundColor:"black"}}>
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
        <List>
          <ListItem >
            <CalendarioUI></CalendarioUI>
          </ListItem>
          <Divider />
          {HorariosDisponibles.map((DataHorarios) => (    
            dia == DataHorarios.Dia && mes == DataHorarios.Mes && año == DataHorarios.Año && DataHorarios.nombreCanchas == nombreCancha  && (
            <>
              <ListItem button key={DataHorarios.id} onClick={() => handleOpenHorariosDialog(DataHorarios.Horario,DataHorarios.Dia,DataHorarios.Mes,DataHorarios.Año)}>
                
                <ListItemText
                  primary={DataHorarios.Horario}
                  secondary="Turno Disponible"
                />
              </ListItem>
              <Divider />
            </>
            )
            ))}   
        </List>
      </Dialog>
      <DialogMetodoPago
          open={showHorariosDialog}
          onClose={handleCloseHorariosDialog}
          HorarioSelec={horarioSeleccionado}
          DiaSelec={diaSeleccionado}
          MesSelec={mesSeleccionado}
          AñoSelec={añoSeleccionado}
          nombreDeporte={nombreDeporte}
        />
    </div>
  );
}