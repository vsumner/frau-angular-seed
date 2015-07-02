"use strict";
/**
 * Config get executed during the provider registrations and configuration phase. 
 * Only providers and constants can be injected into configuration blocks. 
 * This is to prevent accidental instantiation of services before they have been 
 * fully configured.
 */

var app = require('./module');
// routes
app.config(routes);

function routes($stateProvider, $urlRouterProvider){
  $stateProvider.state('root',{
    url:'/',
    views:{
      'Main':{
        templateUrl: 'main/main.html'
      }
    }
  });
  $urlRouterProvider.otherwise('/');
};