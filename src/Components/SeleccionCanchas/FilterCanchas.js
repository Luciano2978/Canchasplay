
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Box, Container, Fab } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function CalendarioPrueba() {
  const [value, setValue] = React.useState(dayjs());

  const aaño = value.year();
  const mmes = value.month();

  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const numDiasMesActual = dayjs(`${aaño}-${mmes + 1}`).daysInMonth();
  const diaDefault = dayjs().get('date')
  const dias = [];

  // Agregar los días del mes actual
  for (let ddia = 1; ddia <= numDiasMesActual; ddia++) {
    const indice = new Date(aaño, mmes, ddia).getDay();
    dias.push({
      dia: ddia,
      mes: mmes + 1,
      año: aaño,
      diasSemana: diasSemana[indice]
    });
  }

  // Obtener los días del siguiente mes
  const numDiasSiguienteMes = dayjs(`${aaño}-${mmes + 2}`).daysInMonth();
  for (let ddia = 1; ddia <= numDiasSiguienteMes; ddia++) {
    const indice = new Date(aaño, mmes + 1, ddia).getDay();
    dias.push({
      dia: ddia,
      mes: mmes + 2, // siguiente mes
      año: aaño,
      diasSemana: diasSemana[indice]
    });
  }

  const containerRef = React.useRef(null);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleScroll = (scrollDirection) => {
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.clientWidth;
      if (scrollDirection === 'left') {
        setScrollLeft(scrollLeft - containerWidth);
      } else if (scrollDirection === 'right') {
        setScrollLeft(scrollLeft + containerWidth);
      }
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Container ref={containerRef} fixed>
          <Box
            sx={{
              display: 'flex',
              bgcolor: 'rgba(52, 52, 52, 0.29)',
              padding: '1%',
              overflow: 'hidden',
            }}
          >

            {scrollLeft > 0 && (
              <ChevronLeftIcon
              onClick={() => handleScroll('left')}
              style={{ alignSelf: 'center', cursor: 'pointer' }}
            />
            )}
            {dias.map((dataDias, index) => (
              <Fab
                variant="extended"
                size="small"
                color="primary"
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '10%',
                  width: '10%',
                  margin: '10px',
                  flexShrink: 0,
                }}
              >
                <div>{dataDias.diasSemana}</div>
                <div>
                  {dataDias.dia} - {dayjs().month(dataDias.mes - 1).format('MMM')}
                </div>
              </Fab>
            ))}
            {scrollLeft < containerRef.current?.scrollWidth - containerRef.current?.clientWidth && (
              <ChevronRightIcon
                onClick={() => handleScroll('right')}
                style={{ alignSelf: 'center', cursor: 'pointer',position:"absolute"}}
              />
            )}
          </Box>
        </Container>
      </Box>
    </div>
  );
}
