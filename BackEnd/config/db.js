const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Freza159",
    database : "groupomania"

  });

  module.exports = db;