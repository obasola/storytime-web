'use strict';

/* Module for Requirement */

var requirementModule = angular.module('requirement.module', ['myApp']);

/**
 * Module for requirement
 */
requirementModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/requirement',    {templateUrl: 'partials/requirement/requirement_list.html', controller: 'RequirementCtrl'});
    $routeProvider.when('/requirement/new', {templateUrl: 'partials/requirement/requirement_form.html', controller: 'RequirementCtrl'});
    $routeProvider.when('/requirement/:idrequirement', {templateUrl: 'partials/requirement/requirement_form.html', controller: 'RequirementCtrl'});
}]);
