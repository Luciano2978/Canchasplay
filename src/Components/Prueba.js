import * as React from 'react';
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
        <Box sx={{ p: 3 }}>
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

export default function BasicTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < theme.breakpoints.values.sm);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  React.useEffect(() => {
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

  return (
    <Grid container>
      <Grid item xs={12}>
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
            </Select>
          </Hidden>
        ) : (
          <Hidden xsDown>
            {/* Muestra los tabs en pantallas más grandes */}
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                aria-label="full width tabs example"
              >
                <Tab icon={<AddCircleTwoToneIcon />} label="Añadir Cancha" {...a11yProps(0)} />
                <Tab icon={<InventoryTwoToneIcon />} label="Mis Canchas" {...a11yProps(1)} />
                <Tab icon={<AutoStoriesTwoToneIcon />} label="Ver Reservas" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
          </Hidden>
        )}
      </Grid>
      <Grid item xs={12}>
        <SwipeableViews
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
        </SwipeableViews>
      </Grid>
    </Grid>
  );
}
