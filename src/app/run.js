"use strict";
/**
 * Run get executed after the injector is created and are used to 
 * kickstart the application. 
 * Only instances and constants can be injected into run blocks. 
 * This is to prevent further system configuration during application run time.
 */

var app = require('./module');

app.run(run);
// required dependencies
run.$inject = ['$state'];
// inject state - so the routing runs as soon as possible
function run($state){}