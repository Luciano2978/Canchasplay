import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { HomeOutlined, AccountCircle} from '@mui/icons-material';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { green } from '@mui/material/colors';

//import { Navigate } from "react-router-dom";


export default function FooterNavigation() {
  const [value, setValue] = React.useState(0);
  const color = green[300];


    /*
  if (value === 0) return <Navigate to="/home" />
  if(value === 1){
    console.log("Historial")
  }
  if(value === 2){
    console.log("perfil")
  } */

  return (
    <Box sx={{ 
        width: "100%",  
        position: "fixed",
        bottom: 0,
        
        }}>
      <BottomNavigation
        style={{
          backgroundColor: "transparent"
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={< HomeOutlined />}style={{color: "white"}} />
        <BottomNavigationAction label="Historial" icon={<HistoryOutlinedIcon />} style={{color: "white"}}/>
        <BottomNavigationAction label="Perfil" icon={<AccountCircle />} style={{color: "white"}}/>
      </BottomNavigation>
    </Box>
  );
}