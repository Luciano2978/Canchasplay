const connection = require("../config");

const DeleteDataProp = async (req, res) => {
  const { id_Cuenta, dni } = req.body;

  console.log(req.body)

  const propData = "DELETE FROM propietario WHERE Cuenta_id_Cuenta = ?";
  const propCuenta = "DELETE FROM cuenta WHERE id_Cuenta = ?";
  const propPersona = "DELETE FROM persona WHERE dni = ?";

  try {
    // Lógica para eliminar la cancha de la base de datos (consulta SQL de eliminación)
    await executeQuery(propData, [id_Cuenta]);
    await executeQuery(propCuenta, [id_Cuenta]);
    await executeQuery(propPersona, [dni]);

    res.send("Registros eliminados correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error en el servidor");
  }
};

const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = DeleteDataProp;
