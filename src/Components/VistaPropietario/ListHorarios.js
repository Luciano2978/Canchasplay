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
  FormControlLabel,
  Typography,
  Button
} from '@mui/material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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

export default function ListHorario() {
  const [datos, setDatos] = useState([]);
  const [selectedCancha, setSelectedCancha] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState([]); // Almacena los horarios seleccionados
  const [selectAll, setSelectAll] = useState(false); // Para seleccionar todos los horarios
  const [canchaId, setCanchaId] = useState(null);
  const [turno, setTurno] = useState('manana'); // 'manana' o 'tarde'

  useEffect(() => {
    axios.get('http://localhost:8080/getCancha')
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

      axios.post("http://localhost:8080/createHorario", dataToSend)
        .then((response) => {
          // Manejar la respuesta del servidor
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const handleChange = (event) => {
    const selectedCancha = event.target.value;
    setSelectedCancha(selectedCancha);
    const selectedCanchaData = datos.find((cancha) => cancha.nombre_Cancha === selectedCancha);
    if (selectedCanchaData) {
      setCanchaId(selectedCanchaData.id_Cancha);
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

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}>
      <FormControl sx={{ m: 1, width: 300, background: "white" , boxShadow: "10px 5px 5px #75FA8D"}}>
        <InputLabel sx={{fontSize:"30px"}} id="demo-multiple-name-label" >Canchas</InputLabel>
        <Select sx={{ fontWeight: "bold", fontSize: "20px" }}
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
        <Typography sx={{ color: "green", fontWeight: "bold", fontSize: "20px" }} id="demo-multiple-turno-label">Turno</Typography>
        <Select
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
          <Typography sx={{ color: "green", fontWeight: "bold", fontSize: "20px" }} id="demo-multiple-turno-label">Fecha</Typography>
          <DatePicker
            labelId="demo-multiple-fecha-label"
            id="demo-multiple-fecha"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <Box sx={{
            maxHeight: '400px', // Altura máxima del contenedor, ajusta según tus necesidades
            overflowY: 'auto', // Habilita el desplazamiento vertical si es necesario
            marginBottom: '16px', // Agrega espacio inferior para separar de otros elementos
            ...styles.scrollbar, // Aplica los estilos personalizados a la barra de desplazamiento

          }}>
            <Typography
              sx={{
                color: 'green', fontWeight: 'bolder',
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
                // Aquí puedes agregar estilos personalizados para el label
                color: 'green', // Cambia el color del texto
                fontWeight: 'bold', // Cambia el grosor de la fuente

              }}
            />
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
                    {`${String((index + 8) % 24).padStart(2, '0')}:00`} {/* Usa el mismo formato que selectedHours */}
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
                    flex: 1, textAlign: 'left', marginRight: '8px', fontWeight: 'bolder',
                    // Cambia el tamaño de fuente
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
        </LocalizationProvider>

        <Button
          sx={{
            background: '#75FA8D',
            color: 'green',
            border: 'none',
          }}
          onClick={handleSubmit}
        >
          Agregar Horarios
        </Button>
      </FormControl>
    </div>
  );
}


