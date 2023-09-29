const { URL } = require('url'); // Importa el módulo URL de Node.js

const {storeTokens}= require("./OAuthController");




const createAccessToken = (req, res) => {
    const url = new URL(req.url, 'https://zdwk8946-8080.use2.devtunnels.ms/createAccessToken'); // Reemplaza con tu dominio real
    // Obtén el valor del parámetro 'code' de la URL
    const codigoAutorizacion = url.searchParams.get('code');
    // Aquí puedes manejar el código de autorización como lo necesites
    res.send("¡Su autorizacion fue todo un Exito! ");
    const propietarioId = 2; //<- aca deberia recibir el idPropietario enviado desde el front
    storeTokens(codigoAutorizacion,propietarioId, res);
    
};



module.exports = createAccessToken