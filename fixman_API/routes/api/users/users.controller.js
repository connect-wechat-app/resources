'use strict';

var _ 				= require('lodash');
var async 		= require('async');
var User 			= require('./users.model');
var uuid 			= require('node-uuid');


function handleError (res, err) {
  return res.status(500).send(err);
}


exports.list = function(req, res, next){

	User
		.find({})
		.then(function(people){
			res.json(people);
		})
		.catch(function(err){
			handleError(res, err);
		})


}

exports.getUser = function(req, res, next){

	var _id = req.params.id;


	User
		.findById(_id)
		.then(function(user){
			res.json(user);
		})
		.catch(function(err){
			handleError(res, err);
		})


}

exports.create = function(req, res, next){

	var params = req.body;

	User
		.create(params)
		.then(function(user){
			res.json(user);
		})
		.catch(function(err){
			handleError(res, err);
		})



}