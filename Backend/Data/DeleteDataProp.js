const connection = require("../config");

const DeleteDataProp = async (req, res) => {
  const { data } = req.body;
  console.log(data);
  
  connection.query('CALL CambiarEstadoPropietario(?)', [data.id_Propietario], function(err, rows) {
    if (err) {
      console.log(err);
    }
    else{
      console.log("Estado Modificado :)")
    }

});



};

module.exports = DeleteDataProp;
