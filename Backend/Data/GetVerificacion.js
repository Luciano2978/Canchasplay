const connection = require("../config");


const GetVerifiacionProp = (req, res) =>{
    const userID = req.params.id;

    console.log(userID)
   
    const DatosProp = `SELECT propietario.Verificado FROM propietario where Cuenta_id_Cuenta = ?`
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