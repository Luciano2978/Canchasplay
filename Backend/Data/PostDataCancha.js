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

const PostCancha = (req,res) =>{
        

        const { deporte, info_Dimensiones, Caracteristicas, precio_Hora, nombre_Cancha } = req.body;

        if (!deporte && !info_Dimensiones && !Caracteristicas && !precio_Hora && !nombre_Cancha) {
            return res.status(400).send('Campos requeridos');
        }

        const img_Cancha = fs.readFileSync(path.join(__dirname, '../image-Canchas/' + req.file.filename));

        const canchaData = {
            deporte: deporte,
            info_Dimensiones: info_Dimensiones,
            Caracteristicas: Caracteristicas,
            precio_Hora: precio_Hora,
            Complejo_id_Complejo: 4,
            nombre_Cancha: nombre_Cancha,
            img_Cancha: img_Cancha
        };

        connection.query('INSERT INTO cancha SET ?', canchaData, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error en el servidor');
            }

            res.send('saved!');
        });
    

}
module.exports = {PostCancha, fileUpload_imgCancha}