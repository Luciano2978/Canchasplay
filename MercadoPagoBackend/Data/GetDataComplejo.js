const axios = require('axios');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canchasplay'
})


const getComplejo = (req,res) => {
    const dataComplejo = `
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
        join Ubicacion ub on co.Ubicacion_id_Ubicacion = ub.id_Ubicacion
        LEFT JOIN comentario cm ON co.id_Complejo = cm.complejo_Id
        GROUP BY co.id_Complejo`;
    connection.query(dataComplejo, (err, results) => {
        if(err){
            console.log("Error al obtener datos del complejo " + err);
        }
        else{
            res.json(results);

        }
    })

}

const getComentarios = (req,res) =>{
    const dataComentarios = `SELECT 
    texto_Comentario, 
    calificacion, 
    fecha_Hora,
    complejo_Id 
    FROM comentario cm
    join complejo co on cm.complejo_Id = co.id_Complejo`;
    
}


module.exports = {getComplejo,getComentarios}