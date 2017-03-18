'use strict';

/**
 * Factory for Requirement
 */
requirementModule.factory('Requirement', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage requirement
    var entityURL = restURL + '/requirement';
	
	/**
     * Validate requirement
     * @param requirement requirement
     * @throws validation exception
     */
	var validate = function (requirement) {
		var errors = [];
		/*
        if( requirement.idrequirement == null || requirement.idrequirement == '' ) {
			errors.push('requirement.id.not.defined');
		}
		*/
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all requirements as list items
         * @return all requirements as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/requirement');
    	},

        /**
         * Get all requirements
         * @return all requirements
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get requirement
         * @param idrequirement idrequirement
         * @return requirement
         */
    	get: function(idrequirement) {
    	    var url = entityURL + '/' + idrequirement;
        	return $http.get(url);
    	},

        /**
         * Create a new requirement
         * @param requirement requirement
         * @return requirement saved
         */
		create: function(requirement) {
			validate(requirement)
			var url = entityURL;
			return $http.post(url, requirement);
    	},

        /**
         * Update requirement
         * @param requirement requirement
         * @return requirement saved
         */
    	update: function(requirement) {
			validate(requirement)
			var url = entityURL + '/' + requirement.idrequirement;
			return $http.put(url, requirement);
    	},

		/**
         * Delete requirement
         * @param idrequirement idrequirement
         */
    	delete: function(idrequirement) {
        	var url = entityURL + '/' + idrequirement;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

