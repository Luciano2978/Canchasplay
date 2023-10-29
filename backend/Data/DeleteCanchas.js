
const DeleteCancha = (req, res) =>{
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

}

module.exports = DeleteCancha