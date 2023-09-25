const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require('mysql2');
const {storeTokens,refreshAccessToken,getPublickKey}= require("./Controllers/OAuthController");
const mercadopago = require("mercadopago");
const { URL } = require('url'); // Importa el módulo URL de Node.js
const router = require("./Routes/Routes")


app.use(express.json());
app.use(cors());
app.use(router);
const port = 8080


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



//este lo dejo para ver si funca el sv nomas
app.get("/", function (req, res) {
  const url = new URL(req.url, 'https://zh7ntj18-8080.brs.devtunnels.ms/'); // Reemplaza con tu dominio real
  // Obtén el valor del parámetro 'code' de la URL
  const codigoAutorizacion = url.searchParams.get('code');
  // Aquí puedes manejar el código de autorización como lo necesites
  res.send("¡Su autorizacion fue todo un Exito! ");
  //res.send("el servidor de mercado pago funciona! :)");
  const propietarioId = 2;
  storeTokens(codigoAutorizacion,propietarioId, res);
});





// Función para verificar el correo electrónico
function verificarCorreoElectronico(email, callback) {
  const sql = 'SELECT VerificarEmail(?) AS cuenta';
  connection.query(sql, [email], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results[0].cuenta);
    }
  });
}


app.post('/get_PublicKey', (req, res) => {
  const dataReceived = req.body.correo;
  console.log(dataReceived);
  verificarCorreoElectronico(dataReceived, (error, cuenta) => {
    if(error){
      console.log("Error: ", error);
    }else{
      if(cuenta > 0 ){
        getPublickKey((publicKey) => {
          console.log(publicKey)
          res.json(publicKey)
        })
      }
      else{
        console.log("noup")
      }
    }
  })
});


app.post("/create_preference", function (req, res) {
  verificarCorreoElectronico(req.body.Correo, (error, cuenta) => {
    if (error) {
      console.error('Error:', error);
    } else {
      if (cuenta > 0) {
        refreshAccessToken((error, newAccessToken) => {
          if (error) {
            // Manejar el error, por ejemplo, reintentar más tarde o notificar al usuario
            console.error('Error al obtener el token de acceso actualizado:', error);
          } else {
            // Utilizar el nuevo token de acceso en tus operaciones con Mercado Pago
            console.log(newAccessToken)
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
        console.log("creo access")
      }
    }
  });
});
 

app.listen(port, () => {
  console.log("the server is now running on port 8080");
});




