const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection')
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "prueba"
})



app.post("/createCancha", (req, res) => {
    const tipoCancha = req.body.tipoCancha;
    const descripcion = req.body.descripcion;
    const precioHora = req.body.precioHora;
    const largo = req.body.largo;
    const ancho = req.body.ancho;
    const ubicacion = req.body.ubicacion;
    const lat = req.body.lat;
    const lng = req.body.lng;

    db.query('INSERT INTO prueba(tipoCancha, descripcion, precioHora, largo, ancho, ubicacion, lat, lng ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
     [tipoCancha, descripcion, precioHora, largo, ancho, ubicacion, lat, lng],
        (err, result) => {
            if (err) {
                console.log(err)

            }else{
                res.send("registrado con exito")
            }
        }

    );

});



app.listen(8080, () => {
    console.log("corriendo en el puerto 8080")
})