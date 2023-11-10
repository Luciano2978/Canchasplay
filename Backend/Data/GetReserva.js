const connection = require("../config");






const getReserva = (req,res) => {
    
  
    const dataIdCliente = `select id_Cliente from cliente cl join cuenta cu on cl.Cuenta_id_cuenta = cu.id_Cuenta where email = '${req.body.email}'`;
    connection.query(dataIdCliente, (err,results) => {
      if(err){
        console.log("Error al obtener el id" + err);
      }
      try {
        var idCliente = results[0].id_Cliente ;
      } catch (error) {
        var idCliente = 0
      }
      

      const dataReserva = `
      select nombre_Lugar,cancha_Reservada,fecha_Reservada,hora_Reservada,metodo_Pago,informacion_Pago,id_Reserva,estado_Reserva,Complejo_id_Complejo
      from reserva re
      left join facturacion fa on re.id_Reserva = fa.Reserva_id_Reserva
      left join pago pa on  pa.id_Pago = fa.Pago_id_Pago
      join complejo co on re.Complejo_id_Complejo = co.id_Complejo where re.Cliente_id_Cliente = ${idCliente};`

    connection.query(dataReserva, (err,results) => {
      if(err){
        console.log("Error de la view" + err);
      }else{
         // Itera sobre los resultados y formatea la fecha
         const resultadosFormateados = results.map((resultado) => {
          // Formatea la fecha aquí, suponiendo que la columna de fecha se llama 'fecha'
          const fechaFormateada = resultado.fecha_Reservada.toISOString().split('T')[0];
          
          // Crea un nuevo objeto con la fecha formateada
          return {
              ...resultado,
              fecha_Reservada: fechaFormateada,
          };
      });

      res.json(resultadosFormateados);
      }
    })
  })
}



module.exports = getReserva