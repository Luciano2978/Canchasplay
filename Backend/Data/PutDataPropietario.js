const connection = require("../config");

const putPropietario = (req, res) => {
  const {
    id_Propietario,
    id_Cuenta,
    nombre,
    apellido,
    num_telefono,
    Verificado,
    certificado_comercio,
    dni,
    email,
  } = req.body;


  const propData = {
    certificado_comercio: certificado_comercio,
    Verificado: Verificado,
  };

  const propPersona = {
    dni: dni,
    nombre: nombre,
    apellido: apellido,
    num_telefono: num_telefono,
  };

  const propCuenta = { email: email };

  const updatePersona = "UPDATE persona SET ? WHERE dni = ?";
  const updateCuenta = "UPDATE cuenta SET ? WHERE id_Cuenta = ?";
  const updateProp = "UPDATE propietario SET ? WHERE id_Propietario = ?";

  connection.query(updatePersona, [propPersona, dni], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error en el servidor");
    }

    connection.query(updateCuenta, [propCuenta, id_Cuenta], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error en el servidor");
      }

      connection.query(updateProp, [propData, id_Propietario], (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error en el servidor");
        }

        res.send("Propietario actualizado");
      });
    });
  });
};

module.exports = putPropietario;
