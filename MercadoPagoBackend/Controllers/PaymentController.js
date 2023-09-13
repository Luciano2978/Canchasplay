const mercadopago = require("mercadopago");
//importar el NewaccesToken
const { usarAccessToken } = require("../config"); // Importa la función desde oauth.js

const createPreference = async (req, res) => {   

    try {   
        const nuevoToken = usarAccessToken();
        mercadopago.configure({
          access_token: nuevoToken,
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
};

module.exports = createPreference;