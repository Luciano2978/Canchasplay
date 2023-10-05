const axios = require('axios');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canchasplay'
})

const fechaActual = new Date();
  
const dia = fechaActual.getDate(); // Obtiene el día del mes (1-31)
const mes = fechaActual.getMonth() + 1; // Obtiene el mes (0-11), sumamos 1 para obtener el mes correcto (1-12)
const año = fechaActual.getFullYear(); // Obtiene el año con cuatro dígitos

const fechaAct = `${año}-${mes}-${dia}`;
const postReserva = (req, res) => {
    const {idCancha,Hora,Fecha,PrecioReserva} = req.body;

    const dataComplejoReservado = `
    select id_Complejo,deporte,nombre_Cancha,nombre_Lugar from cancha ca
    join complejo cm on ca.Complejo_id_Complejo = cm.id_Complejo  
    where ca.id_Cancha = ${idCancha}`;
 
    connection.query(dataComplejoReservado, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener datos del complejo" });
        } else {

            const idComplejo = results[0].id_Complejo;

            const postTableReserva = `INSERT INTO reserva (fecha_Reservada,hora_Reservada,estado_Reserva,Cliente_id_Cliente,Complejo_id_Complejo) VALUES (?,?, ?, ?, ?)`;

            connection.query(postTableReserva, [Fecha,Hora,1,1,idComplejo], (err, results) => {
                if (err) {
                    res.status(500).json({ error: "Error al insertar datos de la reserva" });
                } else {
                    console.log("Reserva Registrada")

                    const idReserva = results.insertId; // Obtiene el ID de la reserva recién creada
                    
                    const postTableFacturacion = `INSERT INTO facturacion (monto_Total,fecha_Pago,Cliente_id_Cliente,Reserva_id_Reserva,Pago_id_Pago,estado_Pago) VALUES (?,?,?,?,?,?)`

                    connection.query(postTableFacturacion, [PrecioReserva,fechaAct,1,idReserva,12,2], (err, results) => {
                        if (err) {
                            res.status(500).json({ error: "Error al insertar datos de la reserva" });
                        }
        
                    });
                }
            });
       
        }
    });

    
};





module.exports = postReserva