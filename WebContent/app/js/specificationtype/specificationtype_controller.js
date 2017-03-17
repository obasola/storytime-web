'use strict';

/**
 * Controller for SpecificationType
 **/
specificationTypeModule.controller('SpecificationTypeCtrl', ['SpecificationType',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(SpecificationType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of specificationTypes
    $scope.specificationTypes = [];
	// specificationType to edit
    $scope.specificationType = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh specificationTypes list
     */
    $scope.refreshSpecificationTypeList = function() {
    	try {
			$scope.specificationTypes = [];
        	SpecificationType.getAll().then(
				function(success) {
        	        $scope.specificationTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh specificationType
     */
    $scope.refreshSpecificationType = function(idrequirementType) {
    	try {
        	$scope.specificationType = null;
	        SpecificationType.get(idrequirementType).then(
				function(success) {
        	        $scope.specificationType = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the specificationTypes list page
     */
    $scope.goToSpecificationTypeList = function() {
        $scope.refreshSpecificationTypeList();
        $location.path('/specificationType');
    }
    /**
     * Go to the specificationType edit page
     */
    $scope.goToSpecificationType = function(idrequirementType) {
        $scope.refreshSpecificationType(idrequirementType);
        $location.path('/specificationType/'+idrequirementType);
    }

    // Actions

    /**
     * Save specificationType
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = SpecificationType.create;
			} else {
				save = SpecificationType.update;
			}
			save($scope.specificationType).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.specificationType = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete specificationType
     */
    $scope.delete = function(idrequirementType) {
	    try {
			MessageHandler.cleanMessage();
    	    SpecificationType.delete(idrequirementType).then(
				function(success) {
                	$scope.goToSpecificationTypeList();
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
        $scope.specificationType = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.idrequirementType != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSpecificationType($routeParams.idrequirementType);
    } else {
        // List page
        $scope.refreshSpecificationTypeList();
    }
    
    
}]);
