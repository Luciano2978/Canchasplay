import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Components/Logout";

export default function Home(){

    const { user} = useAuth0();

    return(
        <>
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>

            <div>
                <h2>Boton Home</h2>
                <LogoutButton></LogoutButton>
                
            </div>
        </>
    
    )
}