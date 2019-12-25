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
// employees/tour/edit
// body:
//  id: ID cua chuyen xe can chinh sua (int)
//  vehID: ID cua chiec xe (int)
//  departPlace: ID cua noi di (int)
//  destPlace: ID cua noi den (int)
//  departDate: thoi gian di (smalldatetime)
//  duration: thoi gian hanh trinh (smallint)
//  numOfSeats: tong so ghe (int)
//  ticketPrice: gia ve (money)

router.post('/tour/edit', async (req,res) => {
  const tour = req.body;
  // them _resolved vao sau doan EXEC o duoi khi demo
	const reqString = `EXEC dbo.sp_editActiveTour ${tour.id}, ${tour.vehID}, ${tour.departPlace}, ${tour.destPlace}, ${tour.departDate}, ${tour.duration}, ${tour.numOfSeats}, ${tour.ticketPrice}`;
	const request = new Request( reqString,
    (err, rowCount) => {
      if (err) {
        console.error('ERR: ', err.message);
      } else {
				console.log(`${rowCount} row(s) returned`);
      }
		}
	)
  // Xu ly sau khi chay stored proc (copy y nhu o tren xuong, chua chinh sua)

	// request.on("row", columns => {
  //   columns.forEach(column => {
	// 		if( column.value == true){
	// 			console.log('Success');
	// 			res.json({Success: "Success"});
	// 			// Phân quyền 
	// 			//tao lai connection = tk user
	// 		}
	// 		else{
	// 			console.log('Fail')
	// 			res.json({Success: "Fail"});
	// 		}
  //   });
  // });

	// connection.execSql(request);
	// return res;
});

// ---------------------------------------------------------------------------------------------
// employees/tour -> get all tours
router.post('/tour', async (req,res) => {
  const tour = req.body;
  // them _resolved vao sau doan EXEC o duoi khi demo
	const reqString = `EXEC dbo.sp_getAllTours`;
	const request = new Request( reqString,
    (err, rowCount) => {
      if (err) {
        console.error('ERR: ', err.message);
      } else {
				console.log(`${rowCount} row(s) returned`);
      }
		}
  )
  // Tra ve table chua tat ca cac tour, xem trong script khoi tao database de biet co nhung column nao
  
  // Xu ly sau khi chay stored proc (copy y nhu o tren xuong, chua chinh sua)
  
	// request.on("row", columns => {
  //   columns.forEach(column => {
	// 		if( column.value == true){
	// 			console.log('Success');
	// 			res.json({Success: "Success"});
	// 			// Phân quyền 
	// 			//tao lai connection = tk user
	// 		}
	// 		else{
	// 			console.log('Fail')
	// 			res.json({Success: "Fail"});
	// 		}
  //   });
  // });

	// connection.execSql(request);
	// return res;
});


module.exports = router;