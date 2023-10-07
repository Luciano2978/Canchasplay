import {
    Box, Container, useMediaQuery, Button, Paper, TextField, Typography, Table,
    Select, MenuItem, InputLabel, FormControl, Fab,
    createTheme, ThemeProvider, AppBar, Toolbar, Grid, BottomNavigationAction, BottomNavigation,
} from '@mui/material';
import axios from 'axios';
import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';

const breakpoints = {
    xs: '(max-width:600px)',
    sm: '(max-width:960px)',
};

function ListCancha() {
    const theme = useTheme();
    const isMobile = useMediaQuery(breakpoints.xs);
    const [data, setDatos] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/getCancha')
            .then((response) => {
                setDatos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Box
            component={Paper}
            elevation={4}
            sx={{
                padding: '10px',
                mt: '0',
                marginRight: isMobile ? 'auto' : '5%',
                marginLeft: isMobile ? 'auto' : '0',
                ml: isMobile ? '0' : '-2rem',
                backgroundImage: `url(https://img.freepik.com/vector-gratis/papel-pintado-abstracto-blanco_23-2148830027.jpg?w=2000)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: isMobile ? '100%' : 'auto',
            }}
        >
            <TableContainer
                sx={{
                    mt: '2rem',
                    mb: '4rem',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: isMobile ? '0.7rem' : 'inherit', // Reduce aún más el tamaño de fuente en dispositivos móviles
                }}
                component={Paper}
            >
                <Table sx={{ minWidth: 700, mb: '2rem' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <Typography variant="subtitle1">ID</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Typography variant="subtitle1">Deporte</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Typography variant="subtitle1">Información de las dimensiones (Largo X Ancho)</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Typography variant="subtitle1">Características de la cancha</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Typography variant="subtitle1">Precio por Hora</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Typography variant="subtitle1">Acciones</Typography>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((datos) => (
                            <StyledTableRow key={datos.id_Cancha}>
                                <StyledTableCell component="th" scope="row">
                                    {datos.id_Cancha}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Typography variant="subtitle1">{datos.deporte}</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Typography variant="subtitle1">{datos.info_Dimensiones}</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Typography variant="subtitle1">{datos.Caracteristicas}</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Typography variant="subtitle1">{datos.precio_Hora}</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="right" colSpan={2}>
                                    <Fab color="primary" aria-label="edit">
                                        <EditIcon />
                                    </Fab>
                                    <Fab color="secondary" aria-label="edit">
                                        <DeleteForeverTwoToneIcon />
                                    </Fab>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "purple",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0
    }
}));

export default ListCancha;
