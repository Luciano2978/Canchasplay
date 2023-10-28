import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
    Box,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    AppBar,
  } from '@mui/material';
  
const data = [
    { month: 'Enero', year: '2023', Ganancias: 1000 },
    { month: 'Febrero', year: '2023', Ganancias: 1200 },
    { month: 'Marzo', year: '2023', Ganancias: 1500 },
    { month: 'Abril', year: '2023', Ganancias: 1800 },
    { month: 'Mayo', year: '2023', Ganancias: 2000 },
    { month: 'Junio', year: '2023', Ganancias: 2200 },
    { month: 'Julio', year: '2023', Ganancias: 1500 },
    { month: 'Agosto', year: '2023', Ganancias: 200 },
    { month: 'Septiembre', year: '2023', Ganancias: 1500 },
    { month: 'Octubre', year: '2023', Ganancias: 3000 },
    { month: 'Noviembre', year: '2023', Ganancias: 2000 },
    { month: 'Diciembre', year: '2023', Ganancias: 5000 },
    // Agrega más datos para otros meses y años
];

export default function BarsDataset() {
    return (
        <Box>
            <BarChart
                width={window.innerWidth <= 600 ? window.innerWidth - 20 : 800}
                height={300}
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="Ganancias" fill="purple" />
            </BarChart>
        </Box>

    );
}
