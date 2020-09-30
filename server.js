const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret:'iloveyou2002', saveUninitialized:true, resave:true}))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'static')));

let httpServer = http.createServer(app);

//Routes
let signup = require('./routes/signup');
let login = require('./routes/login');
let sql = require('./models/con');
let mdpforgot = require('./routes/mdpforgot');
let changemdp = require('./routes/changemdp');
app.use(signup);
app.use(login);
app.use(mdpforgot);
app.use(changemdp);

// Listen on port 5000
httpServer.listen(5000, ()=>{
    console.log('Server starting on port 5000');
});