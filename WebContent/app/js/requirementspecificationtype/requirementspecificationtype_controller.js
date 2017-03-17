'use strict';

/**
 * Controller for RequirementSpecificationType
 **/
requirementSpecificationTypeModule.controller('RequirementSpecificationTypeCtrl', ['RequirementSpecificationType',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(RequirementSpecificationType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of requirementSpecificationTypes
    $scope.requirementSpecificationTypes = [];
	// requirementSpecificationType to edit
    $scope.requirementSpecificationType = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh requirementSpecificationTypes list
     */
    $scope.refreshRequirementSpecificationTypeList = function() {
    	try {
			$scope.requirementSpecificationTypes = [];
        	RequirementSpecificationType.getAll().then(
				function(success) {
        	        $scope.requirementSpecificationTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh requirementSpecificationType
     */
    $scope.refreshRequirementSpecificationType = function(requirementIdrequirement, specificationTypeIdrequirementType) {
    	try {
        	$scope.requirementSpecificationType = null;
	        RequirementSpecificationType.get(requirementIdrequirement, specificationTypeIdrequirementType).then(
				function(success) {
        	        $scope.requirementSpecificationType = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the requirementSpecificationTypes list page
     */
    $scope.goToRequirementSpecificationTypeList = function() {
        $scope.refreshRequirementSpecificationTypeList();
        $location.path('/requirementSpecificationType');
    }
    /**
     * Go to the requirementSpecificationType edit page
     */
    $scope.goToRequirementSpecificationType = function(requirementIdrequirement, specificationTypeIdrequirementType) {
        $scope.refreshRequirementSpecificationType(requirementIdrequirement, specificationTypeIdrequirementType);
        $location.path('/requirementSpecificationType/'+requirementIdrequirement+'/'+specificationTypeIdrequirementType);
    }

    // Actions

    /**
     * Save requirementSpecificationType
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = RequirementSpecificationType.create;
			} else {
				save = RequirementSpecificationType.update;
			}
			save($scope.requirementSpecificationType).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.requirementSpecificationType = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete requirementSpecificationType
     */
    $scope.delete = function(requirementIdrequirement, specificationTypeIdrequirementType) {
	    try {
			MessageHandler.cleanMessage();
    	    RequirementSpecificationType.delete(requirementIdrequirement, specificationTypeIdrequirementType).then(
				function(success) {
                	$scope.goToRequirementSpecificationTypeList();
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
        $scope.requirementSpecificationType = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.requirementIdrequirement != null && $routeParams.specificationTypeIdrequirementType != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshRequirementSpecificationType($routeParams.requirementIdrequirement, $routeParams.specificationTypeIdrequirementType);
    } else {
        // List page
        $scope.refreshRequirementSpecificationTypeList();
    }
    
    
}]);
