const createPreference = (req, res) => {

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
            
          } 
      
          connection.end();
        });
    });

};

