

const postHorario = (req, res) =>{
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }

        const { fecha, hora, Cancha_id_Cancha } = req.body;
        console.log(req.body)
        const horaData = {
            fecha: fecha,
            hora: hora,
            Cancha_id_Cancha: Cancha_id_Cancha,
            estado_Disponiblidad: 1,
        };

        conn.query('INSERT INTO horarios_disponibles SET ?', horaData, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error en el servidor');
            }

            res.send('saved!');
        });
    });
}


module.exports = {postHorario}