"use strict";

var app = require('./module');
// routes
app.config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // routes
      $routeProvider
        .when('/',{
          template:'<main></main>'
        })
        .otherwise({
           redirectTo: '/'
        });
    }
  ]);
