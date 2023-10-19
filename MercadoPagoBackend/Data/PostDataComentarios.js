const axios = require('axios');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canchasplay'
})





const postComentario = (req,res) => {
    
    const {titulo, texto_Comentario,calificacion,complejo_Id} = req.body

    

}



module.exports = postComentario