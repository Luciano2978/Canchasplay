const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'sql10.freesqldatabase.com',
  user: 'sql10660912',
  password: 'ezwijACwJv',
  database: 'sql10660912',

})


module.exports = connection;