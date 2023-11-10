const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: '34.176.165.104',
  user: 'canchasplay12',
  password: 'canchasplay12',
  database: 'canchasplay',

})


module.exports = connection;