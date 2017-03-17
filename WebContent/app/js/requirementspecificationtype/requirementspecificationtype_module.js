'use strict';

/* Module for RequirementSpecificationType */

var requirementSpecificationTypeModule = angular.module('requirementSpecificationType.module', ['myApp']);

/**
 * Module for requirementSpecificationType
 */
requirementSpecificationTypeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/requirementSpecificationType',    {templateUrl: 'partials/requirementspecificationtype/requirementspecificationtype_list.html', controller: 'RequirementSpecificationTypeCtrl'});
    $routeProvider.when('/requirementSpecificationType/new', {templateUrl: 'partials/requirementspecificationtype/requirementspecificationtype_form.html', controller: 'RequirementSpecificationTypeCtrl'});
    $routeProvider.when('/requirementSpecificationType/:requirementIdrequirement/:specificationTypeIdrequirementType', {templateUrl: 'partials/requirementspecificationtype/requirementspecificationtype_form.html', controller: 'RequirementSpecificationTypeCtrl'});
}]);
