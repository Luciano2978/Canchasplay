const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "canchasplay",
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

  // Primero, inserta el registro en la tabla Persona
  db.query(
    "INSERT INTO Persona (dni, nombre, apellido, num_telefono) VALUES (?, ?, ?, ?)",
    [dni, nombre, apellido, telefono], // Reemplaza 'Nombre1', 'Apellido1', 123456789 con los valores deseados
    (err, personaResult) => {
      if (err) {
        console.log(err);
        res.send("Error al registrar la persona");
      } else {
        // Luego, inserta el registro en la tabla Cuenta
        db.query(
          "INSERT INTO Cuenta (id_Cuenta, email, Persona_dni,Rol) VALUES (?, ?, ?, ?)",
          [userId, email, dni, rol],
          (err, cuentaResult) => {
            if (err) {
              console.log(err);
              res.send("Error al registrar la cuenta");
            }         
            if (rol === "Usuario") {
              db.query(
                "INSERT INTO cliente (Cuenta_id_Cuenta) VALUES (?)",
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
                "INSERT INTO  propietario  (Cuenta_id_Cuenta,Verificado) VALUES (?, ?)",
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