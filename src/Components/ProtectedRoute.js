import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export default function ProtectedRoute({children}){

    const { user, isLoading } = useAuth0();
    
    
    if (isLoading) {
        
        return <h1>Loading ...</h1>;
        
    }
    if (!user) return <Navigate to="/login" />

    return children;

}