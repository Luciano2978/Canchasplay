import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeUsuario from '../Container/HomeUsuario';
import Login from '../Components/Login';
import ProtectedRoute from '../Components/ProtectedRoute';
import NavigationContext from '../Context/NavigationContext';
import AddComplejo from '../Components/VistaPropietario/AddComplejo';
import VistaPropietario from '../Components/VistaPropietario/LlamadosComponentes';
import FormProp from '../Components/FormProp';
import NotFound from '../Components/NotFound';
import HomePage from '../Container/HomePage';
import Verificacion from '../Components/Verificacion';
import AdminPage from '../Container/AdminPage';
import NoAutenticado from '../Components/NoAutenticado';



export default function App(){
    //const {user} = useAuth0();
    //console.log(user)


    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/Login" element={<Login />}></Route>
                    <Route exact path="/Verificacion" element={<ProtectedRoute><Verificacion /></ProtectedRoute>} />
                    {/*Mishi*/}
                    <Route exact path="/HomeUsuario" element={<ProtectedRoute><NavigationContext><HomeUsuario/></NavigationContext></ProtectedRoute>}></Route>
                     {/* Juan*/}
                    <Route exact path="/HomePropietario" element={<ProtectedRoute><VistaPropietario/></ProtectedRoute>}></Route>
                    <Route exact path="/Complejo" element={<ProtectedRoute><AddComplejo/></ProtectedRoute>}></Route>
                    {/* Marto */}
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/RegistroPropietario" element={<FormProp />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route path="/AdminPage" element={<AdminPage />} />

                    {/* Faltaria añadir una ruta para cuando el propietario este en estado de verificacion */}

                    <Route path="/PropValidate" element={<NoAutenticado />} />
                    
                </Routes>
            </BrowserRouter>
        </>
    )
}