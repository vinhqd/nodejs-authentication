require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

// require router
const authRouter = require('./routers/auth.router');

// middlewere
const authMiddlewere = require("./middleweres/auth.middlewere");

// controller
const indexController = require('./controller/index.controller');

const app = express();
const server = require("http").Server(app)
const port = parseInt(process.env.SERVER_PORT) || 3000;

// set up
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

server.listen(port, () => console.log('Listening port: ' + port));

// router
app.get('/',authMiddlewere.checkAuth, indexController.getIndexPage);
app.use('/auth' ,authRouter);