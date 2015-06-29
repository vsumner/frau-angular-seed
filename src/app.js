'use strict';

var loader = require('./app/loader'),
    config = require('./config');

// bootstrap the app
module.exports = function( node, options, hideLoaderCallback ) {
    
    loader().then(function(){
        var angular = require('angular');
        require('./app/definition');
        
        var container = angular.element('<div ng-include></div>');
        container.attr('src', '\'index.html\'');
    
        angular.element( node ).append( container );
        angular.bootstrap(node,[config.name]);

        
        if( typeof( hideLoaderCallback ) === 'function') {
            hideLoaderCallback();
        }
    });
    
};