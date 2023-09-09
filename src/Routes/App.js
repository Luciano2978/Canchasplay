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
import NavigationContext from '../Context/NavigationContext';
import MaPrueba from '../Components/maPrueba';

export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>   
                    <Route exact path="/home" element={<NavigationContext><ProtectedRoute><Home/></ProtectedRoute></NavigationContext>}></Route>
                    <Route exact path="/prueba" element={<ProtectedRoute><MaPrueba/></ProtectedRoute>}></Route>
                    <Route exact path="/agregar-cancha" element={<NavigationContext><ProtectedRoute><AddCancha/></ProtectedRoute></NavigationContext>}></Route>



                </Routes>
            </BrowserRouter>
        </>
    )
}