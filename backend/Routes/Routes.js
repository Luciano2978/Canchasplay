const express = require('express');

const { postComplejo, fileUpload_Logo } = require('../Data/PostDataComplejo');
const { PostCancha, fileUpload_imgCancha } = require('../Data/PostDataCancha');
const { getCancha } = require('../Data/GetCanchas');
const { PutChancha } = require('../Data/PutCanchas');
const DeleteCancha = require('../Data/DeleteCanchas');
const { postHorario } = require('../Data/PostDataHorario');
const { getComplejo } = require('../Data/GetComplejo');
const PutEstadoComplejo = require('../Data/PutEstadoComplejo');

const router = express.Router();

///Routes

router.post('/images/post', fileUpload_Logo, postComplejo);
router.post('/createCancha', fileUpload_imgCancha, PostCancha);
router.get('/getCancha', getCancha);
router.put('/editCancha/:id', PutChancha);
router.delete('/deleteCancha/:id', DeleteCancha);
router.post('/createHorario', postHorario);
router.get("/getComplejo", getComplejo);
router.put("/putEstado", PutEstadoComplejo)

/* router.get('/getCancha', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM cancha', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
}) */

/* router.put('/editCancha/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }

        const canchaId = req.params.id;
        const { deporte, info_Dimensiones, Caracteristicas, precio_Hora, nombre_Cancha } = req.body;

        if (!deporte && !info_Dimensiones && !Caracteristicas && !precio_Hora && !nombre_Cancha) {
            return res.status(400).send('Campos requeridos');
        }

        const canchaData = {
            deporte: deporte,
            info_Dimensiones: info_Dimensiones,
            Caracteristicas: Caracteristicas,
            precio_Hora: precio_Hora,
            nombre_Cancha: nombre_Cancha
        };

        conn.query('UPDATE cancha SET ? WHERE id_Cancha  = ?', [canchaData, canchaId], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error en el servidor');
            }

            res.send('Cancha actualizada');
        });
    });
}); */

/* router.delete('/deleteCancha/:id', (req, res) => {
    const canchaId = req.params.id;
    req.getConnection((err, conn) => {
    // Lógica para eliminar la cancha de la base de datos (consulta SQL de eliminación)
    conn.query('DELETE FROM cancha WHERE id_Cancha = ?', canchaId, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }
        res.send('Cancha eliminada');
    })
})
}); */


module.exports = router;


/* routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM prueba', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
}) */
/* 
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
  }); */


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