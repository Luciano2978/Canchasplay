const connection = require("../config");


const GetDataPropietario = (req, res) =>{
    const DatosProp = `SELECT persona.dni, persona.nombre, persona.apellido, persona.num_telefono, cuenta.id_Cuenta, cuenta.email,cuenta.Rol, propietario.certificado_comercio,propietario.id_Propietario,propietario.Verificado FROM persona 
    INNER JOIN cuenta ON persona.dni = cuenta.Persona_dni 
    INNER JOIN propietario on cuenta.id_Cuenta = propietario.Cuenta_id_Cuenta`
    // Lógica para eliminar la cancha de la base de datos (consulta SQL de eliminación)
    connection.query(DatosProp, (err,result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }
        res.json(result);
    })


}

module.exports = GetDataPropietario