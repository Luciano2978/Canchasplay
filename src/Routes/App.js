import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeUsuario from '../Container/HomeUsuario';
import Login from '../Components/Login';
import ProtectedRoute from '../Components/ProtectedRoute';
import NavigationContext from '../Context/NavigationContext';
import Loader from '../Components/Loader';
import AddComplejo from '../Components/VistaPropietario/AddComplejo';
import VistaPropietario from '../Components/VistaPropietario/LlamadosComponentes';
import FormProp from '../Components/FormProp';
import NotFound from '../Components/NotFound';
import HomePage from '../Container/HomePage';



export default function App(){
    


    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>
                    {/*Mishi*/}
                    <Route exact path="/Loader" element={<Loader/>}></Route>
                    <Route exact path="/" element={<ProtectedRoute><NavigationContext><HomeUsuario/></NavigationContext></ProtectedRoute>}></Route>
                    <Route exact path="/SeccionPrueba" element={<NavigationContext><ProtectedRoute><Loader/></ProtectedRoute></NavigationContext>}></Route>
                     {/* Juan*/}
                    <Route exact path="/HomePropietario" element={<ProtectedRoute><NavigationContext><VistaPropietario/></NavigationContext></ProtectedRoute>}></Route>
                    <Route exact path="/Complejo" element={<ProtectedRoute><NavigationContext><AddComplejo/></NavigationContext></ProtectedRoute>}></Route>
                    {/* Marto */}
                    <Route path="/HomePage" element={<HomePage />} />
                    <Route path="/RegistroPropietario" element={<FormProp />} />
                    <Route path="/NotFound" element={<NotFound />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}