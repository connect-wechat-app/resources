'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServicesSchema = new Schema({
  description: String,
  categories  : [],
  media     : [],
  created_on: {
    type: Date,
    default: Date.now
  },
  created_by  : {},
  offers      : [],
  geolocation : {}
});


var Service = mongoose.model('Service', ServicesSchema);


var ServiceProvider = function () {};

ServiceProvider.prototype.create = function (params) {

  var deferred = Q.defer();

  Service.create(params, function (err, service) {

    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(service);
    }

  });

  return deferred.promise;
};

ServiceProvider.prototype.findById = function (id) {

  var deferred = Q.defer();

  Service.findById(id, function (err, service) {

    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(service);
    }

  });

  return deferred.promise;
};

ServiceProvider.prototype.remove = function (service) {

  var deferred = Q.defer();

  service.remove(function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(service);
    }
  });

  return deferred.promise;
};

ServiceProvider.prototype.find = function (params) {

  var deferred = Q.defer();

  Service.find(params, function (err, services) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(services);
    }
  });

  return deferred.promise;
};

ServiceProvider.prototype.update = function (params) {

  var deferred = Q.defer();

  this
    .findById(params._id)
    .then(function (service) {

      service.name = params.name;

      service.save(function (err) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(service);
        }
      });

    })
    .catch(function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
};

module.exports = new ServiceProvider();
