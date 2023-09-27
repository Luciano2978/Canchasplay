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
import LogoRecova from "../../Assets/Logo_Recova.jpg";
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';

///Utilizamos Contexto para mandar el prop del nombre y llamar al dialogo
import Contexto from '../../Context/Context';
import HorariosDisponibles from './HorariosDisponibles';
import SlideDialogComentarios from '../HomeUsuario/SlideDialogComentarios';
import DialogInfoCancha from './DialogInfoCancha';
import AccordionCanchas from './AccordionCanchas';
import axios from 'axios';




const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '55%',
    borderRadius: "60%"
});
//Maps
const Canchas = [
    {"idCancha" : 1,"Deporte":"futbol5"},
    {"idCancha" : 2,"Deporte":"futbol5"},
    {"idCancha" : 3,"Deporte":"Padel"},
    {"idCancha" : 4,"Deporte":"Padel"},
    {"idCancha" : 5,"Deporte":"futbol5"},
    {"idCancha" : 6,"Deporte":"Voley"},
    {"idCancha" : 7,"Deporte":"Tenis"},
]

const deportesUnicos = [...new Set(Canchas.map(cancha => cancha.Deporte))];

export default function VistaCanchas(){


    const theme = useTheme();

    const {displayHorarios} = React.useContext(Contexto)
    const [showHorariosDialog, setShowHorariosDialog] = React.useState(false);
    const [showComentsDialog, setShowComentsDialog] = React.useState(false);
    const [showInfoDialog, setShowInfoDialog] = React.useState(false);
    const [nombreCanchaSeleccionada, setNombreCanchaSeleccionada] = React.useState('');
    const [nombreDeporteSeleccionado, setNombreDeporteSeleccionado] = React.useState('');
    const [filtroDeporte, setFiltroDeporte] = React.useState(null); // Nuevo estado para el filtro

    const [datosComplejo,setDatosComplejo] = React.useState([]);

    //Traer Datos Complejo//

    React.useEffect(() => {
        axios.get("http://localhost:8080/getComplejo")
        .then((response ) => {
            setDatosComplejo(response.data);
        })
        .catch((error) =>{
            console.log("Error " + error);
        })
    })
    


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
   
    const handleOpenHorariosDialog = React.useCallback((nombreCancha,nombreDeporte) => {
        setNombreCanchaSeleccionada(nombreCancha);
        setNombreDeporteSeleccionado(nombreDeporte);
        setShowHorariosDialog(true);
    },[])

    const handleCloseHorariosDialog = React.useCallback(() => {
        setNombreCanchaSeleccionada('');
        setShowHorariosDialog(false);
    },[])


    
    const filteredCanchas = filtroDeporte
        ? Canchas.filter(cancha => cancha.Deporte === filtroDeporte)
        : Canchas;
        


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
                    <Autocomplete
                            options={deportesUnicos}
                            getOptionLabel={option => option}
                            onChange={(event, value) => setFiltroDeporte(value)}
                            value={filtroDeporte || null}
                            renderInput={params => (
                            <TextField {...params} label="Filtrar por deporte" variant="outlined" />
                            
                            )}
                            style={{ width: '50%', display:"flex",justifyContent:"flex-end",marginLeft: '50%'}}
                        />
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
                                        {CmData.nombre_Lugar || "LA RECOOVA"}
                                    </Typography>  
                                    </Grid>
                                    <Grid item>
                                    <Stack spacing={1}>
                                        <Rating name="half-rating-read" defaultValue={CmData.calificacionPromedio} precision={0.5} readOnly style={RatingStyle} />
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
                                            <Button variant="contained" sx={DisponibilidadStyle} onClick={() => handleOpenHorariosDialog(CmData.nombre_Lugar)} color="success">Disponible</Button>
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
                        ))}
                    </Box>                    
                </Container>
            </Box>

            <div>
            <AccordionCanchas
                open={showHorariosDialog}
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