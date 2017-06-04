'use strict';

var Q         = require('q');
var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = (require('mongoose').Types.ObjectId)



var CategorySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  status : {
    type : String,
    default : 'active'
  },
  description : String
});

CategorySchema
  .path('name')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({
      name: value
    }, function (err, category) {
      if (err) {
        throw err;
      }
      if (category) {
        if (self.id === category.id) {
          return respond(true);
        }
        return respond(false);
      }
      respond(true);
    });
  }, 'Category already exists with the same name');


var Category = mongoose.model('Category', CategorySchema);


var CategoryProvider = function () {
};

CategoryProvider.prototype.create = function (params) {

  var deferred = Q.defer();

  Category.create(params, function (err, category) {

    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(category);
    }

  });

  return deferred.promise;
};

CategoryProvider.prototype.findById = function (id) {

  var deferred = Q.defer();

  Category.findById(id, function (err, category) {

    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(category);
    }

  });

  return deferred.promise;
};

CategoryProvider.prototype.remove = function (category) {

  var deferred = Q.defer();

  category.remove(function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(category);
    }
  });

  return deferred.promise;
};

CategoryProvider.prototype.find = function (params) {

  var deferred = Q.defer();

  Category.find(params, function (err, categories) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(categories);
    }
  });

  return deferred.promise;
};

CategoryProvider.prototype.update = function (params) {

  var deferred = Q.defer();

  var id =  new ObjectId( params._id )

  Category.findOneAndUpdate({ _id : id }, params, { 'new': true } , function(err, category){

    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(category);
    }    

  })


  /*
  this
    .findById(params._id)
    .then(function (category) {

      category.name = params.name;
      category.description = params.description;
      category.

      category.save(function (err) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(category);
        }
      });

    })
    .catch(function (err) {
      deferred.reject(err);
    });
  */
  return deferred.promise;
};

module.exports = new CategoryProvider();
