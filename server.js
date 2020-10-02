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
let mdpforgot = require('./routes/mdpforgot');
let changemdp = require('./routes/changemdp');
let homepage = require('./routes/homepage');
app.use(signup);
app.use(login);
app.use(mdpforgot);
app.use(changemdp);
app.use(homepage);

// Listen on port 5000
const port = process.env.PORT
httpServer.listen(port, ()=>{
    console.log(`Server starting on port ${port}`);
});