'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('requirement.module'));
  
  describe('RequirementCtrl', function(){
    var RequirementCtrl, Requirement, SpecificationType,  StatusCode, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Requirement service
    	Requirement = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'requirement1'});
    			return deferred.promise;
    		}
    	};
		
				SpecificationType = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				StatusCode = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				RequirementCtrl = $controller('RequirementCtrl', {
    		'Requirement': Requirement,
						'SpecificationType': SpecificationType,
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
    	expect($scope.requirement).toBeNull();
    	expect($scope.requirements).toBe('requirement1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshRequirementList', function() {
    	// given
    	Requirement.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'requirement2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshRequirementList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.requirements).toBe('requirement2');
    });
    
    it('refreshRequirement', function() {
    	// given
    	Requirement.get = function(idrequirement) {
			var deferred = $q.defer();
			deferred.resolve({data:'requirement'+idrequirement});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshRequirement('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.requirement).toBe('requirement'+'1');
    });
    
	it('goToRequirementList', function() {
    	// given
    	spyOn($scope, "refreshRequirementList");
    	
    	// when
    	$scope.goToRequirementList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshRequirementList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/requirement');
    });
    
    it('goToRequirement', function() {
    	// given
    	spyOn($scope, "refreshRequirement");
    	var idrequirement = 1;
    	
    	// when
    	$scope.goToRequirement(idrequirement);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshRequirement).toHaveBeenCalledWith(idrequirement);
    	expect($location.path).toHaveBeenCalledWith('/requirement'+'/'+idrequirement);
    });
    
    it('save : create', function() {
    	// given
    	$scope.requirement = {idrequirement:'1', name:'requirement'};
    	
    	$scope.mode = 'create';
    	Requirement.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'requirementSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.requirement).toBe('requirementSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.requirement = {idrequirement:'1', name:'requirement'};
    	
    	$scope.mode = 'update';
    	Requirement.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'requirementSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.requirement).toBe('requirementSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Requirement.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToRequirementList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToRequirementList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : requirement create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/requirement/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.requirement).toBeNull();
    	expect($scope.requirements).toBe('requirement1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});