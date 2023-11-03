import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import AddCancha from './AddCancha';
import ListCancha from './ListCancha';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import { Box, Grid, Hidden, Select, MenuItem } from '@mui/material';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import ListReservas from './ListReservas';
import ListHorarios from './ListHorarios';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HomePropietario from '../HomePropietario/HomePropietario';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth0 } from '@auth0/auth0-react';
import SinPermisoUi from '../SinPermisoUi';
import LogoutIcon from '@mui/icons-material/Logout';
import DialogLogout from '../DialogLogout';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, bg: "#75FA8D" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function VistaPropietario() {
  const theme = useTheme();
  const [value, setValue] = useState(0); // Estado local para el valor actual de la pestaña
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < theme.breakpoints.values.sm);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    // Detectar cambios en el tamaño de la pantalla
    function handleResize() {
      setIsMobile(window.innerWidth < theme.breakpoints.values.sm);
    }

    window.addEventListener('resize', handleResize);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme.breakpoints.values.sm]);


  //para deslogear - agregado por M1shi
  const [showDialogLogout, setshowDialogLogout] = useState(false);

  const handleOpenDialogLogout = () => {
    setshowDialogLogout(true);
  };

  const handleCloseDialogLogout = () => {
    setshowDialogLogout(false);
  };
  // fin Logout

  //Restringir usuario - agregado por M1shi
  const {user} = useAuth0();
  const rol = user.Nombre.user_metadata.rol
  if (rol === "Usuario"){
    return <SinPermisoUi></SinPermisoUi>
  } //fin

  return (
    <>
      <Grid container >
        <Grid item sx={{ bg: "#75FA8D", }} xs={12}>
          {isMobile ? (
            <Hidden smUp>
              {/* Muestra solo el menú desplegable en pantallas pequeñas */}
              <Select
                value={value}
                onChange={(event) => handleChange(event, event.target.value)}
                sx={{ width: '100%' }}
              >
                <MenuItem value={0}>
                  <AddCircleTwoToneIcon /> Añadir Cancha
                </MenuItem>
                <MenuItem value={1}>
                  <InventoryTwoToneIcon /> Mis Canchas
                </MenuItem>
                <MenuItem value={2}>
                  <AutoStoriesTwoToneIcon /> Ver Reservas
                </MenuItem>
                <MenuItem value={3}>
                  <PendingActionsIcon /> Lista Horarios
                </MenuItem>
                <MenuItem value={4}>
                  <HomeIcon /> Home
                </MenuItem>
              </Select>
            </Hidden>
          ) : (
            <Hidden xsDown>
              {/* Muestra los tabs en pantallas más grandes */}
              <AppBar position="static">
                <Tabs sx={{ bgcolor: "black" }}
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="white"
                  aria-label="full width tabs example"

                >
                  <Tab sx={{ color: "white" }} icon={<AddCircleTwoToneIcon />} label="Añadir Cancha" {...a11yProps(0)} />
                  <Tab sx={{ color: "white" }} icon={<InventoryTwoToneIcon />} label="Mis Canchas" {...a11yProps(1)} />
                  <Tab sx={{ color: "white" }} icon={<AutoStoriesTwoToneIcon />} label="Ver Reservas" {...a11yProps(2)} />
                  <Tab sx={{ color: "white" }} icon={<PendingActionsIcon />} label="Lista Horarios" {...a11yProps(3)} /> 
                  <Tab sx={{ color: "white" }} icon={<HomeIcon />} label="Home" {...a11yProps(4)} /> 
                  <Tab sx={{ color: "white" }} icon={<LogoutIcon />} label="Logout"   onClick={() => handleOpenDialogLogout()} />


                </Tabs>
              </AppBar>
            </Hidden>
          )}
        </Grid>
        <Grid item xs={12} sx={{ bg: "#75FA8D", }}>
          <SwipeableViews sx={{ bg: "#75FA8D", }}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}

          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Box sx={{ mt: '-2rem' }}>
                <AddCancha />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Box sx={{ mt: '-2rem' }}>
                <ListCancha />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <ListReservas />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <ListHorarios />
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
              <HomePropietario />
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
      <DialogLogout
      open={showDialogLogout}
      onClose={handleCloseDialogLogout}
      />
    </>
  );
}
