'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  name: {
    type          : String,
    unique        : true
  },
  email           : { 
    type          : String,
    unique        : true
  },
  created_on      : {
    type          : Date,
    default       : Date.now
  },
  birthday        : Date,
  first_name      : String,
  last_name       : String,
  gender          : String,
  link            : String,
  locale          : String,
  location        : String, 
  fb_id           : String,
  categories      : [],
  media           : [],
  official_id     : String,
  user_type       : String,
  status : {
    type : String,
    default : 'active'
  }
});

//birthday, first_name, last_name, gender, link, locale, location, name

UsersSchema
  .path('email')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({
      name: value
    }, function (err, user) {
      if (err) {
        throw err;
      }
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      respond(true);
    });
  }, 'User already exists with the same email');

UsersSchema
  .path('fb_id')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({
      name: value
    }, function (err, user) {
      if (err) {
        throw err;
      }
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      respond(true);
    });
  }, 'User already exists with the same facebook id');  


var User = mongoose.model('User', UsersSchema);


var UserProvider = function () {};

UserProvider.prototype.create = function (params) {

  var deferred = Q.defer();

  User.create(params, function (err, user) {

    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(user);
    }

  });

  return deferred.promise;
};

UserProvider.prototype.findById = function (id) {

  var deferred = Q.defer();

  User.findById(id, function (err, user) {

    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(user);
    }

  });

  return deferred.promise;
};

UserProvider.prototype.remove = function (user) {

  var deferred = Q.defer();

  user.remove(function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(user);
    }
  });

  return deferred.promise;
};

UserProvider.prototype.find = function (params) {

  var deferred = Q.defer();

  User.find(params, function (err, users) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(users);
    }
  });

  return deferred.promise;
};

UserProvider.prototype.update = function (params) {

  var deferred = Q.defer();

  this
    .findById(params._id)
    .then(function (user) {

      user.name = params.name;
      user.email = params.email;

      user.save(function (err) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(user);
        }
      });

    })
    .catch(function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
};

module.exports = new UserProvider();
