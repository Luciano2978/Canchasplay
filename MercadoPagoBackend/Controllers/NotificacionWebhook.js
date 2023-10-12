const axios = require('axios');
require('dotenv').config();


const headers = {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
};

const PayCreate = (req,res) => {
    console.log(req.body) //.body.data.id
    const dataReserva = req.query.dataReserva; // Obtén los datos de reserva desde la cadena de consulta
    console.log('Datos de reserva:', dataReserva);

    res.status(200).send("Ok")
    
    
    axios.get(`https://api.mercadopago.com/v1/payments/${req.body.data.id}`,{headers}) 
    .then((response) => {
        console.log(response.data.status) //<- devuelve el estado del pago aprobado/denegado
        //const statusPay = response.data.status
        //axios.post("http://localhost:3000/StatusPay",{statusPay})
    })
    .catch((err) => {
        console.log(err)
    })
    

}



module.exports = PayCreate;