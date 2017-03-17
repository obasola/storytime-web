'use strict';

/**
 * Controller for StatusCode
 **/
statusCodeModule.controller('StatusCodeCtrl', ['StatusCode',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(StatusCode, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of statusCodes
    $scope.statusCodes = [];
	// statusCode to edit
    $scope.statusCode = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh statusCodes list
     */
    $scope.refreshStatusCodeList = function() {
    	try {
			$scope.statusCodes = [];
        	StatusCode.getAll().then(
				function(success) {
        	        $scope.statusCodes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh statusCode
     */
    $scope.refreshStatusCode = function(id) {
    	try {
        	$scope.statusCode = null;
	        StatusCode.get(id).then(
				function(success) {
        	        $scope.statusCode = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the statusCodes list page
     */
    $scope.goToStatusCodeList = function() {
        $scope.refreshStatusCodeList();
        $location.path('/statusCode');
    }
    /**
     * Go to the statusCode edit page
     */
    $scope.goToStatusCode = function(id) {
        $scope.refreshStatusCode(id);
        $location.path('/statusCode/'+id);
    }

    // Actions

    /**
     * Save statusCode
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = StatusCode.create;
			} else {
				save = StatusCode.update;
			}
			save($scope.statusCode).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.statusCode = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete statusCode
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    StatusCode.delete(id).then(
				function(success) {
                	$scope.goToStatusCodeList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.statusCode = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshStatusCode($routeParams.id);
    } else {
        // List page
        $scope.refreshStatusCodeList();
    }
    
    
}]);
