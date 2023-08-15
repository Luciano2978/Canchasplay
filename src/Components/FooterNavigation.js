import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { HomeOutlined, AccountCircle} from '@mui/icons-material';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';


export default function FooterNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ 
        width: "100%",  
        position: "fixed",
        bottom: 0,
        color: "green",
        
        }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={< HomeOutlined/>} />
        <BottomNavigationAction label="Historial" icon={<HistoryOutlinedIcon />} />
        <BottomNavigationAction label="Perfil" icon={<AccountCircle />} />
      </BottomNavigation>
    </Box>
  );
}