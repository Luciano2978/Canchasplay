import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import PlaceIcon from '@mui/icons-material/Place';
import InfoIcon from '@mui/icons-material/Info';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));




export default function DialogInfoCancha({open,onClose,PrecioSelecc,InfoDimensiones,Caracteristicas,img_Cancha}) {

  const [localOpen, setLocalOpen] = React.useState(false);
  
  const images = [
    {
      label: "Dia",
      imgPath:
        {img_Cancha}
    },
  ];
  
  React.useEffect(() => {
    setLocalOpen(open);
  }, [open]);

  const handleClose = () => {
    setLocalOpen(false);
    onClose(); // Llamar a la función onClose proporcionada por el padre
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <AppBar sx={{ position: 'relative',backgroundColor:"black"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Informacion de la Cancha
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <Box sx={{
              maxWidth: 400,
              flexGrow: 1,
              }}>
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                bgcolor: "background.default"
                
              }}
            >
              <Typography>{images[activeStep].label}</Typography>
            </Paper>
            <SwipeableViews 
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: 255,
                        display: "block",
                        maxWidth: 400,
                        overflow: "hidden",
                        width: "100%"
                      }}
                      src={img_Cancha}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </SwipeableViews >
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
            <Divider/>
            <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <MonetizationOnIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Precio Por Hora" secondary={`Dia: $ ${PrecioSelecc}  - Noche: $ ${PrecioSelecc}`} />
            </ListItem>
            <Divider/>
            <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AspectRatioIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Dimensiones" secondary={`Largo y Ancho: ${InfoDimensiones}`} />
            </ListItem>
            <Divider/>
            <Divider/>
            <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <InfoIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Detalles" secondary={`${Caracteristicas}`} />
            </ListItem>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}