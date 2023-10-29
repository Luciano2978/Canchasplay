import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Container/Home';
import Login from '../Components/Login';
/* import ProtectedRoute from '../Components/ProtectedRoute'; */
/* import FooterNavigation from '../Components/FooterNavigation'; */
import AddCancha from '../Components/VistaPropietario/AddCancha';
/* import Productos from '../Components/Productos';
import Reservas from '../Components/Reservas';
import Profile from '../Components/Profile'; */
/* import NavigationContext from '../Context/NavigationContext'; */
import AddComplejo from '../Components/VistaPropietario/AddComplejo';
import VistaPropietario from '../Components/VistaPropietario/LlamadosComponentes';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/home" element={<Home />}></Route>
                    <Route exact path="/Complejo" element={<AddComplejo />}></Route>
                    <Route exact path="/agregar-cancha" element={<AddCancha />}></Route>
                    <Route exact path="/list" element={<VistaPropietario />}></Route>




                </Routes>
            </BrowserRouter>
        </>
    )
}