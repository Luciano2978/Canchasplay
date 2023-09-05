import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Container, Fab } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Contexto from '../../Context/Context';


export default function CalendarioUI(){
    
    const {ObtenerFecha} = useContext(Contexto)

    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);


  
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
    const today = dayjs();
    const endDay = today.add(10, 'days');
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
  
    const days = [];
  
    const handleDayClick = (dayDate,index) => {
        console.log('Fecha seleccionada:', dayDate.format('YYYY-MM-DD'));
        const dia = dayDate.format('DD')
        const mes = dayDate.format('MM')
        const año = dayDate.format('YYYY')
        ObtenerFecha(dia,mes,año);
        setSelectedButtonIndex(index); // Actualiza el botón seleccionado

    };
  
    for (let day = 1; day <= endOfMonth.date(); day++) {
      const dayDate = currentDate.date(day);
      const dayOfWeek = daysOfWeek[dayDate.day()];
  
      const isPastDay = dayDate.isBefore(today, 'day');
      const isDisabled = dayDate.isBefore(startOfMonth, 'day') || dayDate.isAfter(endDay, 'day');
  
      days.push({
        day: dayDate.format('D'),
        month: dayDate.format('MMM'),
        dayOfWeek,
        isPastDay,
        isDisabled,
      });
    }
  
  
    const handlePrevMonth = () => {
      setCurrentDate(currentDate.subtract(1, 'month'));
    };
  
    const handleNextMonth = () => {
      setCurrentDate(currentDate.add(1, 'month'));
    };

    return(
        <>
            <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width:"100%"
            }}
        >
            <Container
            sx={{
                display: 'flex',
                overflowX: 'auto',
                alignItems: 'center',
                "&::-webkit-scrollbar": {
                width: "0.4em",
                height: "0.4em",
                },
                "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                },
                "&::-webkit-scrollbar-track": {
                background: "transparent",
                },
            }}
            >
            {currentDate.isAfter(today, 'month') && (
                <ChevronLeftIcon
                onClick={handlePrevMonth}
                sx={{
                    cursor: 'pointer',
                }}
                />
            )}

            {days.map((dataDias, index) => (
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
                    backgroundColor: selectedButtonIndex === index ? 'green' : 'primary', // Estilo condicional 
                }}
                disabled={dataDias.isPastDay || dataDias.isDisabled}
                onClick={() => handleDayClick(currentDate.date(dataDias.day),index)}
                >
                <div>{dataDias.dayOfWeek}</div>
                <div>
                    {dataDias.day} - {dataDias.month}
                </div>
                </Fab>
            ))}

            <ChevronRightIcon
                onClick={handleNextMonth}
                sx={{
                cursor: 'pointer',
                }}
            />
            </Container>
        </Box>
        
        
        </>
    )
}