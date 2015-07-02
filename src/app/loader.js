"use strict";

var requirejs = require('requirejs'),
    Q = require('q'),
    define = require('define');

var CDN = 'https://s.brightspace.com';

/**
 * Library Package Versions
 *
 * @type {Object}
 */
var libVersions = {
  "angular": "1.4.1"
};

/**
 * requirejs configuration settings
 *
 * @type {Object}
 */
var requireJsConfig = {

  shim:{
    'angular-resource':{
      deps:['angular']
    },
	 'angular-loader':{
      deps:['angular']
    },
    'angular':{
      exports:'angular'
    },
    'frau-templates':{
      deps:['angular']
    }
  },

  paths:{
    'angular': CDN + '/lib/angular/'+libVersions.angular+'/angular.min',
	  'angular-loader': CDN + '/lib/angular/'+libVersions.angular+'/angular-loader.min',
	  'angular-resource': CDN + '/lib/angular/'+libVersions.angular+'/angular-resource.min',
	  'angular-route': CDN + '/lib/angular/'+libVersions.angular+'/angular-route.min',
    'frau-templates': '$APP_PATH$views.min'
  }

};

/**
 * Paths / URLs to the css files.
 * Unlike the javascript these must be defined
 *
 * @type {Object}
 */
var cssPaths = {
  'app':'$APP_PATH$app.css'
};

requirejs.config( requireJsConfig );

/**
 * Creates a <link element in the head section with the given URL
 *
 * @param  {String} url
 * @return {Void}
 */
function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

/**
 * Application CSS
 * Defined as a module so that it can be required by requirejs
 * @return {Void}
 */
define('appcss',function(){
  loadCss(cssPaths.app);
});

/**
 * Creates a d2lLocale global var so that course-setup-tasks
 * and tours work on the dashboard
 *
 * @param  {Object} locale
 * @return {Object}
 */
define('d2lLocale',['d2l-locale'],function(locale){
  window.d2lLocale = locale;
  return locale;
});

/**
 * Creates a d2lContext global var so that course-setup-tasks
 * and tours work on the dashboard
 * Also tranlsates uppercase OrgUnitId and OrgId to camelCase.
 *
 * @param  {Object} orgunit
 * @return {Object}
 */
define('d2lContext',['d2l-orgunit'],function(orgunit){
  orgunit.orgUnitId = orgunit.OrgUnitId;
  orgunit.orgId = orgunit.OrgId;
  window.d2lContext = orgunit;
  return orgunit;
});

define('jquery', [], function() {
    return jQuery;
});

define('angular-load',['angular-resource','angular-loader']);

/**
 * Dependencies for the app
 */
define('frau-load',['d2lLocale', 'd2lContext', 'frau-templates','angular-load','appcss']);


/**
 * Dashboard
 * ensures all scripts are loaded for the app
 * @return {Promise}
 */
module.exports = function() {
  var deferred = Q.defer();
  requirejs(['frau-load'],function(){
        deferred.resolve();
    }
  );
  return deferred.promise;
};