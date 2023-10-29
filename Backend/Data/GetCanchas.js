const connection = require("../config");


const getCancha = (req, res) => {
        if (err) return res.send(err)
    
        connection.query('SELECT * FROM cancha', (err, rows) => {
            if (err) return res.send(err)
    
            res.json(rows)
        })
    
}

module.exports = {getCancha}