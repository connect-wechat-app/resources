(function () {
  'use strict';

  /**
   * Main module of the application.
   */
  angular
    .module('fixman', [ 
      'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

      $urlRouterProvider.otherwise('/');

      
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'views/main/main.html',
          controller: 'mainCtrl'
        })
        
      // $stateProvider
      //   .state('main', {
      //     url: '/',
      //     templateUrl: 'views/main/main.html',
      //     controller: 'mainCtrl'
      //   })
      //   .state('login', {
      //     url: '/login',
      //     templateUrl: 'views/login/login.html',
      //     controller: 'mainCtrl'
      //   })
      //   .state('backend', {
      //     url: '/backend',
      //     templateUrl: 'views/backend/backend.html',
      //     controller: 'backendCtrl'
      //   })
      //   .state('person', {
      //     url: '/person',
      //     templateUrl: 'views/person/person.html',
      //     controller: 'mainCtrl'
      //   })
      //   .state('category', {
      //     url: '/category',
      //     templateUrl: 'views/category/category.html',
      //     controller: 'mainCtrl'
      //   })
      //   .state('request', {
      //     url: '/request',
      //     templateUrl: 'views/request/request.html',
      //     controller: 'mainCtrl'
      //   })
      //   .state('inventory', {
      //     url: '/inventory',
      //     templateUrl: 'views/inventory/inventory.html',
      //     controller: 'inventoryCtrl'
      //   })
        $locationProvider.html5Mode(true);
    }]);
})();
