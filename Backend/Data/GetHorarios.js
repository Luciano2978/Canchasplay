const connection = require("../config");

const getDataHorarios = (req, res) =>{

    const canchaId = req.params.canchaId;

    const selectHorario= 'SELECT * FROM horarios_disponibles WHERE Cancha_id_Cancha = ?';
    connection.query(selectHorario, [canchaId], (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ' + err.message);
          res.status(500).send('Error en el servidor');
        } else {
          res.json(results);
        }
      });
    
}

module.exports = getDataHorarios;
