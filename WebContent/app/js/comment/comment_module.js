'use strict';

/* Module for Comment */

var commentModule = angular.module('comment.module', ['myApp']);

/**
 * Module for comment
 */
commentModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/comment',    {templateUrl: 'partials/comment/comment_list.html', controller: 'CommentCtrl'});
    $routeProvider.when('/comment/new', {templateUrl: 'partials/comment/comment_form.html', controller: 'CommentCtrl'});
    $routeProvider.when('/comment/:idcomment', {templateUrl: 'partials/comment/comment_form.html', controller: 'CommentCtrl'});
}]);
