import {
    Box, Container, useMediaQuery, Button, Dialog, DialogTitle, DialogContent, DialogActions, Paper, TextField, Typography, Table,
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useAuth0 } from '@auth0/auth0-react';

const breakpoints = {
    xs: '(max-width:600px)',
    sm: '(max-width:960px)',
};

const theme = createTheme({
    typography: {
        fontFamily: "Arial", // Opcional: Cambia la fuente si lo deseas
        fontWeight: "bold", // Aplica negritas a todas las instancias de Typography
    },
});

function ListCancha() {
    const {user} = useAuth0()
    const isMobile = useMediaQuery(breakpoints.xs);
    const [data, setDatos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [canchaAEditar, setCanchaAEditar] = useState(null);
    const boldText = {
        fontWeight: "bold",
        fontSize: "20px",
    };
    const ListText = {
        fontWeight: "bold",
        fontSize: "h6",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    };

    useEffect(() => {
        const dataToSend ={
            id_Cuenta : user.sub
        }
        axios
            .post('http://localhost:8080/getCancha', dataToSend)
            .then((response) => {
                setDatos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleEditClick = (cancha) => {
        setCanchaAEditar(cancha);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleDeleteClick = (canchaId) => {
        if (window.confirm('¿Seguro que deseas eliminar esta cancha?')) {
            // Actualiza el estado local para eliminar la fila de inmediato
            setDatos(data.filter((cancha) => cancha.id_Cancha !== canchaId));

            // Luego, envía la solicitud DELETE al servidor
            deleteCancha(canchaId);
        }
    };

    const deleteCancha = (canchaId) => {
        axios
            .delete(`http://localhost:8080/deleteCancha/${canchaId}`)
            .then((response) => {
                // Realiza acciones adicionales después de la eliminación, si es necesario
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleEditarCancha = (e) => {
        e.preventDefault();
        // Realiza una solicitud al servidor para actualizar la cancha con la ID específica (canchaAEditar.id_Cancha) utilizando los datos en canchaAEditar.
        axios
            .put(`http://localhost:8080/editCancha/${canchaAEditar.id_Cancha}`, canchaAEditar)
            .then((response) => {
                // Actualiza el estado local `data` con los datos editados
                const newData = data.map((cancha) =>
                    cancha.id_Cancha === canchaAEditar.id_Cancha ? canchaAEditar : cancha
                );
                setDatos(newData);

                // Cierra el modal después de guardar los cambios
                handleCloseModal();
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (

        <Box
            component={Paper}
            elevation={4}
            sx={{
                bg: "#75FA8D",
                mt: "0",
                marginRight: isMobile ? "auto" : "auto",
                marginLeft: isMobile ? "auto" : "auto",
                ml: isMobile ? "auto" : "auto",
                width: isMobile ? "100%" : "100%",
                fontSize: isMobile ? "0.7rem" : "inherit", // Ajusta el tamaño de fuente en dispositivos móviles
            }}
        >
            {isMobile ? (
                <List
                    sx={{
                        
                        mt: "2rem",
                        mb: "4rem",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    {data.map((datos, index) => (
                        <ListItem key={datos.id_Cancha}
                            sx={{
                                borderBottom: index !== data.length - 1 ? "1px solid #ccc" : "none",
                            }}>
                            <ListItemText
                                secondary={
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                                        <div style={{ flex: 1 }}>
                                            <Typography variant="body1" sx={ListText}>
                                                ID: {datos.id_Cancha}
                                            </Typography>
                                            <Typography variant="body1" sx={ListText}>
                                                Cancha: {datos.nombre_Cancha}
                                            </Typography>
                                            <Typography variant="body1" sx={ListText}>
                                                Dimensiones: {datos.info_Dimensiones}
                                            </Typography>
                                            <Typography variant="body1" sx={ListText}>
                                                Características: {datos.Caracteristicas}
                                            </Typography>
                                            <Typography variant="body1" sx={ListText}>
                                                Costo por Hora: {datos.precio_Hora}
                                            </Typography>
                                        </div>


                                    </div>
                                }
                            />
                            <Box sx={{ ml: "10rem" }}>
                                <Fab color="primary" aria-label="edit" onClick={() => handleEditClick(datos)}>
                                    <EditIcon />
                                </Fab>
                                <Fab
                                    color="secondary"
                                    aria-label="delete"
                                    onClick={() => handleDeleteClick(datos.id_Cancha)}
                                >
                                    <DeleteForeverTwoToneIcon />
                                </Fab>
                            </Box>
                        </ListItem>
                    ))}
                </List>

            ) : (
                <TableContainer
                    sx={{
                        
                        mt: "2rem",
                        mb: "4rem",
                        width: "100%",
                        textAlign: "center",
                    }}
                    component={Paper}
                >
                    <ThemeProvider theme={theme}>
                        <Table sx={{ minWidth: 700, mb: "2rem", }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>
                                        <Typography variant="subtitle1">ID</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="subtitle1">Cancha</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Typography variant="subtitle1">Deporte</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Typography variant="subtitle1">
                                            Información de las dimensiones (Largo X Ancho)
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Typography variant="subtitle1">Características de la cancha</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Typography variant="subtitle1">Costo por Hora</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Typography variant="subtitle1">Acciones</Typography>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((datos) => (
                                    <StyledTableRow key={datos.id_Cancha} >
                                        <StyledTableCell component="th" scope="row">
                                            {datos.id_Cancha}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Typography variant="subtitle1" sx={boldText}>{datos.nombre_Cancha}</Typography >
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Typography variant="subtitle1" sx={boldText}>{datos.deporte}</Typography >
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Typography variant="subtitle1" sx={boldText}>{datos.info_Dimensiones}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Typography variant="subtitle1" sx={boldText}>{datos.Caracteristicas}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Typography variant="subtitle1" sx={boldText}>{datos.precio_Hora}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="right" colSpan={2}>
                                            <Fab color="primary" aria-label="edit" onClick={() => handleEditClick(datos)}>
                                                <EditIcon />
                                            </Fab>
                                            <Fab color="secondary" aria-label="delete" onClick={() => handleDeleteClick(datos.id_Cancha)}>
                                                <DeleteForeverTwoToneIcon />
                                            </Fab>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ThemeProvider>
                </TableContainer>
            )}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Editar Cancha</DialogTitle>
                <DialogContent>
                    {canchaAEditar && (
                        <form onSubmit={handleEditarCancha}>
                            <TextField
                                sx={{ margin: '1rem' }}
                                label="Deporte"
                                fullWidth
                                value={canchaAEditar.deporte}
                                onChange={(e) =>
                                    setCanchaAEditar({
                                        ...canchaAEditar,
                                        deporte: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                sx={{ margin: '1rem' }}
                                label="Información de Dimensiones"
                                fullWidth
                                value={canchaAEditar.info_Dimensiones}
                                onChange={(e) =>
                                    setCanchaAEditar({
                                        ...canchaAEditar,
                                        info_Dimensiones: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                sx={{ margin: '1rem' }}
                                label="Características de la Cancha"
                                fullWidth
                                value={canchaAEditar.Caracteristicas}
                                onChange={(e) =>
                                    setCanchaAEditar({
                                        ...canchaAEditar,
                                        Caracteristicas: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                sx={{ margin: '1rem' }}
                                label="Costo por Hora"
                                fullWidth
                                value={canchaAEditar.precio_Hora}
                                onChange={(e) =>
                                    setCanchaAEditar({
                                        ...canchaAEditar,
                                        precio_Hora: e.target.value,
                                    })
                                }
                            />
                            <DialogActions>
                                <Button type="submit" color="primary">
                                    Guardar Cambios
                                </Button>
                                <Button onClick={handleCloseModal} color="primary">
                                    Cerrar
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "purple",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default ListCancha;






