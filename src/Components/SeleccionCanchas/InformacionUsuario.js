import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImagenMia from "../../Assets/ImagenMia.jpeg";
import { useAuth0 } from "@auth0/auth0-react";

export default function InformacionUsuario() {
  const { user} = useAuth0();
  const [metadata] = React.useState([user.Nombre.user_metadata])


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
          <Avatar sx={{
            width: "80px",
            height: "90px",
          }}/>
        </ListItemAvatar>
        { metadata.map((dato,index) => (
          <div key={index}>
           <ListItemText primary={dato.Nombre + " " + dato.Apellido} secondary={dato.dni} />
          </div>
        ))}
        
      </ListItem>
    </List>
  );
}