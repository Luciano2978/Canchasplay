import * as React from 'react';
import {
    Box, Grid, Typography,
    Paper, Fab,
    createTheme, ThemeProvider,
    BottomNavigationAction, BottomNavigation,
    useMediaQuery,
} from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import DesktopWindowsTwoToneIcon from '@mui/icons-material/DesktopWindowsTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';
import TabletAndroidTwoToneIcon from '@mui/icons-material/TabletAndroidTwoTone';

const data = [
    { label: 'Desktop', value: 400, color: '#0088FE' },
    { label: 'Phone', value: 300, color: '#00C49F' },
    { label: 'Tablet', value: 300, color: '#FFBB28' },
];

const sizing = {
    margin: { right: 5 },
    width: 300,
    height: 200,
    legend: { hidden: true },
};

const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
const percentages = data.map((item) => ((item.value / TOTAL) * 100).toFixed(0));

export default function PieChartWithCustomizedLabel() {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ backgroundColor: 'transparent' }}> {/* Establece el fondo del contenedor como transparente */}
            <Paper elevation={4} sx={{
                padding: '1rem',
                backgroundImage: `url(https://images.unsplash.com/photo-1615715874994-bb83092ef331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&w=1000&q=80)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Centra el contenido horizontalmente
                minHeight: isMobile ? '100px' : 'none', // Altura mínima en dispositivos móviles
            }}> {/* Establece el fondo del Paper como transparente */}
                <PieChart
                    series={[
                        {
                            outerRadius: isMobile ? 150 : 90, // Reduce el radio en dispositivos móviles
                            data,
                            arcLabel: (params) => ` (${((params.value / TOTAL) * 100).toFixed(0)}%)`,
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fontSize: isMobile ? 20 : 20, // Reduce el tamaño de fuente en dispositivos móviles
                        },
                    }}
                    {...sizing}
                />
                <Grid container sx={{ ml: "1rem", textAlign: "center" }} spacing={isMobile ? 2 : 4} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Fab sx={{ background: "#0088FE", color: "white" }}>
                            <DesktopWindowsTwoToneIcon />
                        </Fab>
                        <Typography variant={isMobile ? 'body2' : 'body1'}>Desktop</Typography>
                        <Typography variant={isMobile ? 'body2' : 'body1'}>{percentages[0]}%</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Fab sx={{ background: "#00C49F", color: "white" }}>
                            <PhoneAndroidTwoToneIcon />
                        </Fab>
                        <Typography variant={isMobile ? 'body2' : 'body1'}>Phone</Typography>
                        <Typography variant={isMobile ? 'body2' : 'body1'}>{percentages[1]}%</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Fab sx={{ background: '#FFBB28', color: 'white' }}>
                            <TabletAndroidTwoToneIcon />
                        </Fab>
                        <Typography variant={isMobile ? 'body2' : 'body1'}>Tablet</Typography>
                        <Typography variant={isMobile ? 'body2' : 'body1'}>{percentages[2]}%</Typography>
                    </Grid>
                </Grid>
            </Paper>


        </Box>
    );
}
