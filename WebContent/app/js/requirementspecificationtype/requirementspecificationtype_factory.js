'use strict';

/**
 * Factory for RequirementSpecificationType
 */
requirementSpecificationTypeModule.factory('RequirementSpecificationType', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage requirementSpecificationType
    var entityURL = restURL + '/requirementSpecificationType';
	
	/**
     * Validate requirementSpecificationType
     * @param requirementSpecificationType requirementSpecificationType
     * @throws validation exception
     */
	var validate = function (requirementSpecificationType) {
		var errors = [];
        if( requirementSpecificationType.requirementIdrequirement == null || requirementSpecificationType.requirementIdrequirement == '' ) {
			errors.push('requirementSpecificationType.id.not.defined');
		}
        if( requirementSpecificationType.specificationTypeIdrequirementType == null || requirementSpecificationType.specificationTypeIdrequirementType == '' ) {
			errors.push('requirementSpecificationType.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all requirementSpecificationTypes as list items
         * @return all requirementSpecificationTypes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/requirementSpecificationType');
    	},

        /**
         * Get all requirementSpecificationTypes
         * @return all requirementSpecificationTypes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get requirementSpecificationType
         * @param requirementIdrequirement requirementIdrequirement
         * @param specificationTypeIdrequirementType specificationTypeIdrequirementType
         * @return requirementSpecificationType
         */
    	get: function(requirementIdrequirement, specificationTypeIdrequirementType) {
    	    var url = entityURL + '/' + requirementIdrequirement + '/' + specificationTypeIdrequirementType;
        	return $http.get(url);
    	},

        /**
         * Create a new requirementSpecificationType
         * @param requirementSpecificationType requirementSpecificationType
         * @return requirementSpecificationType saved
         */
		create: function(requirementSpecificationType) {
			validate(requirementSpecificationType)
			var url = entityURL;
			return $http.post(url, requirementSpecificationType);
    	},

        /**
         * Update requirementSpecificationType
         * @param requirementSpecificationType requirementSpecificationType
         * @return requirementSpecificationType saved
         */
    	update: function(requirementSpecificationType) {
			validate(requirementSpecificationType)
			var url = entityURL + '/' + requirementSpecificationType.requirementIdrequirement + '/' + requirementSpecificationType.specificationTypeIdrequirementType;
			return $http.put(url, requirementSpecificationType);
    	},

		/**
         * Delete requirementSpecificationType
         * @param requirementIdrequirement requirementIdrequirement
         * @param specificationTypeIdrequirementType specificationTypeIdrequirementType
         */
    	delete: function(requirementIdrequirement, specificationTypeIdrequirementType) {
        	var url = entityURL + '/' + requirementIdrequirement + '/' + specificationTypeIdrequirementType;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

