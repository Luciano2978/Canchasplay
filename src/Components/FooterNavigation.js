import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { HomeOutlined, AccountCircle} from '@mui/icons-material';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useState,useContext } from 'react';
import Contexto from '../Context/Context';

export default function FooterNavigation() {
  const [value, setValue] = useState(0);
  const {RouteNavigation} = useContext(Contexto)


  //Envio el valor del bottomNavigation a una funcion en el context
  if(value === 0){
    RouteNavigation("Dashboard")
  }
  if(value === 1){
    RouteNavigation("News")
  }
  if(value === 2){
    RouteNavigation("Historial")
  }

  return (
    <Box sx={{ 
        width: "100%",  
        position: "fixed",
        bottom: 0,
        
        }}>
      <BottomNavigation
        style={{
          backgroundColor: "black"
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={< HomeOutlined />}style={{color: "white"}} />
        <BottomNavigationAction label="News" icon={<ArticleOutlinedIcon />} style={{color: "white"}}/>
        <BottomNavigationAction label="Historial" icon={<HistoryOutlinedIcon />} style={{color: "white"}}/>
        <BottomNavigationAction label="Perfil" icon={<AccountCircle />} style={{color: "white"}}/>
      </BottomNavigation>
    </Box>
  );
}