const axios = require('axios');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canchasplay'
})


const postReserva = (req, res) => {
    const {idCancha,Hora,Fecha,PrecioReserva} = req.body;

    const dataComplejoReservado = `
    select id_Complejo,deporte,nombre_Cancha,nombre_Lugar from cancha ca
    join complejo cm on ca.Complejo_id_Complejo = cm.id_Complejo  
    where ca.id_Cancha = ${idCancha}`;
 
    connection.query(dataComplejoReservado, (err, results) => {
        if (err) {
            console.log("Error al obtener datos de la cancha " + err);
            res.status(500).json({ error: "Error al obtener datos de la cancha" });
        } else {

            const idComplejo = results[0].id_Complejo;

            const postTableReserva = `INSERT INTO reserva (fecha_Reservada,hora_Reservada,estado_Reserva,Cliente_id_Cliente,Complejo_id_Complejo) VALUES (?,?, ?, ?, ?)`;

            connection.query(postTableReserva, [Fecha,Hora,1,1,idComplejo], (err, results) => {
                if (err) {
                    console.log("Error al obtener datos de la cancha " + err);
                    res.status(500).json({ error: "Error al obtener datos de la cancha" });
                } else {
                    res.send("Registrado con éxito");
                }
            });
       
        }
    });

    
};





module.exports = postReserva