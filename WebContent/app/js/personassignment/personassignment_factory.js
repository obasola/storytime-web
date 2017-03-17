'use strict';

/**
 * Factory for PersonAssignment
 */
personAssignmentModule.factory('PersonAssignment', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage personAssignment
    var entityURL = restURL + '/personAssignment';
	
	/**
     * Validate personAssignment
     * @param personAssignment personAssignment
     * @throws validation exception
     */
	var validate = function (personAssignment) {
		var errors = [];
        if( personAssignment.personIdperson == null || personAssignment.personIdperson == '' ) {
			errors.push('personAssignment.id.not.defined');
		}
        if( personAssignment.requirementIdrequirement == null || personAssignment.requirementIdrequirement == '' ) {
			errors.push('personAssignment.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all personAssignments as list items
         * @return all personAssignments as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/personAssignment');
    	},

        /**
         * Get all personAssignments
         * @return all personAssignments
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get personAssignment
         * @param personIdperson personIdperson
         * @param requirementIdrequirement requirementIdrequirement
         * @return personAssignment
         */
    	get: function(personIdperson, requirementIdrequirement) {
    	    var url = entityURL + '/' + personIdperson + '/' + requirementIdrequirement;
        	return $http.get(url);
    	},

        /**
         * Create a new personAssignment
         * @param personAssignment personAssignment
         * @return personAssignment saved
         */
		create: function(personAssignment) {
			validate(personAssignment)
			var url = entityURL;
			return $http.post(url, personAssignment);
    	},

        /**
         * Update personAssignment
         * @param personAssignment personAssignment
         * @return personAssignment saved
         */
    	update: function(personAssignment) {
			validate(personAssignment)
			var url = entityURL + '/' + personAssignment.personIdperson + '/' + personAssignment.requirementIdrequirement;
			return $http.put(url, personAssignment);
    	},

		/**
         * Delete personAssignment
         * @param personIdperson personIdperson
         * @param requirementIdrequirement requirementIdrequirement
         */
    	delete: function(personIdperson, requirementIdrequirement) {
        	var url = entityURL + '/' + personIdperson + '/' + requirementIdrequirement;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

