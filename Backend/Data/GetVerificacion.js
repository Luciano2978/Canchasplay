const connection = require("../config");


const GetVerifiacionProp = (req, res) =>{
    const userID = req.params.id;

    console.log(userID)
   
    const DatosProp = `SELECT p.Verificado, COUNT(c.id_Complejo) AS cantidad_de_complejos_relacionados
    FROM propietario p
    LEFT JOIN complejo c ON p.id_Propietario = c.Propietario_id_Propietario
    WHERE p.Cuenta_id_Cuenta = ?
    GROUP BY p.Verificado;`
    // Lógica para eliminar la cancha de la base de datos (consulta SQL de eliminación)
    connection.query(DatosProp, userID , (err,result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }
        res.json(result);
    })


}

module.exports = GetVerifiacionProp