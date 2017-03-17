'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('requirementSpecificationType.module'));
  
  describe('RequirementSpecificationType', function(){
	var $httpBackend, RequirementSpecificationType, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	RequirementSpecificationType = $injector.get('RequirementSpecificationType');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/requirementSpecificationType').respond("test");
    	RequirementSpecificationType.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/requirementSpecificationType').respond("test");
    	RequirementSpecificationType.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/requirementSpecificationType/1/2').respond("test");
    	RequirementSpecificationType.get('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		RequirementSpecificationType.create({requirementIdrequirement:null, specificationTypeIdrequirementType:null,name:'requirementSpecificationType'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('requirementSpecificationType.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/requirementSpecificationType').respond("test");
    	RequirementSpecificationType.create({requirementIdrequirement:'1', specificationTypeIdrequirementType:'2',name:'requirementSpecificationType'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		RequirementSpecificationType.update({requirementIdrequirement:null, specificationTypeIdrequirementType:null,name:'requirementSpecificationType'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('requirementSpecificationType.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/requirementSpecificationType/1/2').respond("test");
    	RequirementSpecificationType.update({requirementIdrequirement:'1', specificationTypeIdrequirementType:'2',name:'requirementSpecificationType'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/requirementSpecificationType/1/2').respond("test");
    	RequirementSpecificationType.delete('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});