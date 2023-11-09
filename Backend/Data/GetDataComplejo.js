const connection = require("../config");

const getDataComplejo = (req, res) => {
    const dataComplejoQuery = `
      SELECT 
          id_Complejo,
          nombre_Lugar,
          logo_Complejo,
          latitud,
          longitud,
          ubicacion_Detallada,
          estado_Complejo,
          COUNT(cm.id_Comentario) AS totalComentarios,
          AVG(cm.calificacion) AS calificacionPromedio
      FROM complejo co 
      JOIN Ubicacion ub ON co.Ubicacion_id_Ubicacion = ub.id_Ubicacion
      LEFT JOIN comentario cm ON co.id_Complejo = cm.complejo_Id
      GROUP BY co.id_Complejo`;
  
    try {
      connection.query(dataComplejoQuery, (err, results) => {
        if (err) {
          console.log("Error al obtener datos del complejo: " + err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          // Convertir el logo_Complejo en una cadena base64 si existe
          results = results.map((result) => {
            if (result.logo_Complejo) {
              const base64Image = Buffer.from(result.logo_Complejo, 'binary').toString('base64');
              result.logo_Complejo = `data:image/jpeg;base64,${base64Image}`;
            }
            return result;
          });
  
          res.json(results);
        }
      });
    } catch (err) {
      console.log("Error inesperado: " + err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  
  

const getComentarios = (req,res) =>{
    const idComplejo = req.body.idCom;
    const dataComentarios = `SELECT 
    texto_Comentario, 
    calificacion, 
    fecha_Hora,
    titulo,
    complejo_Id 
    FROM comentario cm
    join complejo co on cm.complejo_Id = co.id_Complejo where co.id_Complejo = ${idComplejo}`;
    connection.query(dataComentarios, (err, results) => {
        if(err){
            console.log("Error al obtener datos del complejo " + err);
        }
        else{
            res.json(results);

        }
    })
    
}


module.exports = {getDataComplejo,getComentarios}