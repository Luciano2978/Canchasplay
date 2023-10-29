const connection = require("../config");


const getComplejo = (req, res) => {
    
        if (err) return res.send(err)
    
        connection.query('SELECT * FROM complejo', (err, rows) => {
            if (err) return res.send(err)
    
            res.json(rows)
        })
    
}

module.exports = {getComplejo}