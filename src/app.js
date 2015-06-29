'use strict';

var angular = require('angular'),
    config = require('./config');

angular.module( config.name, ['ngRoute','ngResource']);
// configuration
require('./app.routes');
