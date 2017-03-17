'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('statusCode.module'));
  
  describe('StatusCodeCtrl', function(){
    var StatusCodeCtrl, StatusCode,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// StatusCode service
    	StatusCode = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'statusCode1'});
    			return deferred.promise;
    		}
    	};
		
				StatusCodeCtrl = $controller('StatusCodeCtrl', {
    		'StatusCode': StatusCode,
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
    	expect($scope.statusCode).toBeNull();
    	expect($scope.statusCodes).toBe('statusCode1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshStatusCodeList', function() {
    	// given
    	StatusCode.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'statusCode2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshStatusCodeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.statusCodes).toBe('statusCode2');
    });
    
    it('refreshStatusCode', function() {
    	// given
    	StatusCode.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'statusCode'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshStatusCode('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.statusCode).toBe('statusCode'+'1');
    });
    
	it('goToStatusCodeList', function() {
    	// given
    	spyOn($scope, "refreshStatusCodeList");
    	
    	// when
    	$scope.goToStatusCodeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshStatusCodeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/statusCode');
    });
    
    it('goToStatusCode', function() {
    	// given
    	spyOn($scope, "refreshStatusCode");
    	var id = 1;
    	
    	// when
    	$scope.goToStatusCode(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshStatusCode).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/statusCode'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.statusCode = {id:'1', name:'statusCode'};
    	
    	$scope.mode = 'create';
    	StatusCode.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'statusCodeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.statusCode).toBe('statusCodeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.statusCode = {id:'1', name:'statusCode'};
    	
    	$scope.mode = 'update';
    	StatusCode.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'statusCodeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.statusCode).toBe('statusCodeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	StatusCode.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToStatusCodeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToStatusCodeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : statusCode create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/statusCode/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.statusCode).toBeNull();
    	expect($scope.statusCodes).toBe('statusCode1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});