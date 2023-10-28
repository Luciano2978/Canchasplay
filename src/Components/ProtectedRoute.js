import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Loader from "./Loader";




export default function ProtectedRoute({children}){

    const { user, isLoading } = useAuth0();

    if (isLoading) {
        
        return (
            <Loader></Loader>
          );
        
    }
    if (!user) return <Navigate to="/login" />

    return children;

}