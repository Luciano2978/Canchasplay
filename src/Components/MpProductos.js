import { useState } from "react";
import {initMercadoPago,Wallet} from "@mercadopago/sdk-react";
import axios from "axios";

export default function MpProductos(){

    
    const [preferenceId, setPreferenceId] = useState(null);

    initMercadoPago("TEST-535a7b1f-123c-4661-8ccb-f534d3f126b8")

    const createPreference = async () => {
        try {
          const response = await axios.post("http://localhost:8080/create_preference", {
            description: "La Nueva Recova",
            price: 5000,
            quantity: 1,
            currency_id:"ARS"
          });
    
          const { id } = response.data;
          return id;
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
          setPreferenceId(id);
        }
      };

    return(
        <>
        <div>
            <button onClick={handleBuy}>Buy</button>
            {preferenceId && <Wallet initialization={{ preferenceId , redirectMode: 'modal'}} />}
        </div>
        </>
    )
}
