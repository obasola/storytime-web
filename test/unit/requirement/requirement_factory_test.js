'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('requirement.module'));
  
  describe('Requirement', function(){
	var $httpBackend, Requirement, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Requirement = $injector.get('Requirement');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/requirement').respond("test");
    	Requirement.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/requirement').respond("test");
    	Requirement.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/requirement/1').respond("test");
    	Requirement.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Requirement.create({idrequirement:null,name:'requirement'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('requirement.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/requirement').respond("test");
    	Requirement.create({idrequirement:'1',name:'requirement'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Requirement.update({idrequirement:null,name:'requirement'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('requirement.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/requirement/1').respond("test");
    	Requirement.update({idrequirement:'1',name:'requirement'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/requirement/1').respond("test");
    	Requirement.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});