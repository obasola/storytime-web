'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('comment.module'));
  
  describe('CommentCtrl', function(){
    var CommentCtrl, Comment, Requirement, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// Comment service
    	Comment = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'comment1'});
    			return deferred.promise;
    		}
    	};
		
				Requirement = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				CommentCtrl = $controller('CommentCtrl', {
    		'Comment': Comment,
						'Requirement': Requirement,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.comment).toBeNull();
    	expect($scope.comments).toBe('comment1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshCommentList', function() {
    	// given
    	Comment.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'comment2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshCommentList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.comments).toBe('comment2');
    });
    
    it('refreshComment', function() {
    	// given
    	Comment.get = function(idcomment) {
			var deferred = $q.defer();
			deferred.resolve({data:'comment'+idcomment});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshComment('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.comment).toBe('comment'+'1');
    });
    
	it('goToCommentList', function() {
    	// given
    	spyOn($scope, "refreshCommentList");
    	
    	// when
    	$scope.goToCommentList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshCommentList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/comment');
    });
    
    it('goToComment', function() {
    	// given
    	spyOn($scope, "refreshComment");
    	var idcomment = 1;
    	
    	// when
    	$scope.goToComment(idcomment);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshComment).toHaveBeenCalledWith(idcomment);
    	expect($location.path).toHaveBeenCalledWith('/comment'+'/'+idcomment);
    });
    
    it('save : create', function() {
    	// given
    	$scope.comment = {idcomment:'1', name:'comment'};
    	
    	$scope.mode = 'create';
    	Comment.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'commentSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.comment).toBe('commentSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.comment = {idcomment:'1', name:'comment'};
    	
    	$scope.mode = 'update';
    	Comment.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'commentSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.comment).toBe('commentSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Comment.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToCommentList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToCommentList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : comment create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/comment/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.comment).toBeNull();
    	expect($scope.comments).toBe('comment1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});