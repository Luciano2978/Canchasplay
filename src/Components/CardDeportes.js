import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import padel from "../Assets/Padel.png";
import futbol from "../Assets/Futbol.png";
import voley from "../Assets/Voley.png";
import { CardActionArea } from '@mui/material';
import { grey } from '@mui/material/colors';



export default function CardDeportes() {


const color = grey[800];

const StyleCardHeader= {
    margin: "-16px",
    textAlign: 'center',
    fontSize: '16px',
    color: "white",
}

const StyleCardSx = {
    maxWidth: "80%",
    margin: '0 auto',
    marginTop: '2%',
    //marginBottom: '2%',
    backgroundColor: color
}

return (
    <div>
        <Card sx={StyleCardSx}>
            <CardActionArea>
            <CardHeader
                title="Futbol"
                style={StyleCardHeader}
            />
            <CardMedia
                component="img"
                height= "100"
                src= {futbol}
                alt="Paella dish"
            />
            </CardActionArea> 
    </Card>
    <Card sx={StyleCardSx}>
        <CardActionArea>
            <CardHeader
                title="Padel"
                style={StyleCardHeader}
            />
            <CardMedia
                component="img"
                height= "100"
                src= {padel}
                alt="Paella dish"
            />
        </CardActionArea> 
    </Card>
    <Card sx={StyleCardSx}>
        <CardActionArea>
        <CardHeader
                title="Voley"
                style={StyleCardHeader}
            />
            <CardMedia
                component="img"
                height= "100"
                src= {voley}
                alt="Paella dish"
            />
        </CardActionArea> 
    </Card>
    
    </div>

  );
}
