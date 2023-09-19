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
    database: "canchasplay"
})



app.post("/createCancha", (req, res) => {
    const deporte = req.body.deporte;
    const Caracteristicas = req.body.Caracteristicas;
    const precio_Hora = req.body.precio_Hora;
    const info_Dimensiones = req.body.info_Dimensiones;
/*     const ancho = req.body.ancho;
 */    const ubicacion_Detallada = req.body.ubicacion_Detallada;
    const latitud = req.body.latitud;
    const longitud = req.body.longitud;
    const archivo = req.body.archivo;

    db.query('INSERT INTO cancha(deporte, info_Dimensiones, Caracteristicas , Complejo_id_Cancha, precio_Hora  ) VALUES ( ?, ?, ?, ?, ?)',
        [deporte, info_Dimensiones, Caracteristicas, 1, precio_Hora],
        (err, result) => {
            if (err) {
                console.log(err)

            } else {
                res.send("registrado con exito")
            }
        }
    );
    db.query('INSERT INTO ubicacion(latitud, longitud, ubicacion_Detallada ) VALUES ( ?, ?, ?)',
        [latitud, longitud, ubicacion_Detallada],
        (err, result) => {
            if (err) {
                console.log(err)

            } else {
                res.send("registrado con exito")
            }
        }
    );
    /* db.query('INSERT INTO archivos( archivo ) VALUES ( ?)',
     [  archivo],
        (err, result) => {
            if (err) {
                console.log(err)
 
            }else{
                res.send("registrado con exito")
            }
        }
    ); */
});

app.get("/getCancha", (req, res) => {

    db.query('SELECT * FROM cancha', (err, rows) => {
        if (err) return res.send(err)

        res.json(rows)
    })

})



app.listen(8080, () => {
    console.log("corriendo en el puerto 8080")
})