import {
    Box, Container, useMediaQuery, Button, Paper, TextField, Typography, Table,
    Select, MenuItem, InputLabel, FormControl, Fab,
    createTheme, ThemeProvider, AppBar, Toolbar, Grid, BottomNavigationAction, BottomNavigation
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


const breakpoints = {
    xs: '(max-width:600px)',
    sm: '(max-width:960px)',
    md: '(max-width:1280px)',
    lg: '(max-width:1920px)',
    xl: '(min-width:1920px)',
    custom: '(width:1366px) and (height:768px)',
};

/* function createData(
    Id_Cancha,
    deporte,
    Info_Dimensiones,
    Caracteristicas,
    precio_Hora
  ) {
    return { Id_Cancha, deporte, Info_Dimensiones, Caracteristicas, precio_Hora };
  }
  
  const rows = [
    createData(1, "Futbol", "354 x 354", "loreee", 2500),
    createData(2, "Voley", "200 x 200", "loreee", 3500),
    createData(3, "Padel", "250 x 200", "loreee", 4000),
    createData(4, "Basquet", "300 x 300", "loreee", 3000)
  ];
 */
function ListCancha() {

    const [data, setDatos] = useState([])


    useEffect(() => {
        axios.get("http://localhost:8080/getCancha")
            .then(response => {
                setDatos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    console.log(data);


    const isMobile = useMediaQuery(breakpoints.xs && breakpoints.sm);
    const isTablet = useMediaQuery(breakpoints.sm);
    const isDesktop = useMediaQuery(breakpoints.md && breakpoints.lg);


    return (
        <div>
            

            <Box
                component={Paper}
                elevation={4}
                sx={{
                    padding: '10px',
                    mt: '0', // Elimina el margen superior en dispositivos móviles
                    marginRight: isMobile ? 'auto' : isDesktop ? '5%' : '', // Centra en dispositivos móviles
                    marginLeft: isDesktop ? '0' : "0",
                    ml: isMobile ? '' : '',
                    backgroundImage: `url(https://img.freepik.com/vector-gratis/papel-pintado-abstracto-blanco_23-2148830027.jpg?w=2000)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", // Ajusta la imagen al tamaño del contenedor sin distorsionarla

                    width: isDesktop ? "100%" : (isMobile ? "25rem" : "")

                }}

            >
                <Box>
                    <Typography sx={{ mt: "3rem" }}> Lista de Canchas</Typography>
                </Box>

                <TableContainer sx={{ mt: "5rem", width: "60%" }} component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell  >Id_Cancha</StyledTableCell>
                                <StyledTableCell align="right">Deporte</StyledTableCell>
                                <StyledTableCell align="right">Info Dimensiones</StyledTableCell>
                                <StyledTableCell align="right">Caracteristicas</StyledTableCell>
                                <StyledTableCell align="right">Precio Hora</StyledTableCell>
                                <StyledTableCell align="right">Acciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((datos) => (
                                <StyledTableRow key={datos.id_Cancha}>
                                    <StyledTableCell component="th" scope="row">
                                        {datos.id_Cancha}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{datos.deporte}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {datos.info_Dimensiones}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {datos.Caracteristicas}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{datos.precio_Hora}</StyledTableCell>
                                    <StyledTableCell align="right" colSpan={2}>
                                        <ModeEditTwoToneIcon />
                                        <DeleteForeverTwoToneIcon />
                                    </StyledTableCell>



                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>







        </div>
    )
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
export default ListCancha