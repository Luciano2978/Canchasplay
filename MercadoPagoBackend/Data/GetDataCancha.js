const axios = require('axios');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canchasplay'
})


const getCanchas = (req, res) => {
    const idComplejo = req.body.idCom;
    const dataCanchas = `select * from cancha ca where ca.Complejo_id_Complejo = ${idComplejo}`;
    
    connection.query(dataCanchas, (err, results) => {
        if (err) {
            console.log("Error al obtener datos de la cancha " + err);
            res.status(500).json({ error: "Error al obtener datos de la cancha" });
        } else {

            res.json(results);
        }
    });
};

const getHorariosDisponibles = (req, res) => {
    const idCancha = req.body.idCancha;
    const dataHorarios = `select * from horarios_disponibles hd where hd.Cancha_id_Cancha = ${idCancha}`;
    
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