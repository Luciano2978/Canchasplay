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
import background from '../../Assets/def.png'

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
      // Seleccionar todos los horarios disponibles
      const allHours = Array.from({ length: 12 }, (_, i) => `${(i + 16) % 24}:00:00`);
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
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${background})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <FormControl sx={{ m: 1, width: 300, }}>
        <InputLabel id="demo-multiple-name-label" >Canchas</InputLabel>
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
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-turno-label">Turno</InputLabel>
        <Select
          labelId="demo-multiple-turno-label"
          id="demo-multiple-turno"
          value={turno}
          onChange={handleTurnoChange}
          input={<OutlinedInput label="Turno" />}
        >
          <MenuItem value="manana">Turno Mañana</MenuItem>
          <MenuItem value="tarde">Turno Tarde</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <Box sx={{
          maxHeight: '400px', // Altura máxima del contenedor, ajusta según tus necesidades
          overflowY: 'auto', // Habilita el desplazamiento vertical si es necesario
          marginBottom: '16px', // Agrega espacio inferior para separar de otros elementos
        }}>
          <Typography
            sx={{
              color: 'black', fontWeight: 'bolder',
              textShadow: '1px 1px 0px white',
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
              fontSize: '16px', // Cambia el tamaño de fuente
              fontWeight: 'bold', // Cambia el grosor de la fuente
              // Agrega más estilos según tus preferencias
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
                }}
              >
                <label sx={{ flex: 1, textAlign: 'right', marginRight: '8px' }}>
                  {`${(index + 8) % 24}:00`}
                </label>
                <Checkbox
                  checked={selectedHours.includes(`${(index + 8) % 24}:00:00`)}
                  onChange={() => handleHourChange(dayjs().hour((index + 8) % 24).minute(0).second(0))}
                  sx={{
                    '&.Mui-checked': {
                      color: 'blue',
                    },
                  }}
                />
              </Box>
            ))
            : [...Array(12)].map((_, index) => 
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
                }}
              >
                <label sx={{ flex: 1, textAlign: 'right', marginRight: '8px' }}>
                  {`${index + 16}:00`}
                </label>
                <Checkbox
                  checked={selectedHours.includes(`${index + 16}:00:00`)}
                  onChange={() => handleHourChange(dayjs().hour(index + 16).minute(0).second(0))}
                  sx={{
                    '&.Mui-checked': {
                      color: 'blue',
                    },
                  }}
                />
              </Box>
            )}
        </Box>
      </LocalizationProvider>
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
  );
}


