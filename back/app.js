const createError = require('http-errors');
const express = require('express');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require("./config");
const cors = require('cors');

const appController = require("./controllers/appController");
const isAuth = require("./middleware/is-auth");
const connectDB = require("./config/db");
const updateDBData = require("./config/db");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registroRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var listadoRouter = require('./routes/listado');
var perfilConfRouter = require('./routes/perfilConf');
var perfilRouter = require('./routes/perfil');
var mensajeRouter = require('./routes/mensaje');
var statsRouter = require('./routes/stats');



var CronJob = require('cron').CronJob;



const app = express();
connectDB();
console.log("out");

const store = new MongoDBStore({
  uri: config.db.mongoURI,
  collection: "mySessions",
});

app.use(cors({origin: [
    "http://localhost:4200"
  ], credentials: true}));


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

/*app.use((req,res,next)=>{
  res.header('content-type: application/json; charset=utf-8');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next()
})*/

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// view engine setup
//app.set('views', path.join(__dirname,'views'));
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registro', registroRouter);
app.use('/login',loginRouter);
app.use('/listado',listadoRouter);
app.use('/perfilConf',perfilConfRouter);
app.use('/perfil',perfilRouter);
app.use('/msj',mensajeRouter);
app.use('/stats',statsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

var job = new CronJob(
  '00 00 02 * * *',
  function() {
    console.log('Executing cron job ');
    updateDBData().then(r => console.log("Cron Job Promise"));
  },
  null,
  true,
);


module.exports = app;
