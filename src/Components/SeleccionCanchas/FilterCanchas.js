
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Fab } from '@mui/material';
    
export default function CalendarioPrueba() {



  //console.log(estadoDisplay,nombreCancha

 
  //obtengo la fecha
  const diaDefault = dayjs().get('date')
  const mesDefault = (dayjs().get('month')) +1
  const añoDefault = dayjs().get('year')
  const defaultDate = dayjs().set('date', diaDefault).set('month', mesDefault -1).set('year', añoDefault); //Inicia el caleandrio con la fecha actual

  const  [value,setValue] = React.useState(defaultDate);   

    var aaño = 2023;
    var mmes = 8;
    
    var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];


    
    var arrayDias = new Map();
    
    // Itera sobre los días del mes actual
  for (var ddia = diaDefault; ddia <= dayjs().daysInMonth(); ddia++) {
    var indice = new Date(aaño, mmes - 1, ddia).getDay();

    var objetoDia = {
      dia: ddia,
      mes: mmes,
      año: aaño,
      diasSemana: diasSemana[indice]
    };

    arrayDias.set(ddia, objetoDia);
  }

  // Itera sobre los días del siguiente mes (septiembre)
  for (var ddia = 1; ddia <= dayjs(`${aaño}-${mmes + 1}`).daysInMonth(); ddia++) {
    var indice = new Date(aaño, mmes, ddia).getDay();

    var objetoDia = {
      dia: ddia,
      mes: mmes + 1, // mes siguiente (septiembre)
      año: aaño,
      diasSemana: diasSemana[indice]
    };

    arrayDias.set(ddia, objetoDia);
  }

  





  return(
    <div>
        <List>
          <ListItem >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}  >
                <DatePicker label="Seleccione una Fecha"  value={value ||  defaultDate} onChange={(newValue) => setValue(newValue)}/>
            </DemoContainer>
            </LocalizationProvider>
          </ListItem>
        </List>
        {Array.from(arrayDias.values()).map((dataDias, index) => (
          <Fab variant="extended" size="small" color="primary" key={index}>
            {dataDias.dia} - {dataDias.diasSemana} - {dataDias.mes}
          </Fab>
        ))}
      </div>
  );
}