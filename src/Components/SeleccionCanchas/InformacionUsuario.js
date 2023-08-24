import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImagenMia from "../../Assets/ImagenMia.jpeg";

export default function InformacionUsuario() {
  
return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: "rgba(0, 0, 0, 0)",
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar src={ImagenMia} sx={{
            width: "80px",
            height: "90px",
          }}/>
        </ListItemAvatar>
        <ListItemText primary="Luciano Rojas" secondary="Ubicacion: Formosa,Argentina" />
      </ListItem>
    </List>
  );
}