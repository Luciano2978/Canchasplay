const connection = require("../config");


const postHorario = (req, res) =>{
        

        const { fecha, hora, Cancha_id_Cancha } = req.body;
        console.log(req.body)
        const horaData = {
            fecha: fecha,
            hora: hora,
            Cancha_id_Cancha: Cancha_id_Cancha,
            estado_Disponiblidad: 1,
        };
        const intoHora= 'INSERT INTO horarios_disponibles SET ?';

        connection.query( intoHora, horaData, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error en el servidor');
            }

            res.send('saved!');
        });
    
}


module.exports = {postHorario}