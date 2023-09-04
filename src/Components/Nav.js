/* import React from 'react';
import { AppBar, Toolbar, Typography, Box, useMediaQuery } from '@mui/material';
import logo from '../Assets/Logo.png'; // Reemplaza con la ruta correcta de tu logotipo
import { Margin } from '@mui/icons-material';


const breakpoints = {
    xs: '(max-width:600px)',
    sm: '(max-width:960px)',
    md: '(max-width:1280px)',
    lg: '(max-width:1920px)',
    xl: '(min-width:1920px)',
};

function Navbar() {

    const isMobile = useMediaQuery(breakpoints.sm && breakpoints.md);
    const isDesktop = useMediaQuery(breakpoints.lg && breakpoints.xl);
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{
                    flexGrow: 1,
                    background: "#22B14C",
                    padding : "1rem"
                }}>
                    <img src={logo} alt="Logo de tu aplicación" style={{ width: "5rem" }} />
                </Box>
                <Typography variant="h6">CanchasPlay</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar; */