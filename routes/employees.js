var express = require('express');
var router = express.Router();
const sha256 = require('sha256');
const { Connection, Request } = require("tedious");
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
// For employees: /employees/login
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
			if( column.value == true){
				console.log('Success');
				res.json({Success: "Success"});
				// Phân quyền 
				//tao lai connection = tk user
			}
			else{
				console.log('Fail')
				res.json({Success: "Fail"});
			}
    });
  });

	connection.execSql(request);
	return res;
});
// ---------------------------------------------------------------------------------------------



module.exports = router;