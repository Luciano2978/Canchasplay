import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NotificationImportantRoundedIcon from '@mui/icons-material/NotificationImportantRounded';
import { Divider, Typography } from '@mui/material';

export default function ListInfoReserva() {
  return (
    <List sx={{ width: '100%'}}>
      <Divider></Divider>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{backgroundColor:"green"}}>
            <NotificationImportantRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        
        <ListItemText>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Complejo:</Typography>
                <Typography variant="body2">La Recova</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Cancha Reservada:</Typography>
                <Typography variant="body2">Cancha 3</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Fecha Reservada: </Typography>
                <Typography variant="body2"> 06/09/2023 - 21:00hs</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Forma de Pago:</Typography>
                <Typography variant="body2">Efectivo(Se abonara en el Complejo)</Typography>
            </div>
        </ListItemText>            
      </ListItem>
      
      <Divider></Divider>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{backgroundColor:"green"}}>
            <NotificationImportantRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        
        <ListItemText>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Complejo:</Typography>
                <Typography variant="body2">La Recova</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Cancha Reservada:</Typography>
                <Typography variant="body2">Cancha 3</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Fecha Reservada: </Typography>
                <Typography variant="body2"> 06/09/2023 - 21:00hs</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Forma de Pago:</Typography>
                <Typography variant="body2">Efectivo(Se abonara en el Complejo)</Typography>
            </div>
        </ListItemText>            
      </ListItem>
      
      <Divider></Divider>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{backgroundColor:"green"}}>
            <NotificationImportantRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        
        <ListItemText>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Complejo:</Typography>
                <Typography variant="body2">La Recova</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Cancha Reservada:</Typography>
                <Typography variant="body2">Cancha 3</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Fecha Reservada: </Typography>
                <Typography variant="body2"> 06/09/2023 - 21:00hs</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" >Forma de Pago:</Typography>
                <Typography variant="body2">Efectivo(Se abonara en el Complejo)</Typography>
            </div>
        </ListItemText>            
      </ListItem>
      
      <Divider></Divider>
    </List>
  );
}
