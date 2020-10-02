const mysql = require('mysql');
const util = require('util');

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "server"
});

con.connect((err)=>{
    if (err) throw err;
    console.log('Connected');
});

con.query = util.promisify(con.query);

module.exports = con;