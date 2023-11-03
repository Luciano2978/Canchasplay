const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connection = require('../config');

const diskstorage_Logo = multer.diskStorage({
    destination: path.join(__dirname, '../image-logoComplejo'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-logo-' + file.originalname);
    }
});

const fileUpload_Logo = multer({
    storage: diskstorage_Logo
}).single('logo_Complejo');

const postComplejo = (req, res) => {
    const { nombre_Lugar, estado_Complejo, id_Cuenta } = req.body;
    const { latitud, longitud, ubicacion_Detallada } = req.body;

    const searchIdPropietario = `SELECT propietario.id_Propietario FROM propietario 
    INNER JOIN cuenta ON propietario.Cuenta_id_Cuenta = cuenta.id_Cuenta 
    WHERE cuenta.id_Cuenta = ?`;

    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            return res.status(500).send('Error en el servidor');
        }

        // Inicia una transacción
        connection.beginTransaction((err) => {
            if (err) {
                console.error('Error al iniciar la transacción:', err);
                return connection.end();
            }
            const logo_Complejo = fs.readFileSync(path.join(__dirname, '../image-logoComplejo/' + req.file.filename));

            connection.query(searchIdPropietario, [id_Cuenta], (err, results) => {
                if (err) {
                    console.log("Error al buscar el propietario:", err);
                    connection.rollback(() => {
                        console.error('Error al buscar el propietario:', err);
                        connection.end();
                        return res.status(500).send('Error en el servidor');
                    });
                }

                if (results.length === 0) {
                    console.log('No se encontró el propietario');
                    connection.rollback(() => {
                        console.error('No se encontró el propietario');
                        connection.end();
                        return res.status(404).send('No se encontró el propietario');
                    });
                } else {
                    const idPropietario = results[0].id_Propietario;

                    const complejoData = {
                        Propietario_id_Propietario: idPropietario,
                        Ubicacion_id_Ubicacion: null,
                        nombre_Lugar: nombre_Lugar,
                        logo_Complejo: logo_Complejo,
                        estado_Complejo: estado_Complejo || 1
                    };
                    const dataUbicacion = {
                        latitud: latitud,
                        longitud: longitud,
                        ubicacion_Detallada: ubicacion_Detallada
                    }

                    // Inserta datos en la tabla de ubicación
                    connection.query('INSERT INTO ubicacion SET ?', dataUbicacion, (err, result) => {
                        if (err) {
                            connection.rollback(() => {
                                console.error('Error al insertar datos en la tabla de ubicación:', err);
                                connection.end();
                                return res.status(500).send('Error en el servidor');
                            });
                        }

                        const ubicacionId = result.insertId;

                        // Actualiza el campo 'fk_ubicacion_id' en los datos del complejo
                        complejoData.Ubicacion_id_Ubicacion = ubicacionId;

                        // Inserta datos en la tabla de complejo
                        connection.query('INSERT INTO complejo SET ?', complejoData, (err, result) => {
                            if (err) {
                                connection.rollback(() => {
                                    console.error('Error al insertar datos en la tabla de complejo:', err);
                                    connection.end();
                                    return res.status(500).send('Error en el servidor');
                                });
                            }

                            // Confirma la transacción
                            connection.commit((err) => {
                                if (err) {
                                    connection.rollback(() => {
                                        console.error('Error al confirmar la transacción:', err);
                                        connection.end();
                                        return res.status(500).send('Error en el servidor');
                                    });
                                }

                                console.log('Transacción completada con éxito');
                                connection.end();
                                res.send('Transacción completada con éxito');
                            });
                        });
                    });
                }
            });
        });
    });
};

module.exports = { postComplejo, fileUpload_Logo };

/* const postComplejo = (req, res) => {
    
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }

        const { nombre_Lugar, estado_Complejo } = req.body;

        if (!nombre_Lugar) {
            return res.status(400).send('El nombre del lugar es requerido');
        }

        const logo_Complejo = fs.readFileSync(path.join(__dirname, '../image-logoComplejo/' + req.file.filename));

        const complejoData = {
            Propietario_id_Propietario: 1, // El ID del propietario al que deseas hacer referencia
            Ubicacion_id_Ubicacion: 1,
            nombre_Lugar: nombre_Lugar,
            logo_Complejo: logo_Complejo,
            estado_Complejo: estado_Complejo || 1 // Por defecto, estado_Complejo será 1 si no se proporciona
        };

        connection.query('INSERT INTO complejo SET ?', complejoData, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error en el servidor');
            }

            res.send('¡Imagen guardada!');
        });


}
const postUbicacion = (req, res) => {
    const { latitud, longitud, ubicacion_Detallada } = req.body;
    const dataUbicacion = {
        latitud: latitud,
        longitud: longitud,
        ubicacion_Detallada: ubicacion_Detallada
    }
    connection.query('INSERT INTO ubicacion SET ?', dataUbicacion, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }

        res.send('!!');
    });
} */