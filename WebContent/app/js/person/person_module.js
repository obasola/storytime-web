'use strict';

/* Module for Person */

var personModule = angular.module('person.module', ['myApp']);

/**
 * Module for person
 */
personModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/person',    {templateUrl: 'partials/person/person_list.html', controller: 'PersonCtrl'});
    $routeProvider.when('/person/new', {templateUrl: 'partials/person/person_form.html', controller: 'PersonCtrl'});
    $routeProvider.when('/person/:idperson', {templateUrl: 'partials/person/person_form.html', controller: 'PersonCtrl'});
}]);
