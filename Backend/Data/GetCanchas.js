const connection = require("../config");


const getCancha = (req, res) => {
    const selectCancha = 'SELECT * FROM cancha'
        connection.query(selectCancha, (err, rows) => {
            if (err) return res.send(err)
    
            res.json(rows)
        })
    
}

module.exports = {getCancha}