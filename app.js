var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Install 
const cors = require('cors');
const { Connection, Request } = require("tedious");
// var sql = require("mssql");

var apiRouter = require('./routes/api')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------CREATE CONNECTION TO MSSQL--------------------------------------
// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "sqlserver", // update me
      password: "Progamer28" // update me
    },
    type: "default"
  },
  server: "127.0.0.1", // update me
  options: {
    database: "futaTicket", //update me
    encrypt: true
  }
};

//CREATE CONNECTION to MSSQL server 
const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

// ---------------------------------------------------------------------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

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
  res.render('error');
});

// //Initiallising connection string
// var dbConfig = {
//   user:  “<dbUserName>”,
//   password: “<dbPassword>”,
//   server: "eu-az-sql-serv1.database.windows.net",
//   database: "futaTicket"
// };

module.exports = app;
