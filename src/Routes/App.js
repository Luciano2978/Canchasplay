import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Container/Home';
import Login from '../Components/Login';
import ProtectedRoute from '../Components/ProtectedRoute';
//import FooterNavigation from '../Components/FooterNavigation';
//import CardDeportes from '../Components/HomeUsuario/CardDeportes';
import NoticiasDeportes from '../Components/HomeUsuario/NoticiasDeportes';
import NavigationContext from '../Context/NavigationContext';
import  SeleccionCanchas from '../Container/SeleccionCanchas';
import InformacionUsuario from '../Components/SeleccionCanchas/InformacionUsuario';
import HorariosDisponibles from "../Components/SeleccionCanchas/HorariosDisponibles.js";
import SlideDialogComentarios from '../Components/HomeUsuario/SlideDialogComentarios';
import CalendarioPrueba from '../Components/SeleccionCanchas/FilterCanchas';
import DialogInfoCancha from '../Components/SeleccionCanchas/DialogInfoCancha';

export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>   
                    <Route exact path="/" element={<NavigationContext><ProtectedRoute><Home/></ProtectedRoute></NavigationContext>}></Route>
                    <Route exact path="/SeccionPrueba" element={<NavigationContext><ProtectedRoute><DialogInfoCancha/></ProtectedRoute></NavigationContext>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}