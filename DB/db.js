const mysql = require('mysql');

// connect to DB
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'projet_2cs'
});

db.connect(()=>{
  console.log('connected to MySQL DB');
});

module.exports = db;