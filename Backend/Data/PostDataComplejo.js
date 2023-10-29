const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connection = require("../config");
const { connect } = require('http2');

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

module.exports = {postComplejo, fileUpload_Logo}