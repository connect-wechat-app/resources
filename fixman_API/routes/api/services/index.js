'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./services.controller');

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
router.post('/create', checkAppSecret, controller.create);
router.get('/user/:id', checkAppSecret, controller.getUserServices);




module.exports = router;
