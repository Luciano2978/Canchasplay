const connection = require("../config");


const GetVerifiacionProp = (req, res) =>{
    const userID = req.params.id;

    console.log(userID)
   
    const DatosProp = `SELECT p.Verificado, COUNT(*) AS cantidad_de_complejos_relacionados
    FROM propietario p
    JOIN cuenta cu ON p.Cuenta_id_Cuenta = cu.id_Cuenta
    LEFT JOIN complejo c ON p.id_Propietario = c.Propietario_id_Propietario
    WHERE cu.id_Cuenta = ?
    GROUP BY p.Verificado`
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