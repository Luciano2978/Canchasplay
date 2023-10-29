const { URL } = require('url'); // Importa el módulo URL de Node.js
const {storeTokens}= require("./OAuthController");
require('dotenv').config();




const createAccessToken = (req, res) => {
    const url = new URL(req.url, `${process.env.REDIRECT_URI}/createAccessToken`); // Reemplaza con tu dominio real
    // Obtén el valor del parámetro 'code' de la URL
    const codigoAutorizacion = url.searchParams.get('code');
    // Aquí puedes manejar el código de autorización como lo necesites
    res.send("¡Su autorizacion fue todo un Exito! ");
    const propietarioId = 1; //<- aca deberia recibir el idPropietario enviado desde el front
    storeTokens(codigoAutorizacion,propietarioId, res);
    
};



module.exports = createAccessToken