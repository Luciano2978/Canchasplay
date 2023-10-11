import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NotificationImportantRoundedIcon from '@mui/icons-material/NotificationImportantRounded';
import { Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

export default function ListInfoReserva() {

  const { user} = useAuth0();

  const [dataMiReservas, setDataMiReservas] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:8080/getReservas",{email:user.email})
    .then((response) =>{
      setDataMiReservas(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  },[])


  return (
    <List sx={{ width: '100%'}}>

      <Divider></Divider>
      {dataMiReservas.map((dataReservas) => (
        dataReservas.estado_Reserva === 1?      
      <ListItem key={dataReservas.id_Reserva}>
        <ListItemAvatar>
          <Avatar sx={dataReservas.metodo_Pago === "Efectivo"? {backgroundColor:"orange"} : {backgroundColor:"green"}} >
            <NotificationImportantRoundedIcon />
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
                <Typography variant="body2">{dataReservas.metodo_Pago}(Se abonara en el Complejo)</Typography>
            </div>
        </ListItemText>
        <Divider></Divider>
      </ListItem>
      : null
      
      ))}
      
    </List>
  );
}
