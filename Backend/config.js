const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'strong-keyword-404704:southamerica-west1:canchasplay12',
  user: 'canchasplay12',
  password: 'canchasplay12',
  database: 'canchasplay',

})


module.exports = connection;