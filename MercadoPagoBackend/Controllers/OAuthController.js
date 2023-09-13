const axios = require('axios');
const mysql = require('mysql2');
const { usarAccessToken } = require('../config');
// Importa la función desde otroArchivo.js


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canchasplay',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

//aca tengo que obtener el code//

const clientSecret = '1pm10OS5iyjRODJ7JejUyIhun1c0mbn6';
const clientId = '3777467651088385';
const redirectUri = 'https://39d1-190-5-160-149.ngrok-free.app';




function storeTokens(codigoAutorizacion, propietarioId) {
    return new Promise((resolve, reject) => {
    const data = {
        client_secret: clientSecret,
        client_id: clientId,
        grant_type:'authorization_code',
        code: codigoAutorizacion,
        redirect_uri: redirectUri,
    };
  
    axios.post('https://api.mercadopago.com/oauth/token', data)
      .then(response => {
        // Obtén los tokens de la respuesta de MercadoPago
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        const expiresIn = response.data.expires_in;
        const publicKey = response.data.public_key;
  
        // Consulta SQL para insertar los datos en la tabla cuenta_mp
        const query = 'INSERT INTO cuenta_mp (accesToken, refreshToken, expiresIn, publicKey, Propietario_id,code) VALUES (?, ?, ?, ?, ?,?)';
        const values = [accessToken, refreshToken, expiresIn, publicKey, propietarioId,codigoAutorizacion];
  
        connection.query(query, values, (err, results) => {
            if (err) {
              console.error('Error al insertar datos en la base de datos:', err);
              reject(err);
            } else {
              // Resuelve la promesa con los datos insertados
              resolve({
                accessToken,
                refreshToken,
                expiresIn,
                publicKey,
                codigoAutorizacion,
              });
            }
          });
        })
        .catch(error => {
          console.error('Error al renovar el token de acceso:', error);
          reject(error);
        });
    })
  }
  
  
  


function refreshAccessToken(callback) {

        // Recupera el refresh_token de la base de datos para el vendedor específico
        const consultaRefreshToken = 'SELECT refreshToken,code,publicKey FROM cuenta_mp WHERE Propietario_id = ?';

        connection.query(consultaRefreshToken, [1], (err, results) => {
        if (err) {
            console.error('Error al recuperar el refresh_token de la base de datos:', err);
            //callback(err, null);
        } else {
            
            const refreshToken = results[0].refreshToken; // Asumiendo que recuperas el valor correctamente
            const code = results[0].code; // Recupera el código de autorización


            const refreshTokenData = {
                client_secret: clientSecret,
                client_id: clientId,
                code: code,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            };

            axios
            .post('https://api.mercadopago.com/oauth/token', refreshTokenData)
            .then(response => {
                const newAccessToken = response.data.access_token;
                const newRefreshToken = response.data.refresh_token;
                const expiresIn = response.data.expires_in;

                // Llama al callback con el nuevo token de acceso
                callback(null, newAccessToken);
            })
            .catch(error => {
                console.error('Error al renovar el token de acceso:', error);
                callback(error, null);
            });
          } 
    });
}



function getPublickKey(callback){
  const consultaRefreshToken = 'SELECT publicKey FROM cuenta_mp WHERE Propietario_id = ?';

        connection.query(consultaRefreshToken, [1], (err, results) => {
        if (err) {
            console.error('Error al recuperar el refresh_token de la base de datos:', err);
            //callback(err, null);
        } else {
          const publicKey = results[0].code;

          callback(null,publicKey);
        } 
      })
}


module.exports = {storeTokens,refreshAccessToken,getPublickKey}
