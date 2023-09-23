import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, IconButton, ListItem, ListItemText, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CalendarioUI from './CalendarioUI';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import React, { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import Contexto from '../../Context/Context';
import DialogInfoCancha from './DialogInfoCancha';
import DialogMetodoPago from './DialogMetodoPago';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const canchas = [
  {
    id_Cancha: 1,
    NombreCancha: "Cancha 1",
    NombreDeport: "Futbol5",
  },
  {
    id_Cancha: 2,
    NombreCancha: "Cancha 2",
    NombreDeport: "Padel",
  },
  {
    id_Cancha: 3,
    NombreCancha: "Cancha 3",
    NombreDeport: "Futbol5",
  },
];


const reservas = [
  {
    id_Horario: 1,
    Fecha: "2023-09-25",
    Hora: "10:00",
    fk_Id_Cancha: 1,
  },
  {
    id_Horario: 2,
    Fecha: "2023-09-25",
    Hora: "11:00",
    fk_Id_Cancha: 1,
  },
  {
    id_Horario: 3,
    Fecha: "2023-09-21",
    Hora: "09:00",
    fk_Id_Cancha: 2,
  },
  {
    id_Horario: 4,
    Fecha: "2023-09-22",
    Hora: "02:00",
    fk_Id_Cancha: 3,
  },
];


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AccordionCanchas({open,onClose,NombreCancha}){


  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [localOpen, setLocalOpen] = React.useState(false);

  useEffect(() => {
    setLocalOpen(open);
  }, [open]);

  const handleClose = () => {
    setLocalOpen(false);
    onClose(); // Llamar a la función onClose proporcionada por el padre
  };

  const {dia,mes,año,fecha} = useContext(Contexto)

  //info canchas
  const [showInfoDialog, setShowInfoDialog] = useState(false);
   
  const handleOpenDialogInfoCanchas = useCallback(() =>{
    setShowInfoDialog(true);
  },[])
  const handleCloseDialogInfoCanchas = useCallback(() =>{
    setShowInfoDialog(false);
  },[])

  //
  //Dialog MetodoPago
  const [showMetodoDialog, setShowMetodoDialog] = useState(false);
  const [horarioSeleccionado,setHorarioSeleccionado] = useState();
  const [fechaSeleccionada,setFechaSeleccionado] = useState();

  const handleOpenMetodoDialog = (HorarioSelec,Fecha) => {
    setHorarioSeleccionado(HorarioSelec);
    setFechaSeleccionado(Fecha);
    setShowMetodoDialog(true);
  };

  const handleCloseMetodoDialog = () => {
    setShowMetodoDialog(false);
  };

  //


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
              {NombreCancha}
            </Typography>
          </Toolbar>
        </AppBar>
        <CalendarioUI></CalendarioUI>
        {canchas.map((cancha,i) => (
        <Accordion key={i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i}bh-content`}
            id={`panel${i}bh-header`}
          >
             <div onClick={(e) => e.stopPropagation()}>
              <Fab color="primary" onClick={() => handleOpenDialogInfoCanchas()} sx={{ backgroundColor: "black", marginRight: 1 }} aria-label="edit" size='small'>
                <InfoRoundedIcon />
              </Fab>
            </div>
            <Typography sx={{fontSize:"1.5rem", flexShrink: 0 }}>{cancha.NombreCancha}</Typography>
            <Typography sx={{margin:1,color:"green"}}> - {cancha.NombreDeport}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider/>
              {reservas
                .filter((reserva) => reserva.fk_Id_Cancha === cancha.id_Cancha)
                .map((reserva, i) => (
                  fecha == reserva.Fecha ?
                <>
                <ListItem button key={i} onClick={() => handleOpenMetodoDialog(reserva.Hora,reserva.Fecha)}>
                    <ListItemText
                      primary={reserva.Hora}
                      secondary="Turno Disponible"
                    />
                </ListItem>
                <Divider/>
                </>
                : null
              ))}              
          </AccordionDetails>
        </Accordion>
        ))}
        </Dialog>
        <DialogInfoCancha
          open={showInfoDialog}
          onClose={handleCloseDialogInfoCanchas}
        />
        <DialogMetodoPago
          open={showMetodoDialog}
          onClose={handleCloseMetodoDialog}
          HorarioSelec={horarioSeleccionado}
          FechaSelecc={fechaSeleccionada}
        />
        
      </div>
    );
}