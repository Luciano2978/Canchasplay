const mysql = require('mysql2');
const {getPublickKeyFunction} = require("../Controllers/OAuthController");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canchasplay'
})




const getPublickKey = (req, res) => {

    connection.query('CALL VerificarPropietario(?, @resultado, @idPropietario)', [req.body.idComplejo], function(err, rows) {
        if (err) {
          throw err;
        }
        connection.query('SELECT @resultado AS resultado, @idPropietario AS idPropietario', function(err, rows) {
          if (err) {
            throw err;
          }
    
          const resultado = rows[0].resultado;
          const id_Propietario = rows[0].idPropietario; 
          
          if (resultado === 1) {
            getPublickKeyFunction(id_Propietario,(publicKey) => {
              res.json(publicKey)
            })
          } 
        });
    });

};


module.exports = getPublickKey;
