'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('personAssignment.module'));
  
  describe('PersonAssignment', function(){
	var $httpBackend, PersonAssignment, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	PersonAssignment = $injector.get('PersonAssignment');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/personAssignment').respond("test");
    	PersonAssignment.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/personAssignment').respond("test");
    	PersonAssignment.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/personAssignment/1/2').respond("test");
    	PersonAssignment.get('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		PersonAssignment.create({personIdperson:null, requirementIdrequirement:null,name:'personAssignment'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('personAssignment.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/personAssignment').respond("test");
    	PersonAssignment.create({personIdperson:'1', requirementIdrequirement:'2',name:'personAssignment'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		PersonAssignment.update({personIdperson:null, requirementIdrequirement:null,name:'personAssignment'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('personAssignment.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/personAssignment/1/2').respond("test");
    	PersonAssignment.update({personIdperson:'1', requirementIdrequirement:'2',name:'personAssignment'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/personAssignment/1/2').respond("test");
    	PersonAssignment.delete('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});