/* const express = require('express');
const routes = express.Router()

const cors = require ('cors');
app.use(cors())
 
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM prueba', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/api', (req, res) => {
    // Recibir los datos enviados desde Axios
    const { tipoCancha, descripcion, precioHora, ubicacion, largo, ancho, lat, lng } = req.body;
  
    // Consulta SQL para insertar datos en la tabla 'prueba'
    const sql = "INSERT INTO prueba (tipoCancha, descripcion, precioHora, ubicacion, largo, ancho, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
    // Ejecutar la consulta
    db.query(sql, [tipoCancha, descripcion, precioHora, ubicacion, largo, ancho, lat, lng], (err, result) => {
      if (err) {
        console.error('Error al insertar datos: ' + err.message);
        res.status(500).json({ error: 'Error al insertar datos' });
      } else {
        console.log('Datos insertados correctamente');
        res.json({ message: 'Datos insertados correctamente' });
      }
    });
  });
  

/* routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM prueba WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('file excluded!')
        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE prueba set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('file updated!')
        })
    })
}) */

module.exports = routes */