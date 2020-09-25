const mysql = require('mysql');
const util = require('util');

const con = mysql.createConnection({
    host: "localhost",
    user: "Akuseru",
    password: "@kuseru2002",
    database: "server"
});

con.connect((err)=>{
    if (err) throw err;
    console.log('Connected');
});

con.query = util.promisify(con.query);

module.exports = con;