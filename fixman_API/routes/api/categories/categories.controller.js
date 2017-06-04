'use strict';

var _ 				= require('lodash');
var async 		= require('async');
var Category 	= require('./categories.model');
var uuid 			= require('node-uuid');


function handleError (res, err) {
  return res.status(500).send(err);
}





exports.list = function(req, res, next){

	var is_backend = req.query.backend;

	var query = is_backend ? {} : { status : 'active'};

	Category
		.find(query)
		.then(function(categories){
			res.json(categories);
		})
		.catch(function(err){
			handleError(res, err);
		})

}

exports.update = function(req, res, next){

	var params = req.body;

	Category
		.update(params)
		.then(function(category){
			res.json(category);
		})
		.catch(function(err){
			handleError(res, err);
		})

}

exports.create = function(req, res, next){

	var params = req.body;

	Category
		.create(params)
		.then(function(category){
			res.json(category);
		})
		.catch(function(err){
			handleError(res, err);
		})



}