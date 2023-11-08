const connection = require("../config");

const PutHorario = (req, res) => {
        

        const horarioId = req.params.id;
        const updateCancha='UPDATE horarios_disponibles SET ? WHERE id_Cancha  = ?'

        connection.query( updateCancha, [ horarioId], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error en el servidor');
            }

            res.send('Horario actualizado');
        });
    

}

module.exports = { PutHorario }