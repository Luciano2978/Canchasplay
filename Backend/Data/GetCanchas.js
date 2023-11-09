const connection = require("../config");


const getCancha = (req, res) => {
    const {id_Cuenta} = req.body
    
    const searchIdPropietario = `SELECT propietario.id_Propietario FROM propietario 
    INNER JOIN cuenta ON propietario.Cuenta_id_Cuenta = cuenta.id_Cuenta 
    WHERE cuenta.id_Cuenta = ?`;
    connection.query(searchIdPropietario, [id_Cuenta], (err, results) => {
        if (err) {
            console.log("Error al buscar el propietario:", err);
            connection.rollback(() => {
                console.error('Error al buscar el propietario:', err);
                connection.end();
                return res.status(500).send('Error en el servidor');
            });
       }
        if (results.length === 0) {
            console.log('No se encontró el propietario');
            connection.rollback(() => {
                console.error('No se encontró el propietario');
                connection.end();
                return res.status(404).send('No se encontró el propietario');
            });
        } else {
            const idPropietario = results[0].id_Propietario; 
    
            const selectCancha = 'select * from cancha join complejo on cancha.Complejo_id_Complejo = complejo.id_Complejo where Propietario_id_Propietario = ?'
            connection.query(selectCancha, [idPropietario],(err, rows) => {
                if (err) return res.send(err)
        
                res.json(rows)
            })
        
        }
    })
    
    
}

module.exports = {getCancha}