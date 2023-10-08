const axios = require('axios');
const mysql = require('mysql2');
require('dotenv').config();
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
 
const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;
const redirectUri = `${process.env.REDIRECT_URI}/createAccessToken`;


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
        const user_id = response.data.user_id;
        // Consulta SQL para insertar los datos en la tabla cuenta_mp
        const query = 'INSERT INTO cuenta_mercadopago (id_Cuenta_Mp, accessToken, refreshToken,publicKey, Propietario_id_Propietario,code) VALUES (?,?, ?, ?, ?, ?)';
        const values = [user_id,accessToken, refreshToken, publicKey, propietarioId,codigoAutorizacion];
  
        connection.query(query, values, (err, results) => {
            if (err) {
              console.error('Error al insertar datos en la base de datos:', err);
              reject(err);
            } else {
              // Resuelve la promesa con los datos insertados
              resolve({
                accessToken,
                refreshToken,
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
  
  
  


  function refreshAccessToken(id_Propietario, callback) {
    // Recupera el refresh_token de la base de datos para el vendedor específico
    const consultaRefreshToken = 'SELECT refreshToken, code, publicKey FROM cuenta_mercadopago WHERE Propietario_id_Propietario = ?';
  
    connection.query(consultaRefreshToken, [id_Propietario], (err, results) => {
      if (err) {
        console.error('Error al recuperar el refresh_token de la base de datos:', err);
        callback(err, null);
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



function getPublickKeyFunction(id_Propietario,callback){
  const consultaPublicKey = 'SELECT publicKey FROM cuenta_mercadopago WHERE Propietario_id_Propietario=?';

        connection.query(consultaPublicKey, [id_Propietario], (err, results) => {
        if (err) {
            console.error('Error al recuperar el refresh_token de la base de datos:', err);
            //callback(err, null);
        } else {
          try {
            const publicKey = results[0].publicKey;  
            callback(publicKey );
          } catch (error) {
            const publicKey = ""
            callback(publicKey)
          } 
        } 
      })
}


module.exports = {storeTokens,refreshAccessToken,getPublickKeyFunction}
