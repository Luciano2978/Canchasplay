const axios = require('axios');
require('dotenv').config();


const headers = {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
};

const PayCreate = (req,res) => {
    res.status(200).send("Ok")
    axios.get(`https://api.mercadopago.com/v1/payments/65236654796`,{headers}) 
    .then((response) => {
        console.log(response.data.metadata) 
        const status = response.data.status
        if(status === "approved"){

            axios.post("http://localhost:8080/create_Reserva",{
                Fecha: response.data.metadata.fecha,
                idCancha: response.data.metadata.id_cancha,
                Hora: response.data.metadata.hora,
                email: response.data.metadata.email,
                idHorario: response.data.metadata.id_horario,
                status: status
            })
                .then((res) => {
                    // Maneja la respuesta de la solicitud POST si es necesario
                    console.log('Respuesta de create_Reserva:', res.data);
                })
                .catch((error) => {
                    // Maneja cualquier error que pueda ocurrir durante la solicitud POST
                    console.error('Error en create_Reserva:', error);
                });
        }
    }) 
    .catch((err) => {
        console.log(err)
    })
    

}



module.exports = PayCreate;