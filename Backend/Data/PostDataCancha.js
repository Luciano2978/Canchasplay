// Configuración de multer para el almacenamiento de imágenes

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connection = require("../config");

const diskstorage_Cancha = multer.diskStorage({
    destination: path.join(__dirname, '../image-Canchas'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-Cancha-' + file.originalname);
    }
});

const fileUpload_imgCancha = multer({
    storage: diskstorage_Cancha
}).single('img_Cancha');

const PostCancha = (req, res) => {
    const { deporte, info_Dimensiones, Caracteristicas, precio_Hora, nombre_Cancha, id_Cuenta } = req.body;
    const searchIdPropietario = `SELECT complejo.id_Complejo FROM complejo
     WHERE complejo.Propietario_id_Propietario = (SELECT propietario.id_Propietario FROM propietario WHERE propietario.Cuenta_id_Cuenta = ?)
    `;
    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            return res.status(500).send('Error en el servidor');
        }
        if (!deporte && !info_Dimensiones && !Caracteristicas && !precio_Hora && !nombre_Cancha) {
            return res.status(400).send('Campos requeridos');
        }

        // Inicia una transacción
        connection.beginTransaction((err) => {
            if (err) {
                console.error('Error al iniciar la transacción:', err);
                return res.status(500).send('Error en el servidor');
            }

            const img_Cancha = fs.readFileSync(path.join(__dirname, '../image-Canchas/' + req.file.filename));

            // Realiza una consulta para encontrar el ID del complejo al que pertenece el propietario conectado
            connection.query(searchIdPropietario, [id_Cuenta], (err, results) => {
                if (err) {
                    connection.rollback(() => {
                        console.log("Error al buscar el complejo del propietario:", err);
                        return res.status(500).send('Error en el servidor');
                    });
                }

                if (results.length === 0) {
                    connection.rollback(() => {
                        console.log('No se encontró el complejo del propietario');
                        return res.status(404).send('No se encontró el complejo del propietario');
                    });
                } else {
                    const complejoId = results[0].id_Complejo;

                    const canchaData = {
                        deporte: deporte,
                        info_Dimensiones: info_Dimensiones,
                        Caracteristicas: Caracteristicas,
                        precio_Hora: precio_Hora,
                        Complejo_id_Complejo: complejoId,
                        nombre_Cancha: nombre_Cancha,
                        img_Cancha: img_Cancha
                    };

                    // Inserta los datos de la cancha en la base de datos
                    connection.query('INSERT INTO cancha SET ?', canchaData, (err, rows) => {
                        if (err) {
                            connection.rollback(() => {
                                console.error(err);
                                return res.status(500).send('Error en el servidor');
                            });
                        }

                        // Confirma la transacción
                        connection.commit((err) => {
                            if (err) {
                                connection.rollback(() => {
                                    console.error('Error al confirmar la transacción:', err);
                                    return res.status(500).send('Error en el servidor');
                                });
                            }

                            res.send('¡Guardado!');
                        });
                    });
                }
            });
        });
    })


}
module.exports = { PostCancha, fileUpload_imgCancha }