import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Components/Logout";
import React from "react";
import FooterPropietario from "../Components/FooterNavigation";
import '../Assets/Css/Background.css'
import logo from '../Assets/Logo.png'

export default function Home() {

    const { user } = useAuth0();

    return (
        <>
            <div className="BackgroundHomePropietario">
                <div className="fire">
                    <div className="flame">

                    </div>
                </div>
                <div className="logo">
                    <img src={logo} alt="Logo" class="logo" />

                </div>
                <header>

                    <h1 > Admin Propietario  </h1>



                </header>

                <h2 class="border">Bienvenido Administrador</h2>
                <h2 class="wave">Bienvenido Administrador</h2>

            </div>
            <FooterPropietario></FooterPropietario>



        </>

    )
}