const mysql = require("mysql");

const db = mysql.createConnection({
  port: 3306,
  host: '34.176.165.104',
  user: 'canchasplay12',
  password: 'canchasplay12',
  database: 'canchasplay',
});

 
const postDataUser = (req,res) => {

  const { userId, email, userMetadata } = req.body;
  const correo = email;
  const nombre = userMetadata.nombre;
  const apellido = userMetadata.apellido;
  const telefono = userMetadata.telefono || "";
  const dni = userMetadata.dni;
  const rol = userMetadata.rol;

  console.log(req.body);
  const dataPersona = "INSERT INTO persona (dni, nombre, apellido, num_telefono) VALUES (?, ?, ?, ?)";
  const dataCuenta = "INSERT INTO cuenta (id_Cuenta, email, Persona_dni,Rol) VALUES (?, ?, ?, ?)";
  const dataCliente = "INSERT INTO cliente (Cuenta_id_Cuenta) VALUES (?)";
  const dataPropietario = "INSERT INTO  propietario  (Cuenta_id_Cuenta,Verificado) VALUES (?, ?)";
  // Primero, inserta el registro en la tabla Persona
  db.query(
    dataPersona,
    [dni, nombre, apellido, telefono], // Reemplaza 'Nombre1', 'Apellido1', 123456789 con los valores deseados
    (err, personaResult) => {
      if (err) {
        console.log(err);
        res.send("Error al registrar la persona");
      } else {
        // Luego, inserta el registro en la tabla Cuenta
        db.query(
          dataCuenta,
          [userId, email, dni, rol],
          (err, cuentaResult) => {
            if (err) {
              console.log(err);
              res.send("Error al registrar la cuenta");
            }         
            if (rol === "Usuario") {
              db.query(
                dataCliente,
                [userId],
                (err, clienteResult) => {
                  if (err) {
                    console.log(err);
                    res.send("Error al registrar datos Cliente");
                  } else {
                    res.send("Exito al guardar datos cliente");
                  }
                }
              );
            } else if (rol === "Propietario") {
              db.query(
                dataPropietario,
                [userId, 0 ],
                (err, clienteResult) => {
                  if (err) {
                    console.log(err);
                    res.send("Error al registrar datos Propietario");
                  } else {
                    res.send("Exito al guardar datos Propietario");
                  }
                }
              );
            }
          }
        );
      }
    }
  );

}


module.exports = postDataUser;