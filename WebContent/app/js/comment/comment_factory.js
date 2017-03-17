'use strict';

/**
 * Factory for Comment
 */
commentModule.factory('Comment', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage comment
    var entityURL = restURL + '/comment';
	
	/**
     * Validate comment
     * @param comment comment
     * @throws validation exception
     */
	var validate = function (comment) {
		var errors = [];
        if( comment.idcomment == null || comment.idcomment == '' ) {
			errors.push('comment.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all comments as list items
         * @return all comments as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/comment');
    	},

        /**
         * Get all comments
         * @return all comments
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get comment
         * @param idcomment idcomment
         * @return comment
         */
    	get: function(idcomment) {
    	    var url = entityURL + '/' + idcomment;
        	return $http.get(url);
    	},

        /**
         * Create a new comment
         * @param comment comment
         * @return comment saved
         */
		create: function(comment) {
			validate(comment)
			var url = entityURL;
			return $http.post(url, comment);
    	},

        /**
         * Update comment
         * @param comment comment
         * @return comment saved
         */
    	update: function(comment) {
			validate(comment)
			var url = entityURL + '/' + comment.idcomment;
			return $http.put(url, comment);
    	},

		/**
         * Delete comment
         * @param idcomment idcomment
         */
    	delete: function(idcomment) {
        	var url = entityURL + '/' + idcomment;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

