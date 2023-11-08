const connection = require("../config");

const DeleteHorario = (req, res) => {

    const horarioId = req.params.id;
    const horarioQuery = 'DELETE FROM horarios_disponibles WHERE id_Cancha = ?'
    connection.query(horarioQuery, horarioId, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }
        res.send('Horario eliminada');
    })


}

module.exports = { DeleteHorario }