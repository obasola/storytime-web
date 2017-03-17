'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('personAssignment.module'));
  
  describe('PersonAssignmentCtrl', function(){
    var PersonAssignmentCtrl, PersonAssignment, Person,  Requirement, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// PersonAssignment service
    	PersonAssignment = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'personAssignment1'});
    			return deferred.promise;
    		}
    	};
		
				Person = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Requirement = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				PersonAssignmentCtrl = $controller('PersonAssignmentCtrl', {
    		'PersonAssignment': PersonAssignment,
						'Person': Person,
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
    	expect($scope.personAssignment).toBeNull();
    	expect($scope.personAssignments).toBe('personAssignment1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPersonAssignmentList', function() {
    	// given
    	PersonAssignment.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'personAssignment2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPersonAssignmentList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.personAssignments).toBe('personAssignment2');
    });
    
    it('refreshPersonAssignment', function() {
    	// given
    	PersonAssignment.get = function(personIdperson, requirementIdrequirement) {
			var deferred = $q.defer();
			deferred.resolve({data:'personAssignment'+personIdperson+requirementIdrequirement});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPersonAssignment('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.personAssignment).toBe('personAssignment'+'1'+'2');
    });
    
	it('goToPersonAssignmentList', function() {
    	// given
    	spyOn($scope, "refreshPersonAssignmentList");
    	
    	// when
    	$scope.goToPersonAssignmentList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPersonAssignmentList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/personAssignment');
    });
    
    it('goToPersonAssignment', function() {
    	// given
    	spyOn($scope, "refreshPersonAssignment");
    	var personIdperson = 1;
    	var requirementIdrequirement = 2;
    	
    	// when
    	$scope.goToPersonAssignment(personIdperson, requirementIdrequirement);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPersonAssignment).toHaveBeenCalledWith(personIdperson, requirementIdrequirement);
    	expect($location.path).toHaveBeenCalledWith('/personAssignment'+'/'+personIdperson+'/'+requirementIdrequirement);
    });
    
    it('save : create', function() {
    	// given
    	$scope.personAssignment = {personIdperson:'1', requirementIdrequirement:'2', name:'personAssignment'};
    	
    	$scope.mode = 'create';
    	PersonAssignment.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'personAssignmentSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.personAssignment).toBe('personAssignmentSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.personAssignment = {personIdperson:'1', requirementIdrequirement:'2', name:'personAssignment'};
    	
    	$scope.mode = 'update';
    	PersonAssignment.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'personAssignmentSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.personAssignment).toBe('personAssignmentSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	PersonAssignment.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPersonAssignmentList");
    	
    	// when
    	$scope.delete('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPersonAssignmentList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : personAssignment create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/personAssignment/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.personAssignment).toBeNull();
    	expect($scope.personAssignments).toBe('personAssignment1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});