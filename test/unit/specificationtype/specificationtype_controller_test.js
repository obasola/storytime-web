'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('specificationType.module'));
  
  describe('SpecificationTypeCtrl', function(){
    var SpecificationTypeCtrl, SpecificationType,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// SpecificationType service
    	SpecificationType = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'specificationType1'});
    			return deferred.promise;
    		}
    	};
		
				SpecificationTypeCtrl = $controller('SpecificationTypeCtrl', {
    		'SpecificationType': SpecificationType,
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
    	expect($scope.specificationType).toBeNull();
    	expect($scope.specificationTypes).toBe('specificationType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSpecificationTypeList', function() {
    	// given
    	SpecificationType.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'specificationType2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSpecificationTypeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.specificationTypes).toBe('specificationType2');
    });
    
    it('refreshSpecificationType', function() {
    	// given
    	SpecificationType.get = function(idrequirementType) {
			var deferred = $q.defer();
			deferred.resolve({data:'specificationType'+idrequirementType});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSpecificationType('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.specificationType).toBe('specificationType'+'1');
    });
    
	it('goToSpecificationTypeList', function() {
    	// given
    	spyOn($scope, "refreshSpecificationTypeList");
    	
    	// when
    	$scope.goToSpecificationTypeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSpecificationTypeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/specificationType');
    });
    
    it('goToSpecificationType', function() {
    	// given
    	spyOn($scope, "refreshSpecificationType");
    	var idrequirementType = 1;
    	
    	// when
    	$scope.goToSpecificationType(idrequirementType);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSpecificationType).toHaveBeenCalledWith(idrequirementType);
    	expect($location.path).toHaveBeenCalledWith('/specificationType'+'/'+idrequirementType);
    });
    
    it('save : create', function() {
    	// given
    	$scope.specificationType = {idrequirementType:'1', name:'specificationType'};
    	
    	$scope.mode = 'create';
    	SpecificationType.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'specificationTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.specificationType).toBe('specificationTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.specificationType = {idrequirementType:'1', name:'specificationType'};
    	
    	$scope.mode = 'update';
    	SpecificationType.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'specificationTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.specificationType).toBe('specificationTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	SpecificationType.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSpecificationTypeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSpecificationTypeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : specificationType create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/specificationType/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.specificationType).toBeNull();
    	expect($scope.specificationTypes).toBe('specificationType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});