'use strict';

/**
 * Factory for Person
 */
personModule.factory('Person', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage person
    var entityURL = restURL + '/person';
	
	/**
     * Validate person
     * @param person person
     * @throws validation exception
     */
	var validate = function (person) {
		var errors = [];
		/*
        if( person.idperson == null || person.idperson == '' ) {
			errors.push('person.id.not.defined');
		}
		*/
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all persons as list items
         * @return all persons as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/person');
    	},

        /**
         * Get all persons
         * @return all persons
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get person
         * @param idperson idperson
         * @return person
         */
    	get: function(idperson) {
    	    var url = entityURL + '/' + idperson;
        	return $http.get(url);
    	},

        /**
         * Create a new person
         * @param person person
         * @return person saved
         */
		create: function(person) {
			validate(person)
			var url = entityURL;
			return $http.post(url, person);
    	},

        /**
         * Update person
         * @param person person
         * @return person saved
         */
    	update: function(person) {
			validate(person)
			var url = entityURL + '/' + person.idperson;
			return $http.put(url, person);
    	},

		/**
         * Delete person
         * @param idperson idperson
         */
    	delete: function(idperson) {
        	var url = entityURL + '/' + idperson;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

