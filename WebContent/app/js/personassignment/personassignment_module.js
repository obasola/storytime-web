'use strict';

/* Module for PersonAssignment */

var personAssignmentModule = angular.module('personAssignment.module', ['myApp']);

/**
 * Module for personAssignment
 */
personAssignmentModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/personAssignment',    {templateUrl: 'partials/personassignment/personassignment_list.html', controller: 'PersonAssignmentCtrl'});
    $routeProvider.when('/personAssignment/new', {templateUrl: 'partials/personassignment/personassignment_form.html', controller: 'PersonAssignmentCtrl'});
    $routeProvider.when('/personAssignment/:personIdperson/:requirementIdrequirement', {templateUrl: 'partials/personassignment/personassignment_form.html', controller: 'PersonAssignmentCtrl'});
}]);
