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
import { useAuth0 } from '@auth0/auth0-react';
import Verificacion from '../Components/Verificacion';



export default function App(){
    //const {user} = useAuth0();
    //console.log(user)


    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>
                    {/*Mishi*/}
                    <Route exact path="/Verificacion" element={<ProtectedRoute><Verificacion /></ProtectedRoute>} />
                    <Route exact path="/HomeUsuario" element={<ProtectedRoute><NavigationContext><HomeUsuario/></NavigationContext></ProtectedRoute>}></Route>
                    <Route exact path="/SeccionPrueba" element={<NavigationContext><ProtectedRoute><Loader/></ProtectedRoute></NavigationContext>}></Route>
                     {/* Juan*/}
                    <Route exact path="/HomePropietario" element={<ProtectedRoute><NavigationContext><VistaPropietario/></NavigationContext></ProtectedRoute>}></Route>
                    <Route exact path="/Complejo" element={<ProtectedRoute><NavigationContext><AddComplejo/></NavigationContext></ProtectedRoute>}></Route>
                    {/* Marto */}
                    <Route exact path="/HomePage" element={<HomePage />} />
                    <Route exact path="/RegistroPropietario" element={<FormProp />} />
                    <Route path="/*" element={<NotFound />} />
                    {/* Faltaria añadir una ruta para cuando el propietario este en estado de verificacion */}
                </Routes>
            </BrowserRouter>
        </>
    )
}