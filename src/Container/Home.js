import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Components/Logout";
import FooterNavigation from "../Components/FooterNavigation";
import CardDeportes from "../Components/CardDeportes";
import "../Assets/css/Background.css";
import HeaderUsuario from "../Components/HeaderUsuario";
import BotonDeportes from "../Components/BotonDeportes";

export default function Home(){

    const { user} = useAuth0();



    return(
        <>
            <div className="BackgroundHomeUsuario">

                <div className="HeaderHomeUsuario">
                    <HeaderUsuario></HeaderUsuario>
                </div>

                <div className="BodyHomeUsuario">
                    <BotonDeportes></BotonDeportes>
                    {/*<CardDeportes></CardDeportes>*/}
                </div>

                <div className="FooterHomeUsuario">
                    <FooterNavigation></FooterNavigation>
                </div>
                
                {/*
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>

                <div>
                    <h2>Boton Home</h2>
                    <LogoutButton></LogoutButton>
                    
            </div>*/}
            </div>
        </>
    
    )
}