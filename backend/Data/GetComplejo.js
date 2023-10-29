

const getComplejo = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
    
        conn.query('SELECT * FROM complejo', (err, rows) => {
            if (err) return res.send(err)
    
            res.json(rows)
        })
    })
}

module.exports = {getComplejo}