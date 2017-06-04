'use strict';

var _ 				= require('lodash');
var async 		= require('async');
var Services 	= require('./services.model');
var uuid 			= require('node-uuid');
var knox 		  = require('knox');


function handleError (res, err) {
  return res.status(500).send(err);
}

/******************************************************
	AMAZON CLIENT
	https://github.com/learnboost/knox
******************************************************/

var amazon_params = {
	key 		: 'AKIAIEU4OEDULDMBPKFA', 
	secret 	: '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', 
	bucket 	: 'fixapp'
}

var amazon_client = knox.createClient(amazon_params);

exports.list = function(req, res, next){


	Services
		.find({})
		.then(function(services){

			res.json(services);

		})
		.catch(function(err){
			handleError(res, err);
		})


}

exports.getUserServices = function(req, res, next){


	var user_id = req.params.id;


	Services
		.find({ 'created_by._id' : user_id })
		.then(function(services){

			res.json(services);

		})
		.catch(function(err){
			handleError(res, err);
		})


}

exports.create = function(req, res, next){

	var params = req.body;

	var service_data = req.body;

	var images = _.filter(service_data.media, function(media){
		return media.type === 'image';
	});

	var buffer;

	if(images.length > 0){
	
		async.forEach(images, function(image, callback) {

			buffer = image.src;

			buffer = buffer.replace('data:image/jpeg;base64,', "");
			
			buffer = new Buffer(buffer,'base64');

			amazon_client.putBuffer(buffer, '/' + Date.now()  + ".jpeg", {
				"Content-Type" : "image/jpeg"
			}, function(err, message_from_amazon){
				if(err!=null){
					res.json({message:err.toString()},500);
				} else {
					console.log("Message from amazon: " + message_from_amazon);
					console.log("URL: " + JSON.stringify(message_from_amazon.socket._httpMessage.url));
					image.src = message_from_amazon.socket._httpMessage.url;
					console.log("Status Code: " + message_from_amazon.statusCode);
					callback();
				}
			});		

		}, function(err) {

			if(err!=null){
				console.log(("Error: " + JSON.stringify(err)).red);
			} else {

				Services
					.create(service_data)
					.then(function(service){
						res.json(service);
					})
					.catch(function(err){
						handleError(res, err);
					})

			}

		});	

	} else {

		Services
			.create(service_data)
			.then(function(service){
				res.json(service);
			})
			.catch(function(err){
				handleError(res, err);
			})

	}

}








