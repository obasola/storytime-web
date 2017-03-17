'use strict';

/* Module for SpecificationType */

var specificationTypeModule = angular.module('specificationType.module', ['myApp']);

/**
 * Module for specificationType
 */
specificationTypeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/specificationType',    {templateUrl: 'partials/specificationtype/specificationtype_list.html', controller: 'SpecificationTypeCtrl'});
    $routeProvider.when('/specificationType/new', {templateUrl: 'partials/specificationtype/specificationtype_form.html', controller: 'SpecificationTypeCtrl'});
    $routeProvider.when('/specificationType/:idrequirementType', {templateUrl: 'partials/specificationtype/specificationtype_form.html', controller: 'SpecificationTypeCtrl'});
}]);
