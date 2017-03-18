'use strict';

/**
 * Factory for StatusCode
 */
statusCodeModule.factory('StatusCode', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage statusCode
    var entityURL = restURL + '/statusCode';
	
	/**
     * Validate statusCode
     * @param statusCode statusCode
     * @throws validation exception
     */
	var validate = function (statusCode) {
		var errors = [];
		/*
        if( statusCode.id == null || statusCode.id == '' ) {
			errors.push('statusCode.id.not.defined');
		}
		*/
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all statusCodes as list items
         * @return all statusCodes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/statusCode');
    	},

        /**
         * Get all statusCodes
         * @return all statusCodes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get statusCode
         * @param id id
         * @return statusCode
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new statusCode
         * @param statusCode statusCode
         * @return statusCode saved
         */
		create: function(statusCode) {
			validate(statusCode)
			var url = entityURL;
			return $http.post(url, statusCode);
    	},

        /**
         * Update statusCode
         * @param statusCode statusCode
         * @return statusCode saved
         */
    	update: function(statusCode) {
			validate(statusCode)
			var url = entityURL + '/' + statusCode.id;
			return $http.put(url, statusCode);
    	},

		/**
         * Delete statusCode
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

