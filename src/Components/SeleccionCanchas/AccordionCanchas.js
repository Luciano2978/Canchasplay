import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, IconButton, ListItem, ListItemText, Toolbar } from '@mui/material';
import Fab from '@mui/material/Fab';
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
import axios from 'axios';



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AccordionCanchas({open,onClose,NombreCancha,idComplejo}){


  const [expanded, setExpanded] = useState(false);
  const [datosHorarios,setDatosHorarios] = useState([]);

  const handleChange = (panel,idCan) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    const dataToSend = {
      idCancha: idCan
    };
    axios.post("https://canchas-play.onrender.com/getDataHorarios",dataToSend)
      .then((response ) => {
        setDatosHorarios(response.data);
      })
      .catch((error) =>{
          console.log("Error " + error);
    })
  };
  const [localOpen, setLocalOpen] = useState(false);
  
  const dataToSend = {
    idCom: idComplejo
  };

  const [datosCanchas,setDatosCanchas] = useState([]);

  useEffect(() => {
    setLocalOpen(open);
    axios.post("https://canchas-play.onrender.com/getDataCanchas",dataToSend)
      .then((response ) => {
        setDatosCanchas(response.data);
      })
      .catch((error) =>{
          console.log("Error " + error);
      })
  }, [open]);

  const handleClose = () => {
    setLocalOpen(false);
    onClose(); // Llamar a la función onClose proporcionada por el padre
  };

  const {fecha} = useContext(Contexto)
  const [precioHora,setPrecioHora] = useState(0);

  //info canchas
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [infoDimensiones,setInfoDimensiones] = useState("");
  const [carateristicas,setCaracteristicas] = useState("");
  const [imgCancha,setImgCancha] = useState("");
  const handleOpenDialogInfoCanchas = useCallback((info_Dimensiones,Caracteristicas,precioHora,img_Cancha) =>{
    setPrecioHora(precioHora)
    setInfoDimensiones(info_Dimensiones)
    setCaracteristicas(Caracteristicas)
    setShowInfoDialog(true);
    setImgCancha(img_Cancha)

  },[])
  const handleCloseDialogInfoCanchas = useCallback(() =>{
    setShowInfoDialog(false);
  },[])

  //
  //Dialog MetodoPago
  const [showMetodoDialog, setShowMetodoDialog] = useState(false);
  const [horarioSeleccionado,setHorarioSeleccionado] = useState();
  const [fechaSeleccionada,setFechaSeleccionado] = useState();
  const [deporteSeleccionado,setDeporteSeleccionado] = useState("");
  const [idComplejoSelecc,setIdComplejoSelecc] = useState(0);
  const [idCanchaSelecc,setIdCanchaSelecc] = useState(0);
  const [idHorario,setIdHorario] = useState(0)

  const handleOpenMetodoDialog = (idHorario,HorarioSelec,Fecha,precioHora,deporte,idCancha) => {
    setIdHorario(idHorario)
    setHorarioSeleccionado(HorarioSelec);
    setFechaSeleccionado(Fecha);
    setPrecioHora(precioHora)
    setDeporteSeleccionado(deporte)
    setIdComplejoSelecc(idComplejo)
    setShowMetodoDialog(true);
    setIdCanchaSelecc(idCancha);
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
        {datosCanchas.map((cancha,i) => (
        <Accordion key={i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`,cancha.id_Cancha)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i}bh-content`}
            id={`panel${i}bh-header`}
          >
             <div onClick={(e) => e.stopPropagation()}>
              <Fab color="primary" onClick={() => handleOpenDialogInfoCanchas(cancha.info_Dimensiones,cancha.Caracteristicas,cancha.precio_Hora,cancha.img_Cancha)} sx={{ backgroundColor: "black", marginRight: 1 }} aria-label="edit" size='small'>
                <InfoRoundedIcon />
              </Fab>
            </div>
            <Typography sx={{fontSize:"1.5rem", flexShrink: 0 }}>{cancha.nombre_Cancha}</Typography>
            <Typography sx={{margin:1,color:"green"}}> - {cancha.deporte}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
            {datosHorarios.map((horarios,i) => (
              horarios.fecha === fecha && horarios.estado_Disponiblidad != 0?
              <div key={i}>
                <ListItem  button onClick={() => handleOpenMetodoDialog(horarios.id_Horario,horarios.hora, horarios.fecha,cancha.precio_Hora,cancha.deporte,cancha.id_Cancha)}>
                  <ListItemText primary={horarios.hora} secondary="Turno Disponible" />
                </ListItem>
                <Divider />
              </div>
              :
              null

            ))}
            </AccordionDetails>
          </Accordion>
        ))}
        </Dialog>
        <DialogInfoCancha
          open={showInfoDialog}
          onClose={handleCloseDialogInfoCanchas}
          PrecioSelecc={precioHora}
          InfoDimensiones={infoDimensiones}
          Caracteristicas={carateristicas}
          img_Cancha={imgCancha}
        />
        <DialogMetodoPago
          open={showMetodoDialog}
          onClose={handleCloseMetodoDialog}
          HorarioSelec={horarioSeleccionado}
          FechaSelecc={fechaSeleccionada}
          PrecioSelecc={precioHora}
          DeporteSelecc={deporteSeleccionado}
          idComplejo={idComplejoSelecc}
          NombreComplejo={NombreCancha}
          idCanchaSelecc={idCanchaSelecc}
          idHorario={idHorario}
        />
        
      </div>
    );
}

    