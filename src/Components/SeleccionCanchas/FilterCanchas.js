import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Box, Container, Fab } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function CalendarioPrueba() {

  const [currentDate, setCurrentDate] = useState(dayjs());


  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const numDaysInMonth = currentDate.daysInMonth();

  const days = [];
  const diaDefault = (dayjs().get('date')-1)
  const mesDefault = (dayjs().get('month')) +1
  //dia de hoy


  for (let day = 1; day <= numDaysInMonth; day++) {
    const dayDate = currentDate.date(day);
    const dayOfWeek = daysOfWeek[dayDate.day()];
    days.push({
      day: dayDate.format('D'),
      month: dayDate.format('MMM'),
      dayOfWeek,
    });
  }

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };



  return (
    <div>
      <Box
        sx={{
          
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}
      >
        <Container
          sx={{
            display: 'flex',
            overflowX: 'auto',
            alignItems: 'center',
            "&::-webkit-scrollbar": {
              width: "0.4em", // Ancho de la barra
              height: "0.4em", // Altura de la barra
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.2)", // Color del "pulgar" de la barra
            },
            "&::-webkit-scrollbar-track": {
                background: "transparent", // Color del fondo de la barra
            },
          }}
        >
          
          {currentDate.isAfter(dayjs(), 'month') && (
            <ChevronLeftIcon
              onClick={handlePrevMonth}
              sx={{
                cursor: 'pointer',
              }}
            />
          )}

          {days.map((dataDias, index) => (
            <>
              <Fab
                variant="extended"
                size="small"
                color="primary"
                key={index}
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '10%',
                  width: '10%',
                  margin: '10px',
                  minWidth: "80px",
                  flexShrink: 0,
                }}
                disabled={dataDias.isPastDay || index < diaDefault || index > (diaDefault+7)}
              > 
              
                <div>{dataDias.dayOfWeek}</div>
                <div>
                  {dataDias.day} - {dataDias.month}
                </div>
              </Fab> 
            </>
            ))}


          <ChevronRightIcon
            onClick={handleNextMonth}
            sx={{
              cursor: 'pointer',
            }}
          />
        </Container>
      </Box>
    </div>
  );
}
