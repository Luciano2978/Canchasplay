const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'canchasplay'
  })


const postDataUser = (req,res) => {

  const { userId, email, userMetadata } = req.body;
  const correo = email;
  const nombre = userMetadata.nombre;
  const apellido = userMetadata.apellido;
  const telefono = userMetadata.telefono;
  const dni = userMetadata.dni;

  // Primero, inserta el registro en la tabla Persona
  connection.query(
    "INSERT INTO Persona (dni, nombre, apellido, num_telefono) VALUES (?, ?, ?, ?)",
    [dni, nombre, apellido, telefono], // Reemplaza 'Nombre1', 'Apellido1', 123456789 con los valores deseados
    (err, personaResult) => {
      if (err) {
        console.log(err);
        res.send("Error al registrar la persona");
      } else {
        // Luego, inserta el registro en la tabla Cuenta
        connection.query(
          "INSERT INTO Cuenta (id_Cuenta, email, Persona_dni) VALUES (?, ?, ?)",
          [userId, email, dni],
          (err, cuentaResult) => {
            if (err) {
              console.log(err);
              res.send("Error al registrar la cuenta");
            } else {
              res.send("Registrado con éxito");
            }
          }
        );
      }
    }
  );
}


module.exports = postDataUser;