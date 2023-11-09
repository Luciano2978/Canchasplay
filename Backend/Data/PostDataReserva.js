const connection = require("../config");


const fechaActual = new Date();
  
const dia = fechaActual.getDate(); // Obtiene el día del mes (1-31)
const mes = fechaActual.getMonth() + 1; // Obtiene el mes (0-11), sumamos 1 para obtener el mes correcto (1-12)
const año = fechaActual.getFullYear(); // Obtiene el año con cuatro dígitos

const fechaAct = `${año}-${mes}-${dia}`;
const postReserva = (req, res) => {

    const {idHorario,idCancha,Hora,Fecha,PrecioReserva,email,status} = req.body;
    console.log(idHorario)
    const dataComplejoReservado = `
    select id_Complejo,deporte,nombre_Cancha,nombre_Lugar from cancha ca
    join complejo cm on ca.Complejo_id_Complejo = cm.id_Complejo  
    where ca.id_Cancha = ${idCancha}`;
    var OpcionPago = 12;
    var StatusPay = 2;
    if(status){
         OpcionPago = 2;
         StatusPay = 1;
    }

    connection.query(dataComplejoReservado, (err, results) => {
        if (err) {
            console.error('Error al añadir datos a la tabla complejo: ' + err.message);
        } else {
                const idComplejo = results[0].id_Complejo;
            
                const dataIdCliente = `select id_Cliente from cliente cl join cuenta cu on cl.Cuenta_id_cuenta = cu.id_Cuenta where email = '${email}'`;

                connection.query(dataIdCliente, (err,results) => {
                    if (err) {
                        console.error('Error al traer el id de Cliente: ' + err.message);
                    }                
                const idCliente = results[0].id_Cliente;

                const postTableReserva = `INSERT INTO reserva (fecha_Reservada,hora_Reservada,estado_Reserva,Cliente_id_Cliente,Complejo_id_Complejo) VALUES (?,?, ?, ?, ?)`;

                connection.query(postTableReserva, [Fecha,Hora,1,idCliente,idComplejo], (err, results) => {
                    if (err) {
                        console.error('Error al añadir datos a la tabla Reserva: ' + err.message);
                    } else {
                        console.log("Reserva Registrada")

                        const idReserva = results.insertId; // Obtiene el ID de la reserva recién creada
                        
                        const getNameCancha = `Select nombre_Cancha from cancha where id_Cancha = ${idCancha}`
                        connection.query(getNameCancha, (err,results) => {
                            if(err){
                                console.error(err.message)
                            }
                            const nombreCancha = results[0].nombre_Cancha
                        
                        const postTableFacturacion = `INSERT INTO facturacion (monto_Total,fecha_Pago,Cliente_id_Cliente,Reserva_id_Reserva,Pago_id_Pago,estado_Pago,cancha_Reservada) VALUES (?,?,?,?,?,?,?)`

                        connection.query(postTableFacturacion, [PrecioReserva,fechaAct,idCliente,idReserva,OpcionPago,StatusPay,nombreCancha], (err, results) => {
                            if (err) {
                                console.error('Error al añadir datos a la tabla facturacion: ' + err.message);
                            }
                                res.send("Se añadio correctamente")
                                connection.query('CALL ActualizarHorarioDisponible(?, ?)', [idHorario, 0], (err, results) => {
                                    if (err) {
                                      console.error('Error al llamar al procedimiento almacenado: ' + err.message);
                                      
                                    } else {
                                      console.log('Procedimiento almacenado llamado exitosamente');
                                    }
                                  });
            
                        });
                    })
                    }
                });
            }) 
        }
        
    });

    
};





module.exports = postReserva