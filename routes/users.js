var express = require('express');
var router = express.Router();
const sha256 = require('sha256');
const { Connection, Request } = require("tedious");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// -----------------------------CREATE CONNECTION TO MSSQL--------------------------------------
// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "futaUser", // update me
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
// users/tour -> get all tours
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

// ---------------------------------------------------------------------------------------------
// users/booking/add -> route de user dat ve xe
// body:
//  userID: truyen vao ID cua user dang dang nhap
//  activeTourID: truyen vao ID cua chuyen xe ma user dat ve
//  departPlace: noi khoi hanh cua chuyen xe
//  departDate: thoi gian khoi hanh cua chuyen xe
//  destPlace: noi den cua chuyen xe
//  price: gia ve
//  seatID: so ghe
//  timePlaced: hoi Kha, t cung k biet cai nay

router.post('/tour', async (req,res) => {
  const booking = req.body;
  // them _resolved vao sau doan EXEC o duoi khi demo
	const reqString = `EXEC dbo.sp_createBooking ${booking.userID}, ${booking.activeTourID}, ${booking.departPlace}, ${booking.departDate}, ${booking.destPlace}, ${booking.price}, ${booking.seatID}, ${booking.timePlaced}`;
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
// users/unavailable_seats?id=<id chuyen xe>

router.post('/unavailable_seats', async (req,res) => {
  const activeTourID = req.query.id;
  // them _resolved vao sau doan EXEC o duoi khi demo
	const reqString = `EXEC dbo.sp_getUnavailableSeats ${activeTourID}`;
	const request = new Request( reqString,
    (err, rowCount) => {
      if (err) {
        console.error('ERR: ', err.message);
      } else {
				console.log(`${rowCount} row(s) returned`);
      }
		}
  )
  // Sau khi chay xong, tra ve tat ca ma so ghe da bi nguoi khac dat

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
