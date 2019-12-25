var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;

router.post('/predict', async (req,res) => {
	const newPath = '.\\..\\..\\images\\' + req.body.filename;
	const myShellScript = exec('python CNN_importImage.py '+ newPath);
	myShellScript.stdout.on('data', (data)=>{
		// do whatever you want here with data
		if(data){
			res.json({
				number: data,
			});
			return res;
		}
		else{
			return res.status(400);
		}
	});
});

module.exports = router;