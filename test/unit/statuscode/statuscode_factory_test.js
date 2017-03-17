'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('statusCode.module'));
  
  describe('StatusCode', function(){
	var $httpBackend, StatusCode, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	StatusCode = $injector.get('StatusCode');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/statusCode').respond("test");
    	StatusCode.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/statusCode').respond("test");
    	StatusCode.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/statusCode/1').respond("test");
    	StatusCode.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		StatusCode.create({id:null,name:'statusCode'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('statusCode.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/statusCode').respond("test");
    	StatusCode.create({id:'1',name:'statusCode'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		StatusCode.update({id:null,name:'statusCode'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('statusCode.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/statusCode/1').respond("test");
    	StatusCode.update({id:'1',name:'statusCode'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/statusCode/1').respond("test");
    	StatusCode.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});