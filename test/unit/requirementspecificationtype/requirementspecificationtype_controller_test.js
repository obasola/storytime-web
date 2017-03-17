'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('requirementSpecificationType.module'));
  
  describe('RequirementSpecificationTypeCtrl', function(){
    var RequirementSpecificationTypeCtrl, RequirementSpecificationType,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// RequirementSpecificationType service
    	RequirementSpecificationType = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'requirementSpecificationType1'});
    			return deferred.promise;
    		}
    	};
		
				RequirementSpecificationTypeCtrl = $controller('RequirementSpecificationTypeCtrl', {
    		'RequirementSpecificationType': RequirementSpecificationType,
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
    	expect($scope.requirementSpecificationType).toBeNull();
    	expect($scope.requirementSpecificationTypes).toBe('requirementSpecificationType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshRequirementSpecificationTypeList', function() {
    	// given
    	RequirementSpecificationType.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'requirementSpecificationType2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshRequirementSpecificationTypeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.requirementSpecificationTypes).toBe('requirementSpecificationType2');
    });
    
    it('refreshRequirementSpecificationType', function() {
    	// given
    	RequirementSpecificationType.get = function(requirementIdrequirement, specificationTypeIdrequirementType) {
			var deferred = $q.defer();
			deferred.resolve({data:'requirementSpecificationType'+requirementIdrequirement+specificationTypeIdrequirementType});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshRequirementSpecificationType('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.requirementSpecificationType).toBe('requirementSpecificationType'+'1'+'2');
    });
    
	it('goToRequirementSpecificationTypeList', function() {
    	// given
    	spyOn($scope, "refreshRequirementSpecificationTypeList");
    	
    	// when
    	$scope.goToRequirementSpecificationTypeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshRequirementSpecificationTypeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/requirementSpecificationType');
    });
    
    it('goToRequirementSpecificationType', function() {
    	// given
    	spyOn($scope, "refreshRequirementSpecificationType");
    	var requirementIdrequirement = 1;
    	var specificationTypeIdrequirementType = 2;
    	
    	// when
    	$scope.goToRequirementSpecificationType(requirementIdrequirement, specificationTypeIdrequirementType);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshRequirementSpecificationType).toHaveBeenCalledWith(requirementIdrequirement, specificationTypeIdrequirementType);
    	expect($location.path).toHaveBeenCalledWith('/requirementSpecificationType'+'/'+requirementIdrequirement+'/'+specificationTypeIdrequirementType);
    });
    
    it('save : create', function() {
    	// given
    	$scope.requirementSpecificationType = {requirementIdrequirement:'1', specificationTypeIdrequirementType:'2', name:'requirementSpecificationType'};
    	
    	$scope.mode = 'create';
    	RequirementSpecificationType.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'requirementSpecificationTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.requirementSpecificationType).toBe('requirementSpecificationTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.requirementSpecificationType = {requirementIdrequirement:'1', specificationTypeIdrequirementType:'2', name:'requirementSpecificationType'};
    	
    	$scope.mode = 'update';
    	RequirementSpecificationType.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'requirementSpecificationTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.requirementSpecificationType).toBe('requirementSpecificationTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	RequirementSpecificationType.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToRequirementSpecificationTypeList");
    	
    	// when
    	$scope.delete('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToRequirementSpecificationTypeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : requirementSpecificationType create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/requirementSpecificationType/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.requirementSpecificationType).toBeNull();
    	expect($scope.requirementSpecificationTypes).toBe('requirementSpecificationType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});