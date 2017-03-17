'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('specificationType.module'));
  
  describe('SpecificationType', function(){
	var $httpBackend, SpecificationType, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	SpecificationType = $injector.get('SpecificationType');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/specificationType').respond("test");
    	SpecificationType.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/specificationType').respond("test");
    	SpecificationType.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/specificationType/1').respond("test");
    	SpecificationType.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		SpecificationType.create({idrequirementType:null,name:'specificationType'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('specificationType.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/specificationType').respond("test");
    	SpecificationType.create({idrequirementType:'1',name:'specificationType'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		SpecificationType.update({idrequirementType:null,name:'specificationType'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('specificationType.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/specificationType/1').respond("test");
    	SpecificationType.update({idrequirementType:'1',name:'specificationType'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/specificationType/1').respond("test");
    	SpecificationType.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});