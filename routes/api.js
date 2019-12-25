var express = require('express');
var router = express.Router();
const sha256 = require('sha256');
const { Connection, Request } = require("tedious");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// -----------------------------CREATE CONNECTION TO MSSQL--------------------------------------
// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "serviceAccount", // update me
      password: "@Nhom1016clc1" // update me
    },
    type: "default"
  },
  server: "34.87.65.79", // update me
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
    console.log("DB connect success");
  }
});

// ---------------------------------------------------------------------------------------------
// For user: /api/login
router.post('/login', async (req,res) => {
	const user = req.body;
	const passwordHash = sha256(user.password);
	const resq = 	`SELECT dbo.fn_checkLogin('` + user.account + `','` + passwordHash + `')` ;
	const request = new Request( resq,
    (err, rowCount) => {
      if (err) {
        console.error('ERR: ', err.message);
      } else {
				console.log(`${rowCount} row(s) returned`);
      }
		}
	)

	request.on("row", columns => {
    columns.forEach(column => {
			if( column.value == 0){
        res.json({Success: "Success"});
        const usersRouter = require('./users');
        router.use('/users', usersRouter);
      }
      if( column.value == 1){
        res.json({Success: "Success"});
        const employeeRouter = require('./employees');
        router.use('/employees', employeeRouter);
      }
      if( column.value == 2){
        res.json({Success: "Success"});
      }
    });
  });

	connection.execSql(request);
	return res;
});
// ---------------------------------------------------------------------------------------------

module.exports = router;