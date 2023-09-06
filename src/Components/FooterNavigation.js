import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { HomeOutlined, AccountCircle} from '@mui/icons-material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useState,useContext } from 'react';
import Contexto from '../Context/Context';
import LogoutIcon from '@mui/icons-material/Logout';
import DialogLogout from './DialogLogout';

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
    RouteNavigation("MisReservas")
  }  


  const [showDialogLogout, setshowDialogLogout] = useState(false);

  const handleOpenDialogLogout = () => {
    setshowDialogLogout(true);
  };

  const handleCloseDialogLogout = () => {
    setshowDialogLogout(false);
  };


  return (
    <>
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
        <BottomNavigationAction label="MisReservas" icon={<VisibilityRoundedIcon />} style={{color: "white"}}/>
        <BottomNavigationAction label="Perfil" icon={<AccountCircle />} style={{color: "white"}}/>
        <BottomNavigationAction label="Logout" icon={<LogoutIcon />} style={{color: "white"}} onClick={() => handleOpenDialogLogout()} />
      </BottomNavigation>
    </Box>

    <DialogLogout
        open={showDialogLogout}
        onClose={handleCloseDialogLogout}
      />
    </>
  );
}