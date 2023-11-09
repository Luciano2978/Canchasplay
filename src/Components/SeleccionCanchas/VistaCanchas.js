import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Autocomplete, IconButton, Stack, TextField, Tooltip } from '@mui/material';
        
//PARA LAS CANCHAS
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';

///Utilizamos Contexto para mandar el prop del nombre y llamar al dialogo
import SlideDialogComentarios from '../HomeUsuario/SlideDialogComentarios';
import AccordionCanchas from './AccordionCanchas';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../Loader';
import BusquedaUi from '../BusquedaUi';




const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '55%',
    borderRadius: "60%"
});

export default function VistaCanchas(){
    
    const { user } = useAuth0();
    const CiudadConexion = user.Nombre.user_ubicacion.cityName;
    const theme = useTheme();

    const [showHorariosDialog, setShowHorariosDialog] = React.useState(false);
    const [showComentsDialog, setShowComentsDialog] = React.useState(false);
    const [nombreCanchaSeleccionada, setNombreCanchaSeleccionada] = React.useState('');
    const [filtroDeporte, setFiltroDeporte] = React.useState(null); // Nuevo estado para el filtro
    const [datosComplejo,setDatosComplejo] = React.useState([]);

    //Traer Datos Complejo//

    React.useEffect(() => {
        axios.get("http://localhost:8080/getDataComplejo")
        .then((response ) => {
            setDatosComplejo(response.data);
            console.log(response.data)
            console.log(response.data.logo_Complejo)
        })
        .catch((error) =>{
            console.log("Error " + error);
        })
    },[])
    

    ///



    //para abrir los comentarios//

    const [idComplejo, setIdComplejo] = React.useState(0);

    const handleOpenComentsDialog = React.useCallback((nombreCancha,idComplejo) =>{
        setNombreCanchaSeleccionada(nombreCancha);
        setIdComplejo(idComplejo)
        setShowComentsDialog(true);
    },[])

    const handleCloseComentsDialog = React.useCallback(() =>{
        setNombreCanchaSeleccionada('');
        setShowComentsDialog(false);
    },[])

    ///
   
    const handleOpenHorariosDialog = React.useCallback((nombreCancha,idComplejo) => {
        setNombreCanchaSeleccionada(nombreCancha);
        //setNombreDeporteSeleccionado(nombreDeporte);
        setIdComplejo(idComplejo)
        setShowHorariosDialog(true);
    },[])

    const handleCloseHorariosDialog = React.useCallback(() => {
        setNombreCanchaSeleccionada('');
        setShowHorariosDialog(false);
    },[])


    /*
    const filteredCanchas = filtroDeporte
        ? Canchas.filter(cancha => cancha.Deporte === filtroDeporte)
        : Canchas;*/
        


    const PaperStyle = ({
        p: 2,
        margin: 'auto',
        maxWidth: "90% ",
        maxHeight: "17%",
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
        paddingTop: "10px",
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
        
        
        [theme.breakpoints.down('sm')]: {
            /* Estilos específicos para pantallas pequeñas */
            // Por ejemplo:
            fontSize: "8px",
            width: "auto",
        }
    });

    const RatingStyle = ({
        
        [theme.breakpoints.down('sm')]:{
            fontSize:"20px"
        }
    })



    return (
        <>      
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Centrar verticalmente en la pantalla
                marginTop: "-70px",
                
            }}>
                <Container fixed>
                    {/* <Autocomplete
                            options={deportesUnicos}
                            getOptionLabel={option => option}
                            onChange={(event, value) => setFiltroDeporte(value)}
                            value={filtroDeporte || null}
                            renderInput={params => (
                            <TextField {...params} label="Filtrar por deporte" variant="outlined" />
                            
                            )}
                            style={{ width: '50%', display:"flex",justifyContent:"flex-end",marginLeft: '50%'}}
                        /> */}
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
                        {datosComplejo.map((CmData) => (
                          CiudadConexion === "Formosa" && ( 
                        <Paper
                            key={CmData.id_Complejo}
                            sx={PaperStyle}
                            >
                            <Grid container spacing={2}>
                                <Grid item style={{paddingLeft: "0px"}} >
                                    <ButtonBase sx={LogoStyle} disabled>
                                        <Img alt="complex" src={ CmData.logo_Complejo ||"https://cdn.icon-icons.com/icons2/2440/PNG/512/gallery_icon_148533.png"}  />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={8} sm container style={{paddingLeft: "0px"}}>
                                <Grid item xs container direction="column">
                                    <Grid item xs>
                                    <Typography gutterBottom variant="h6" component="div" sx={NombreCanchaStyle}>
                                        {CmData.nombre_Lugar}
                                    </Typography>  
                                    </Grid>
                                    <Grid item>
                                    <Stack spacing={1}>
                                        <Rating name="half-rating-read" defaultValue={parseFloat(CmData.calificacionPromedio)} precision={0.5} readOnly style={RatingStyle} />
                                    </Stack> 
                                    
                                    <Button onClick={() => handleOpenComentsDialog(CmData.nombre_Lugar,CmData.id_Complejo)}  variant="text" color="inherit">
                                        <Typography sx={ComentariosStyle} variant="body2">
                                            {CmData.totalComentarios == 1 ? CmData.totalComentarios + ' Comentario' : (CmData.totalComentarios || 0) + " Comentarios"}
                                        </Typography>
                                    </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" component="div" mt={2}  style={{color: CmData.estado_Complejo ? "#44FF02" : "#FF0202"}}>
                                        {CmData.estado_Complejo
                                        ? 
                                            <Button variant="contained" sx={DisponibilidadStyle} onClick={() => handleOpenHorariosDialog(CmData.nombre_Lugar,CmData.id_Complejo)} color="success">Disponible</Button>
                                        : 
                                            <Button variant="contained" disabled sx={DisponibilidadStyle} color="error" >Disponible</Button>
                                        }
                                    </Typography>
                                    <Tooltip title="Ubicacion" arrow>
                                        <IconButton sx={{color:"red"}}>
                                            <LocationOnIcon></LocationOnIcon>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                </Grid>
                            </Grid> 
                        </Paper>
                        )))}
                        {
                            CiudadConexion != "Formosa" && (
                               <BusquedaUi/>
                            )
                        }
                    </Box>                    
                </Container>
            </Box>

            <div>
            <AccordionCanchas
                open={showHorariosDialog}
                idComplejo={idComplejo}
                nombreCancha={nombreCanchaSeleccionada}
                onClose={handleCloseHorariosDialog}
            />
            <SlideDialogComentarios
                open={showComentsDialog}
                nombreCancha={nombreCanchaSeleccionada}
                idComplejo={idComplejo}
                onClose={handleCloseComentsDialog}
            />
            

            </div>
        </>
    )
}