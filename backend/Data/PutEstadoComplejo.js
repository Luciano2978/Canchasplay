const multer = require('multer');
const path = require('path');
const fs = require('fs');




const PutEstadoComplejo = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }

        const {estado_Complejo} = req.body
        const logo_Complejo =  '../image-logoComplejo/1697067185847-logo-Logo'

        const dataEstado = {
            Propietario_id_Propietario : 1,
            Ubicacion_id_Ubicacion: 1,
            nombre_Lugar : "juan",
            logo_Complejo : logo_Complejo,
            estado_Complejo : estado_Complejo
        };

        conn.query("UPDATE complejo set ? ", dataEstado , (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error en el servidor');
            }

            res.send('saved!');
        });
    }

)}

module.exports = PutEstadoComplejo