const connection = require("../config");




const getCanchas = (req, res) => {
    const idComplejo = req.body.idCom;
    const dataCanchas = `
      SELECT
        id_Cancha,
        deporte,
        info_Dimensiones,
        Caracteristicas,
        precio_Hora,
        nombre_Cancha,
        Complejo_id_Complejo,
        img_Cancha
      FROM cancha ca 
      WHERE ca.Complejo_id_Complejo = ${idComplejo}`;
  
    connection.query(dataCanchas, (err, results) => {
      if (err) {
        console.log("Error al obtener datos de la cancha: " + err);
        res.status(500).json({ error: "Error al obtener datos de la cancha" });
      } else {
        // Convertir el img_Cancha en una cadena base64 si existe
        results = results.map((result) => {
          if (result.img_Cancha) {
            const base64Image = Buffer.from(result.img_Cancha, 'binary').toString('base64');
            result.img_Cancha = `data:image/jpeg;base64,${base64Image}`;
          }
          return result;
        });
  
        res.json(results);
      }
    });
  };
  

const getHorariosDisponibles = (req, res) => {
    const idCancha = req.body.idCancha;
    const dataHorarios = `SELECT * from horarios_disponibles hd where hd.Cancha_id_Cancha = ${idCancha}`;
    
    connection.query(dataHorarios, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener datos de los horarios" });
        } else {
            // Itera sobre los resultados y formatea la fecha
            const resultadosFormateados = results.map((resultado) => {
                // Formatea la fecha aquí, suponiendo que la columna de fecha se llama 'fecha'
                const fechaFormateada = resultado.fecha.toISOString().split('T')[0];
                
                // Crea un nuevo objeto con la fecha formateada
                return {
                    ...resultado,
                    fecha: fechaFormateada,
                };
            });

            res.json(resultadosFormateados);
        }
    });
};





module.exports = {getCanchas,getHorariosDisponibles}