import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeUsuario from '../Container/HomeUsuario';
import Login from '../Components/Login';
import ProtectedRoute from '../Components/ProtectedRoute';
import NavigationContext from '../Context/NavigationContext';
import AccordionCanchas from '../Components/SeleccionCanchas/AccordionCanchas';
import DialogCalificacion from '../Components/MisReservas/DialogCalificacion';
import Loader from '../Components/Loader';



export default function App(){
    


    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/Loader" element={<Loader/>}></Route>
                    <Route exact path="/" element={<ProtectedRoute><NavigationContext><HomeUsuario/></NavigationContext></ProtectedRoute>}></Route>
                    <Route exact path="/SeccionPrueba" element={<NavigationContext><ProtectedRoute><Loader/></ProtectedRoute></NavigationContext>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}