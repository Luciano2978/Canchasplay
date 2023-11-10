
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Divider, Tooltip, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import DialogCalificacion from './DialogCalificacion';


export default function HistorialReservas(){

    const { user } = useAuth0();
    
    const [DataReservas,setDataMiReservas] = useState([]);

    useEffect(() => {
        axios.post("https://canchas-play.onrender.com/getReservas",{email:user.email})
        .then((response) =>{
        setDataMiReservas(response.data)
        })
        .catch((error) => {
        console.log(error)
        })
    },[])

    //Coments

    const [idComplejo, setIdComplejo] = useState(0);
    const [showAddComent, setShowAddComent] = React.useState(false);

    const CrearComentario = (idComp) => {
        setIdComplejo(idComp)
        setShowAddComent(true);
    }

    const handleCloseDialogAddComent = () => {
      setShowAddComent(false)
    }


return(
    <>

    
    <List sx={{ width: '100%'}}>

      <Divider></Divider>
      {DataReservas.map((dataReservas) => (
        dataReservas.estado_Reserva === 0?    
      <ListItem key={dataReservas.id_Reserva}>
        <ListItemAvatar color='success'>
          <Avatar  >
            <CheckCircleIcon />
          </Avatar>
        </ListItemAvatar>
        
        <ListItemText>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Complejo:</Typography>
                <Typography variant="body2">{dataReservas.nombre_Lugar}</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Cancha Reservada:</Typography>
                <Typography variant="body2">{dataReservas.cancha_Reservada}</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Fecha Reservada: </Typography>
                <Typography variant="body2"> {dataReservas.fecha_Reservada} - {dataReservas.hora_Reservada}hs</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Forma de Pago:</Typography>
                <Typography variant="body2">{dataReservas.metodo_Pago === "Efectivo" ? `${dataReservas.metodo_Pago} (Se abonara en el Complejo)` : `${dataReservas.metodo_Pago} (Ya Abonado)`} </Typography>
            </div>
            <Tooltip title="Deja tu Comentario :)" arrow >
              <IconButton sx={{position:"absolute",top:0,right:0}} onClick={() => CrearComentario(dataReservas.Complejo_id_Complejo)} aria-label="fingerprint" color="success">
                <CommentIcon />
              </IconButton>
            </Tooltip>
          <Divider></Divider>
        </ListItemText>
      </ListItem>
        : null    
    ))}
    </List>
    <DialogCalificacion
        open={showAddComent}
        onClose={handleCloseDialogAddComent}
        idComplej={idComplejo}
    />




    </>
)

}