const express = require('express');
const redis = require('redis');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const app = express();
const client = redis.createClient();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    secret:process.env.SECRET,
    store: new redisStore({host: 'localhost', port: 6379, client: client, ttl: 260}),
    saveUninitialized:false,
    resave:false
}))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/sujet', express.static(path.join(__dirname, 'static', 'corros')));

let httpServer = http.createServer(app);

//Routes
let signup = require('./routes/signup');
let login = require('./routes/login');
let mdpforgot = require('./routes/mdpforgot');
let changemdp = require('./routes/changemdp');
let homepage = require('./routes/homepage');
let logout = require('./routes/logout');
let profile = require('./routes/profile');
let upload_corros = require('./routes/upload_corros');
let display_corro = require('./routes/display_corro');
app.use(signup);
app.use(login);
app.use(mdpforgot);
app.use(changemdp);
app.use(homepage);
app.use(logout);
app.use(profile);
app.use(upload_corros);
app.use(display_corro);

// Listen on port 5000
let port = process.env.PORT;
httpServer.listen(port, ()=>{
    console.log(`Server starting on port ${port}`);
});