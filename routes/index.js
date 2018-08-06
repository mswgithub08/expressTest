var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


/* GET home page. */
router.get('/', function(req, res, next) {	 
	MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db("stu");
	    dbo.collection("stu"). find({}).limit(5).toArray(function(err, result) { // 返回集合中所有数据
	        if (err) throw err;
	        console.log(result);
	        dbo.collection("stu").find({}).count(function(err,count1){
	        	res.render('index', { data: result,count:count1 });
	        })
	        
	        db.close();
	    });
	});   
});

router.get('/blog', function(req, res, next) {	
	const pageSize=5;
	var page;
	page=req.query.page;
	if(isNaN(page)) page=1;

	MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db("stu");
	    dbo.collection("stu").find({}).skip((page-1)*pageSize).limit(5).toArray(function(err, result) { // 返回集合中所有数据
	        if (err) throw err;
	        console.log(result);
	        res.render('blog', { data: result });
	        db.close();
	    });
	});   
});

module.exports = router;
