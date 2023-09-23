import * as React from 'react';
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


export default function AccordionCanchas(){

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

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

    return (
      <div>
        <AppBar sx={{ position: 'relative',backgroundColor:"black"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              //onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Recova
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
            <Fab color="primary" sx={{backgroundColor: "black", marginRight:1}} aria-label="edit" size='small'>
                <InfoRoundedIcon />
            </Fab>
            <Typography sx={{fontSize:"1.5rem", flexShrink: 0 }}>{cancha.NombreCancha}</Typography>
            <Typography sx={{}}>{cancha.NombreCancha}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider/>
              {reservas.map((reservaHorario,i) => (
                <>
                <ListItem button key={i}>
                    <ListItemText
                      primary={reservaHorario.Hora}
                      secondary="Turno Disponible"
                    />
                </ListItem>
                <Divider/>
                </>
              ))}
              
          </AccordionDetails>
        </Accordion>
        ))}
      </div>
    );
}