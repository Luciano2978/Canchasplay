import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Container/Home';
import Login from '../Components/Login';
import ProtectedRoute from '../Components/ProtectedRoute';
import NoticiasDeportes from '../Components/HomeUsuario/NoticiasDeportes';
import NavigationContext from '../Context/NavigationContext';
import DialogInfoCancha from '../Components/SeleccionCanchas/DialogInfoCancha';
import AccordionCanchas from '../Components/SeleccionCanchas/AccordionCanchas';



export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/" element={<NavigationContext><Home/></NavigationContext>}></Route>
                    <Route exact path="/SeccionPrueba" element={<NavigationContext><AccordionCanchas/></NavigationContext>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}