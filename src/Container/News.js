import { Button } from "@mui/material";
import axios from "axios";






export default function News(){


    const callAuthMp = async () => {
        try { //enviar al propietario al link de mp 
            await axios.post("http://localhost:8080/auth_user_mp", {
                Correo: "luciano297801@gmail.com",
            });
      
        } catch (error) {
         console.log(error);
        }
    }


    const urlMp = "https://auth.mercadopago.com/authorization?client_id=3777467651088385&response_type=code&platform_id=mp&state=AUTORIZACIONCLIENTE&redirect_uri=https://39d1-190-5-160-149.ngrok-free.app"

    return(
        <>
        
        <Button href={urlMp} variant="contained" disableElevation sx={{"left":"50%"}} >
            AuthPropietarioMp
        </Button>
        
        
        </>
    )
}