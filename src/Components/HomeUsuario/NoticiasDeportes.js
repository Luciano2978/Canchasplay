
// import Atropos component
import Atropos from 'atropos/react';
import "../../Assets/css/atropos.css";
import 'atropos/css' 




export default function NoticiasDeportes () {
    return (
        
          <Atropos 
            activeOffset={40}
            shadowScale={1.05}
            shadow={true}
            
          >
            <img className = "my-atropos" src ="https://e1.pxfuel.com/desktop-wallpaper/482/213/desktop-wallpaper-lionel-messi.jpg"/>  
            <p>Hola mundo</p>
          </Atropos>
        
      )
}


