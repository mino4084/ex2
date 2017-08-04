var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tripco Main Page' });
});

router.get('/login', function(req, res, next){
	res.render('loginform', {title : "login"});
});

router.post('/login', function(req, res, next){
	console.log('req.body =', req.body);
	var id = req.body.id;
	var pw = req.body.pw;

	var data = {
		"status" : true,
		"result" : "OK",
		"id" : id,
		"pw" : pw
	};
	res.json(data);
});

router.get('/join', function(req, res, next){
	res.render('joinform', {title : "회원가입"});
});

router.post('/join', function(req, res, next){
	console.log('req body =', req.body);
	var user_id = req.body.id;
	var user_pw = req.body.pw;
	var user_token = req.body.token;
	var user_uuid = req.body.uuid;
	var user_nick = req.body.nick;
	var data = {
		user_id : user_id,
		user_pw : user_pw,
		user_token : user_token,
		user_uuid : user_uuid,
		user_nick : user_nick
	};
	res.json(data);
	var user = new UserModel(data);
	user.save(function(err, doc){
		if(err) return next(err);
		console.log('doc =', doc);
		res.redirect('/login');
	});
	/*res.json(data, function(err){
		if(err){
			code = 0;
			res.json(data);
		}
		code = 1;
		res.json(data);
	});*/

});

module.exports = router;
