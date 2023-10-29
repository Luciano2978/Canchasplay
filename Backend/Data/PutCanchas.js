const connection = require("../config");

const PutChancha = (req, res) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }

        const canchaId = req.params.id;
        const { deporte, info_Dimensiones, Caracteristicas, precio_Hora, nombre_Cancha } = req.body;

        if (!deporte && !info_Dimensiones && !Caracteristicas && !precio_Hora && !nombre_Cancha) {
            return res.status(400).send('Campos requeridos');
        }

        const canchaData = {
            deporte: deporte,
            info_Dimensiones: info_Dimensiones,
            Caracteristicas: Caracteristicas,
            precio_Hora: precio_Hora,
            nombre_Cancha: nombre_Cancha
        };

        connection.query('UPDATE cancha SET ? WHERE id_Cancha  = ?', [canchaData, canchaId], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error en el servidor');
            }

            res.send('Cancha actualizada');
        });
    

}

module.exports = { PutChancha }