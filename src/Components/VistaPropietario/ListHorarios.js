import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  TextField,
  Box,
  Checkbox,
  FormControlLabel, Paper,
  Typography,
  Button, Grid, useMediaQuery, ThemeProvider, createTheme, Table, Dialog, DialogTitle, DialogContent, DialogActions, Fab,
} from '@mui/material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useAuth0 } from '@auth0/auth0-react';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = {
  scrollbar: {
    '&::-webkit-scrollbar': {
      width: '12px', // Ancho de la barra de desplazamiento
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#75FA8D', // Color del pulgar de la barra de desplazamiento
      borderRadius: '10px', // Borde redondeado del pulgar
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'green', // Cambio de color al pasar el mouse sobre el pulgar
    },
  },
};
const breakpoints = {
  xs: '(max-width:600px)',
  sm: '(max-width:960px)',
  md: '(max-width:1280px)',
  lg: '(max-width:1920px)',
  xl: '(min-width:1920px)',
  custom: '(width:1366px) and (height:768px)',
};
const theme = createTheme({
  typography: {
    fontFamily: "Arial", // Opcional: Cambia la fuente si lo deseas
    fontWeight: "bold", // Aplica negritas a todas las instancias de Typography
  },
});
export default function ListHorario() {
  const {user} = useAuth0();
  const [datos, setDatos] = useState([]);
  const [selectedCancha, setSelectedCancha] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState([]); // Almacena los horarios seleccionados
  const [selectAll, setSelectAll] = useState(false); // Para seleccionar todos los horarios
  const [canchaId, setCanchaId] = useState(null);
  const [turno, setTurno] = useState('manana'); // 'manana' o 'tarde'
  const [horarios, setHorarios] = useState([]);
  const [horarioEdit, setHorarioEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [selectedOption, setSelectedOption] = useState('agregar'); // Estado para controlar la opción seleccionada
  const boldText = {
    fontWeight: "bold",
    fontSize: "20px",
  };
  /* const ListText = {
    fontWeight: "bold",
    fontSize: "h6",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
  }; */

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const dataToSend ={
      id_Cuenta : user.sub
    }
    axios.post('https://canchas-play.onrender.com/getCancha',dataToSend)
      .then((response) => {
        setDatos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log('Selected Cancha:', selectedCancha);
  }, [selectedCancha]);

  useEffect(() => {
    console.log('Selected Date:', selectedDate);
  }, [selectedDate]);
  const handleTurnoChange = (event) => {
    const selectedTurno = event.target.value;
    setTurno(selectedTurno);
    // Puedes reiniciar la selección de horarios al cambiar el turno si es necesario
    setSelectedHours([]);
  };
  const toggleSelectAll = () => {
    if (!selectAll) {
      let allHours = [];

      if (turno === 'manana') {
        // Seleccionar todos los horarios disponibles para el turno de la mañana
        allHours = [...Array(6)].map((_, index) => {
          return `${String((index + 8) % 24).padStart(2, '0')}:00:00`;
        });
      } else {
        // Seleccionar todos los horarios disponibles para el turno de la tarde
        allHours = [...Array(10)].map((_, index) => {
          return `${String((index + 16) % 24).padStart(2, '0')}:00:00`;
        });
      }

      setSelectedHours(allHours);
    } else {
      // Deseleccionar todos los horarios
      setSelectedHours([]);
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = () => {
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    const selectedCanchaData = datos.find((cancha) => cancha.nombre_Cancha === selectedCancha);
    const canchaId = selectedCanchaData.id_Cancha;

    selectedHours.forEach((hour) => {
      const dataToSend = {
        fecha: formattedDate,
        hora: hour,
        Cancha_id_Cancha: canchaId,
      };

      axios.post("https://canchas-play.onrender.com/createHorario", dataToSend)
        .then((response) => {
          setShowSuccessAlert(true);

          // Manejar la respuesta del servidor
        })
        .catch((error) => {
          setShowErrorAlert(true);

          console.error(error);
        });
    });

  };
  const getHorariosByCancha = async (canchaId) => {
    try {
      const response = await axios.get(`https://canchas-play.onrender.com/getHorarios/${canchaId}`);
      setHorarios(response.data); // Actualiza el estado con la lista de horarios
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const selectedCancha = event.target.value;
    setSelectedCancha(selectedCancha);
    const selectedCanchaData = datos.find((cancha) => cancha.nombre_Cancha === selectedCancha);
    if (selectedCanchaData) {
      setCanchaId(selectedCanchaData.id_Cancha);
      getHorariosByCancha(selectedCanchaData.id_Cancha); // Llama a la función para obtener los horarios

    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleHourChange = (hour) => {
    const selectedHour = hour.format('HH:mm:ss');

    if (selectedHours.includes(selectedHour)) {
      setSelectedHours(selectedHours.filter((h) => h !== selectedHour));
    } else {
      setSelectedHours([...selectedHours, selectedHour]);
    }
  };
  const handleEditClick = (horario) => {
    setHorarioEdit(horario);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteClick = (horarioId) => {
    if (window.confirm('¿Seguro que deseas eliminar este horario?')) {
      // Actualiza el estado local para eliminar el horario de inmediato
      setHorarios(horarios.filter((horario) => horario.id_Horario !== horarioId));

      // Luego, envía la solicitud DELETE al servidor
      deleteHorario(horarioId);
    }
  };
  const deleteHorario = (horarioId) => {
    axios
      .delete(`https://canchas-play.onrender.com/deleteHorario/${horarioId}`)
      .then((response) => {
        // Realiza acciones adicionales después de la eliminación, si es necesario
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEditarHorario = (e) => {
    e.preventDefault();
    // Realiza una solicitud al servidor para actualizar el horario con la ID específica (horarioEdit.id_Horario) utilizando los datos en horarioEdit.
    axios
      .put(`https://canchas-play.onrender.com/editHorario/${horarioEdit.id_Horario}`, horarioEdit)
      .then((response) => {
        // Actualiza el estado local `horarios` con los datos editados
        const newHorarios = horarios.map((horario) =>
          horario.id_Horario === horarioEdit.id_Horario ? horarioEdit : horario
        );
        setHorarios(newHorarios);

        // Cierra el modal después de guardar los cambios
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const isMobile = useMediaQuery(breakpoints.xs && breakpoints.sm);

  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        {showSuccessAlert && (
          <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
            <AlertTitle>Éxito</AlertTitle>
            ¡La cancha se ha registrado con éxito!
          </Alert>
        )}
        {showErrorAlert && (
          <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
            <AlertTitle>Error</AlertTitle>
            ¡Ocurrió un error al registrar los datos!
          </Alert>
        )}
      </Box>
  
      <Grid spacing={3} container sx={{
        backgroundColor: "#b9f6ca",
        borderRadius: '10px',
        alignItems: "left",
        justifyContent: 'left',
        width: "20%",
        ml: "1rem",
        mt: "1rem",
      }}>
  
        <Grid item xs={12} sm={6} sx={{ alignItems: "center", justifyContent: "center", }}>
          <FormControl sx={{ m: 1, width: "200%", }}>
            <Typography sx={{ color: "black", fontWeight: "bold", fontSize: "20px", mb: "0.5rem" }} >Elegir cancha</Typography>
            <Select sx={{ fontWeight: "bold", fontSize: "20px", background: "white" }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={selectedCancha}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {datos.map((data) => (
                <MenuItem
                  key={data.id_Cancha}
                  value={data.nombre_Cancha}
                >
                  {data.nombre_Cancha}
                </MenuItem>
              ))}
            </Select>
            <Typography sx={{ color: "black", fontWeight: "bold", fontSize: "20px", mb: "0.5rem" }} id="demo-multiple-turno-label">Turno</Typography>
            <Select sx={{ fontWeight: "bold", fontSize: "20px", background: "white", mb: "0.5rem" }}
              labelId="demo-multiple-turno-label"
              id="demo-multiple-turno"
              value={turno}
              onChange={handleTurnoChange}
              input={<OutlinedInput label="Turno" />}
            >
              <MenuItem value="manana"> Mañana</MenuItem>
              <MenuItem value="tarde"> Tarde</MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography sx={{ color: "black", fontWeight: "bold", fontSize: "20px", mb: "0.5rem" }} id="demo-multiple-turno-label">Fecha</Typography>
              <DatePicker sx={{ background: "white", }}
                labelId="demo-multiple-fecha-label"
                id="demo-multiple-fecha"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>
  
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}>
        <Grid
          container
          spacing={3}
          sx={{ background: "#b9f6ca", width: "50%", margin: "0 auto", borderRadius: '10px', mt: "-21.5rem", textAlign: "center", justifyContent: "center" }}
        >
          <Grid item xs={12} sm={6} sx={{ alignItems: "center", justifyContent: "center", mt: "0 auto" }}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <FormControlLabel value="agregar" control={<Radio />} label="Agregar" />
                <FormControlLabel value="listar" control={<Radio />} label="Listar" />
              </RadioGroup>
            </FormControl>
            {selectedOption === 'agregar' && (
              <div>
                <Typography
                  sx={{
                    color: 'black',
                    fontWeight: 'bolder',
                    textAlign: "left",
                  }}
                > Eliga los horarios a añadir
                </Typography>
                <FormControlLabel
                  label="Seleccionar Todos"
                  control={
                    <Checkbox
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  }
                  sx={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                />
                <Box sx={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  marginBottom: '16px',
                  ...styles.scrollbar,
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                }}>
                  {turno === 'manana'
                    ? [...Array(6)].map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '8px',
                          marginBottom: '8px',
                          fontWeight: 'bold',
                        }}
                      >
                        <Typography sx={{ flex: 1, textAlign: 'left', marginRight: '8px', fontWeight: "bolder" }}>
                          {`${String((index + 8) % 24).padStart(2, '0')}:00`}
                        </Typography>
                        <Checkbox
                          checked={selectedHours.includes(`${String((index + 8) % 24).padStart(2, '0')}:00:00`)}
                          onChange={() => handleHourChange(dayjs().hour((index + 8) % 24).minute(0).second(0))}
                          sx={{
                            '&.Mui-checked': {
                              color: 'blue',
                            },
                          }}
                        />
                      </Box>
                    ))
                    : [...Array(10)].map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '8px',
                          marginBottom: '8px',
                          fontWeight: 'bold',
                        }}
                      >
                        <Typography sx={{
                          flex: 1,
                          textAlign: 'left',
                          marginRight: '8px',
                          fontWeight: 'bolder',
                        }}>
                          {`${String((index + 16) % 24).padStart(2, '0')}:00`}
                        </Typography>
                        <Checkbox
                          checked={selectedHours.includes(`${String((index + 16) % 24).padStart(2, '0')}:00:00`)}
                          onChange={() => handleHourChange(dayjs().hour((index + 16) % 24).minute(0).second(0))}
                          sx={{
                            '&.Mui-checked': {
                              color: 'blue',
                            },
                          }}
                        />
                      </Box>
                    ))}
                </Box>
                <Button
                  sx={{
                    background: '#75FA8D',
                    color: 'white',
                    border: 'none',
                  }}
                  onClick={handleSubmit}
                >
                  Agregar Horarios
                </Button>
              </div>
            )}
            {selectedOption === "listar" && (
              <div>
                <TableContainer
                  sx={{
                    maxHeight: '400px',
                    ml: "-8rem",
                    mt: "2rem",
                    mb: "4rem",
                    textAlign: "center",
                    width: "180%"
                  }}
                  component={Paper}
                >
                  <ThemeProvider theme={theme}>
                    <Table sx={{ mb: "2rem", }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            <Typography variant="subtitle1">ID</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Typography variant="subtitle1">Fecha</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Typography variant="subtitle1">Hora</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Typography variant="subtitle1">Acciones</Typography>
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {horarios.map((horario) => (
                          <StyledTableRow key={horario.id_Horario} >
                            <StyledTableCell component="th" scope="row">
                              {horario.id_Horario}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <Typography variant="subtitle1" sx={boldText}>{horario.fecha}</Typography >
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <Typography variant="subtitle1" sx={boldText}>{horario.hora}</Typography >
                            </StyledTableCell>
                            <StyledTableCell align="right" colSpan={2}>
                              <Fab color="primary" aria-label="edit" onClick={() => handleEditClick(horario)}>
                                <EditIcon />
                              </Fab>
                              <Fab color="secondary" aria-label="delete" onClick={() => handleDeleteClick(horario.id_Horario)}>
                                <DeleteForeverTwoToneIcon />
                              </Fab>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ThemeProvider>
                </TableContainer>
              </div>
            )}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
              <DialogTitle>Editar Cancha</DialogTitle>
              <DialogContent>
                {horarioEdit && (
                  <form onSubmit={handleEditarHorario}>
                    <TextField
                      sx={{ margin: '1rem' }}
                      label="Fecha"
                      fullWidth
                      value={horarioEdit.fecha}
                      onChange={(e) =>
                        setHorarioEdit({
                          ...horarioEdit,
                          fecha: e.target.value,
                        })
                      }
                    />
                    <TextField
                      sx={{ margin: '1rem' }}
                      label="Hora"
                      fullWidth
                      value={horarioEdit.hora}
                      onChange={(e) =>
                        setHorarioEdit({
                          ...horarioEdit,
                          horario: e.target.value,
                        })
                      }
                    />
                    <DialogActions>
                      <Button type="submit" color="primary">
                        Guardar Cambios
                      </Button>
                      <Button onClick={handleCloseModal} color="primary">
                        Cerrar
                      </Button>
                    </DialogActions>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "purple",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
