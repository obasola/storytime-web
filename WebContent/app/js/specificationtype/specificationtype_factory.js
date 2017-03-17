'use strict';

/**
 * Factory for SpecificationType
 */
specificationTypeModule.factory('SpecificationType', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage specificationType
    var entityURL = restURL + '/specificationType';
	
	/**
     * Validate specificationType
     * @param specificationType specificationType
     * @throws validation exception
     */
	var validate = function (specificationType) {
		var errors = [];
        if( specificationType.idrequirementType == null || specificationType.idrequirementType == '' ) {
			errors.push('specificationType.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all specificationTypes as list items
         * @return all specificationTypes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/specificationType');
    	},

        /**
         * Get all specificationTypes
         * @return all specificationTypes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get specificationType
         * @param idrequirementType idrequirementType
         * @return specificationType
         */
    	get: function(idrequirementType) {
    	    var url = entityURL + '/' + idrequirementType;
        	return $http.get(url);
    	},

        /**
         * Create a new specificationType
         * @param specificationType specificationType
         * @return specificationType saved
         */
		create: function(specificationType) {
			validate(specificationType)
			var url = entityURL;
			return $http.post(url, specificationType);
    	},

        /**
         * Update specificationType
         * @param specificationType specificationType
         * @return specificationType saved
         */
    	update: function(specificationType) {
			validate(specificationType)
			var url = entityURL + '/' + specificationType.idrequirementType;
			return $http.put(url, specificationType);
    	},

		/**
         * Delete specificationType
         * @param idrequirementType idrequirementType
         */
    	delete: function(idrequirementType) {
        	var url = entityURL + '/' + idrequirementType;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

