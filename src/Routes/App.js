import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeUsuario from '../Container/HomeUsuario';
import Login from '../Components/Login';
import AddCancha from '../Components/VistaPropietario/AddCancha';
import AddComplejo from '../Components/VistaPropietario/AddComplejo';
import VistaPropietario from '../Components/VistaPropietario/LlamadosComponentes';
import ProtectedRoute from '../Components/ProtectedRoute';
import NavigationContext from '../Context/NavigationContext';


export default function App(){
    
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/Complejo" element={<ProtectedRoute><AddComplejo/></ProtectedRoute>}></Route>
                    <Route exact path="/HomePropietario" element={<ProtectedRoute><VistaPropietario/></ProtectedRoute>}></Route>
                    <Route exact path="/" element={<ProtectedRoute><NavigationContext><HomeUsuario/></NavigationContext></ProtectedRoute>}></Route>
                    <Route exact path="/SeccionPrueba" element={<NavigationContext><ProtectedRoute><Loader/></ProtectedRoute></NavigationContext>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}