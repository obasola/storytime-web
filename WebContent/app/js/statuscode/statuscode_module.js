'use strict';

/* Module for StatusCode */

var statusCodeModule = angular.module('statusCode.module', ['myApp']);

/**
 * Module for statusCode
 */
statusCodeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/statusCode',    {templateUrl: 'partials/statuscode/statuscode_list.html', controller: 'StatusCodeCtrl'});
    $routeProvider.when('/statusCode/new', {templateUrl: 'partials/statuscode/statuscode_form.html', controller: 'StatusCodeCtrl'});
    $routeProvider.when('/statusCode/:id', {templateUrl: 'partials/statuscode/statuscode_form.html', controller: 'StatusCodeCtrl'});
}]);
