'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./users.controller');


var checkAppSecret = function(req, res, next){


	var app_secret = req.app.get('secret_token');
	var token = req.query.token;

	console.log("app_secret: " + app_secret);
	console.log("token: " + token);

	if(token === app_secret){
		next();
	} else {
		res.status(401).json({ message : 'Access denied' });
	}

}


router.get('/list', checkAppSecret, controller.list);
router.get('/:id', checkAppSecret, controller.getUser);
router.post('/create', checkAppSecret, controller.create);



module.exports = router;


