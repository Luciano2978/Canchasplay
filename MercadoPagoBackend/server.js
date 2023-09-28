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


app.post("/getDatos", async (req, res) => {
  console.log(req.body)
  const { userId, email, userMetadata } = req.body;
  const correo = email;
  const nombre = userMetadata.nombre;
  const apellido = userMetadata.apellido;
  const telefono = userMetadata.telefono;
  const dni = userMetadata.dni;



  // Primero, inserta el registro en la tabla Persona
  connection.query(
    "INSERT INTO Persona (dni, nombre, apellido, num_telefono) VALUES (?, ?, ?, ?)",
    [dni, nombre, apellido, telefono], // Reemplaza 'Nombre1', 'Apellido1', 123456789 con los valores deseados
    (err, personaResult) => {
      if (err) {
        console.log(err);
        res.send("Error al registrar la persona");
      } else {
        // Luego, inserta el registro en la tabla Cuenta
        connection.query(
          "INSERT INTO Cuenta (id_Cuenta, email, Persona_dni) VALUES (?, ?, ?)",
          [userId, email, dni],
          (err, cuentaResult) => {
            if (err) {
              console.log(err);
              res.send("Error al registrar la cuenta");
            } else {
              res.send("Registrado con éxito");
            }
          }
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log("the server is now running on port 8080");
});




