
const {storeTokens}= require("./OAuthController");




const createAccessToken = (req, res) => {
    const url = new URL(req.url, 'https://zh7ntj18-8080.brs.devtunnels.ms/'); // Reemplaza con tu dominio real
    // Obtén el valor del parámetro 'code' de la URL
    const codigoAutorizacion = url.searchParams.get('code');
    // Aquí puedes manejar el código de autorización como lo necesites
    res.send("¡Su autorizacion fue todo un Exito! ");
    const propietarioId = 2; //<- aca deberia recibir el idPropietario enviado desde el front
    storeTokens(codigoAutorizacion,propietarioId, res);
    
};



module.exports = createAccessToken