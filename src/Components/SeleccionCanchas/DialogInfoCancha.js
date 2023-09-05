import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
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
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));


const images = [
  {
    label: "Dia",
    imgPath:
      "https://www.diarioel9dejulio.com.ar/wp-content/uploads/2012/04/cancha28.jpg"
  },
  {
    label: "Adicional",
    imgPath:
      "https://i.pinimg.com/550x/71/d8/a9/71d8a91bf18074ec97c1a6283f2a01a2.jpg"
  },
  {
    label: "De Noche",
    imgPath:
      "https://www.poderypolitica.com.ar/wp-content/uploads/2020/07/800_600_colisseo-futbol-5.jpg"
  }
];

export default function DialogInfoCancha() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Detalles de Cancha
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
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
                      src={step.imgPath}
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
                <ListItemText primary="Precio Por Hora" secondary="$5000" />
            </ListItem>
            <Divider/>
            <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AspectRatioIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Dimensiones" secondary="Longitud: 42m , Ancho: 25m" />
            </ListItem>
            <Divider/>
            <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PlaceIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Ubicacion" secondary="(VerUbicacion)" />
            </ListItem>
            <Divider/>
            <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <InfoIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Detalles" secondary="Costo Extra de Noche, a partir de las 20hs" />
            </ListItem>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}