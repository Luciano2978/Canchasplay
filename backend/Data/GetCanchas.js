

const getCancha = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
    
        conn.query('SELECT * FROM cancha', (err, rows) => {
            if (err) return res.send(err)
    
            res.json(rows)
        })
    })
}

module.exports = {getCancha}