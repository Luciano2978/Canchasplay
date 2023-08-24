import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
        
//PARA LAS CANCHAS
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import LogoRecova from "../../Assets/Logo_Recova.jpg";
import { useTheme } from '@mui/material/styles';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '55%',
    borderRadius: "60%"
});


export default function VistaCanchas(){

    const theme = useTheme();
    
    const PaperStyle = ({
        p: 2,
        margin: 'auto',
        maxWidth: "90% ",
        maxHeight: "15%",
        flexGrow: 1,
        backgroundColor: "rgba(0, 0, 0, 0.77)",
        borderRadius: "60px",
        marginBottom: "10px",
        /*[theme.breakpoints.down('md')]: {
            /* Estilos específicos para pantallas pequeñas 
            //Por ejemplo:
            maxHeight: "15%",
        }*/
    });


    const LogoStyle = ({
        maxWidth: 128,
        [theme.breakpoints.down('sm')]: {
            /* Estilos específicos para pantallas pequeñas */
            // Por ejemplo:
            maxWidth: 100,
        }
    });
    const NombreCanchaStyle = ({
        color: "white",
        fontSize: "20px",
        [theme.breakpoints.down('sm')]: {
            /* Estilos específicos para pantallas pequeñas */
            // Por ejemplo:
            fontSize: "15px",
        }
    });

    const ComentariosStyle = ({
        color: "white",
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            /* Estilos específicos para pantallas pequeñas */
            // Por ejemplo:
            fontSize: "12px",
        }
    });
    const DisponibilidadStyle = ({
        color: "#44FF02",
        fontWeight: "bold",
        fontSize:"25px",
        
        [theme.breakpoints.down('sm')]: {
            /* Estilos específicos para pantallas pequeñas */
            // Por ejemplo:
            fontSize: "10px",
        }
    });

    const RatingStyle = ({
        
        [theme.breakpoints.down('sm')]:{
            fontSize:"20px"
        }
    })


    //Maps

    const Canchas = [
        {"idCancha" : 1,"urlLogo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm_JmP9Gf6geUfLNX8429rxgL15VqIJf5DupJTRIaUn5FqCKqf2BjTFHgzayPqZR188as&usqp=CAU", "NombreCancha": "La Nueva Recova 2","PuntuacionCancha": 3, "Numero_Comentarios":4, "EstadoDisponibilidad": true},
        {"idCancha" : 2,"urlLogo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs1IaT3OBcaQWoMmjKSH407F0sH1jmW9ASAFpZLIC_1-ZTusKpnR1BBCQJyh86Q3400JY&usqp=CAU", "NombreCancha": "Centro","PuntuacionCancha": 1, "Numero_Comentarios":1,"EstadoDisponibilidad": true},
        {"idCancha" : 3,"urlLogo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAQcF1AgHRAxBGQiah2TBSr2nObKmRw3XwMYJ8PByMdq3YnHx2mDqMA3tNtr7_aNmNVFI&usqp=CAU", "NombreCancha": "Union sovietica","PuntuacionCancha": 5, "Numero_Comentarios":20,"EstadoDisponibilidad": false},
        {"idCancha" : 4,"urlLogo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjNKzwu9bI2HYnsgZE9jUCsXdykAn4xmXah-JicZkPopAt0eaCiUg5oL8s-cem0bySh8&usqp=CAU", "NombreCancha": "Juancito Futbol5","PuntuacionCancha": 2, "Numero_Comentarios":1,"EstadoDisponibilidad": true},
        {"idCancha" : 4,"urlLogo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjNKzwu9bI2HYnsgZE9jUCsXdykAn4xmXah-JicZkPopAt0eaCiUg5oL8s-cem0bySh8&usqp=CAU", "NombreCancha": "Juancito Futbol5","PuntuacionCancha": 2, "Numero_Comentarios":1,"EstadoDisponibilidad": true},
        {"idCancha" : 4,"urlLogo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjNKzwu9bI2HYnsgZE9jUCsXdykAn4xmXah-JicZkPopAt0eaCiUg5oL8s-cem0bySh8&usqp=CAU", "NombreCancha": "Juancito Futbol5","PuntuacionCancha": 2, "Numero_Comentarios":1,"EstadoDisponibilidad": true},
        {"idCancha" : 4,"urlLogo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjNKzwu9bI2HYnsgZE9jUCsXdykAn4xmXah-JicZkPopAt0eaCiUg5oL8s-cem0bySh8&usqp=CAU", "NombreCancha": "Juancito Futbol5","PuntuacionCancha": 2, "Numero_Comentarios":1,"EstadoDisponibilidad": true},
    ]


    return (
        <>      
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Centrar verticalmente en la pantalla
                
            }}>

                <Container fixed>
                    <Box sx={{ bgcolor: 'rgba(52, 52, 52, 0.29)', height: '80vh',padding:"1%", overflow: "auto",
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
                    }}>
                        {/* Aca se debe realizar un map de todas las canchas (dependiendo el deporte) esten disponibles*/}
                        {Canchas.map((CanchasData) => (
                        <Paper
                            key={CanchasData.id}
                            sx={PaperStyle}
                            >
                            <Grid container spacing={2}>
                                <Grid item style={{paddingLeft: "0px"}} >
                                    <ButtonBase sx={LogoStyle}>
                                        <Img alt="complex" src={CanchasData.urlLogo}  />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={8} sm container style={{paddingLeft: "0px"}}>
                                <Grid item xs container direction="column">
                                    <Grid item xs>
                                    <Typography gutterBottom variant="h6" component="div" sx={NombreCanchaStyle}>
                                        {CanchasData.NombreCancha}
                                    </Typography>  
                                    </Grid>
                                    <Grid item>
                                    <Stack spacing={1}>
                                        <Rating name="half-rating-read" defaultValue={CanchasData.PuntuacionCancha} precision={0.5} readOnly style={RatingStyle} />
                                    </Stack> 
                                    
                                    <Typography sx={ComentariosStyle} variant="body2" >
                                        {CanchasData.Numero_Comentarios}
                                    </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" component="div" mt={2} sx={DisponibilidadStyle} style={{color: CanchasData.EstadoDisponibilidad ? "#44FF02" : "#FF0202"}}>
                                    {CanchasData.EstadoDisponibilidad ? "Disponible": "No Disponible "}
                                    </Typography>
                                </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        ))}
                    </Box>                    
                </Container>
            </Box>
                

        </>
    )
}