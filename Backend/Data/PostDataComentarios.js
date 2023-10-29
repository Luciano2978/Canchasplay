const connection = require("../config");




const postComentario = (req,res) => {
    
    const {titulo, texto_Comentario,calificacion,complejo_Id} = req.body

    const postTableComentarios = `INSERT INTO comentario (texto_Comentario,calificacion,complejo_Id,titulo) VALUES (?,?, ?, ?)`;

    connection.query(postTableComentarios,[texto_Comentario,calificacion,complejo_Id,titulo],(err,results) => {
      if(err){
        res.json({err})
      }else{
        console.log("Su Comentario fue generado con exito")
        res.json({results})
      }
    })
    

}



module.exports = postComentario