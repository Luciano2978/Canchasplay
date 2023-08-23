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


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '55%',
    borderRadius: "60%"
});
  
export default function VistaCanchas(){

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
                    <Box sx={{ bgcolor: 'rgba(52, 52, 52, 0.29)', height: '80vh' }}>
                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: "90% ",
                                maxHeight: "10%",
                                flexGrow: 1,
                                backgroundColor: "rgba(0, 0, 0, 0.50)",
                                borderRadius: "5%"
                            }}
                            >
                            <Grid container spacing={2}>
                                <Grid item>
                                <ButtonBase sx={{ width: 128 }}>
                                    <Img alt="complex" src={LogoRecova}  />
                                </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                <Grid item xs container direction="column">
                                    <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div" style={{color:"white"}}>
                                        Cancha 2 LA RECOVA
                                    </Typography>  
                                    </Grid>
                                    <Grid item>
                                    <Stack spacing={1}>
                                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    </Stack>
                                    <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                        3 Comentarios
                                    </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" component="div">
                                    Disponible
                                    </Typography>
                                </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>                    
                </Container>
            </Box>
                

        </>
    )
}