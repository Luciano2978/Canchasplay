import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Container/Home';
import Login from '../Components/Login';
import ProtectedRoute from '../Components/ProtectedRoute';
import FooterNavigation from '../Components/FooterNavigation';
import AddCancha from '../Components/AddCancha';
import Productos from '../Components/Productos';
import Reservas from '../Components/Reservas';
import Profile from '../Components/Profile';

export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>   
                    <Route exact path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
                    <Route exact path="/prueba" element={<ProtectedRoute><FooterNavigation/></ProtectedRoute>}></Route>
                    <Route exact path="/agregar-cancha" element={<ProtectedRoute><AddCancha/></ProtectedRoute>}></Route>
                    <Route exact path="/productos" element={<ProtectedRoute><Productos/></ProtectedRoute>}></Route>
                    <Route exact path="/reservas" element={<ProtectedRoute><Reservas/></ProtectedRoute>}></Route>
                    <Route exact path="/perfil" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>



                </Routes>
            </BrowserRouter>
        </>
    )
}