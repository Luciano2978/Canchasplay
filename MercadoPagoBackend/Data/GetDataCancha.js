const axios = require('axios');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canchasplay'
})


const getCanchas = (req,res) => {
    const idComplejo = req.body.idCom
    const dataCanchas = `select * from cancha ca left join horarios_disponibles hd on ca.id_Cancha = hd.Cancha_id_Cancha where ca.Complejo_id_Complejo = ${idComplejo}`;
    connection.query(dataCanchas, (err, results) => {
        if(err){
            console.log("Error al obtener datos de la cancha " + err);
        }
        else{
            res.json(results);

        }
    })

}



module.exports = getCanchas