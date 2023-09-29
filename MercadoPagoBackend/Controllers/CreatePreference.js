const {refreshAccessToken}= require("./OAuthController");
const mysql = require('mysql2');
const mercadopago = require("mercadopago");




const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'canchasplay'
  })
  


const createPreference = (req, res) => {

    connection.query('CALL VerificarPropietario(?, @resultado, @idPropietario)', [req.body.idComplejo], function(err, rows) {
        if (err) {
          throw err;
        }
        connection.query('SELECT @resultado AS resultado, @idPropietario AS idPropietario', function(err, rows) {
          if (err) {
            throw err;
          }
    
          const resultado = rows[0].resultado;
          const id_Propietario = rows[0].idPropietario; 
          
          if (resultado === 1) {
            refreshAccessToken(id_Propietario, (error, newAccessToken) => {
                if (error) {
                  // Manejar el error, por ejemplo, reintentar más tarde o notificar al usuario
                  console.error('Error al obtener el token de acceso actualizado:', error);
                } else {
                  // Utilizar el nuevo token de acceso en tus operaciones con Mercado Pago
                  try {   
                    mercadopago.configure({
                      access_token: newAccessToken,
                    });
                    
                    let preference = {
                        items: [
                          {
                            title: req.body.description,
                            unit_price: Number(req.body.price),
                            quantity: Number(req.body.quantity),
                            
                          },
                        ],
                        payer: {
                          name: "Luciano",
                          surname: "Rojas",
                          email: "luciano297801@gmail.com",
                          phone: {
                              area_code: "3704",
                              number: 518541
                          },
                          identification: {
                              type: "DNI",
                              number: "43452239"
                          },
                    
                        },
                        back_urls: {
                          success: "http://localhost:3000",
                          failure: "http://localhost:3000",
                          pending: "",
                        },
                        binary_mode: true,
                        auto_return: "approved",
                        payment_methods: {
                          excluded_payment_types: [
                            {
                              id: "ticket"
                            }
                          ],
                          installments: 3
                        }
                      };
                    
                      mercadopago.preferences
                        .create(preference)
                        .then(function (response) {
                          res.json({
                            id: response.body.id,
                          });
                        })
                        .catch(function (error) {
                          console.log(error);
                      });
            
                }catch(error){
                    console.log(error);
                }
                }
            });
          } else {
            console.log('El id_Complejo no está vinculado a un id_Propietario.');
          }
      
          connection.end();
        });
    });

    
};




module.exports = createPreference;