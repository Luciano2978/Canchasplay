import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Container/Home';
import Login from '../Components/Login';
import ProtectedRoute from '../Components/ProtectedRoute';
import FooterNavigation from '../Components/FooterNavigation';


export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>   
                    <Route exact path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
                    <Route exact path="/SeccionPrueba" element={<ProtectedRoute><FooterNavigation/></ProtectedRoute>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}