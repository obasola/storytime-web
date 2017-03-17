'use strict';

/**
 * Controller for Requirement
 **/
requirementModule.controller('RequirementCtrl', ['Requirement',  'SpecificationType', 'StatusCode', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Requirement, SpecificationType, StatusCode, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'SpecificationType',  'StatusCode',     // edition mode
    $scope.mode = null;
    
	// list of requirements
    $scope.requirements = [];
	// requirement to edit
    $scope.requirement = null;

	// referencies entities
	$scope.items = {};
    // specificationTypes
	$scope.items.specificationTypes = [];
    // statusCodes
	$scope.items.statusCodes = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		SpecificationType.getAllAsListItems().then(
				function(success) {
        	        $scope.items.specificationTypes = success.data;
            	}, 
	            MessageHandler.manageError);
		StatusCode.getAllAsListItems().then(
				function(success) {
        	        $scope.items.statusCodes = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh requirements list
     */
    $scope.refreshRequirementList = function() {
    	try {
			$scope.requirements = [];
        	Requirement.getAll().then(
				function(success) {
        	        $scope.requirements = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh requirement
     */
    $scope.refreshRequirement = function(idrequirement) {
    	try {
        	$scope.requirement = null;
	        Requirement.get(idrequirement).then(
				function(success) {
        	        $scope.requirement = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the requirements list page
     */
    $scope.goToRequirementList = function() {
        $scope.refreshRequirementList();
        $location.path('/requirement');
    }
    /**
     * Go to the requirement edit page
     */
    $scope.goToRequirement = function(idrequirement) {
        $scope.refreshRequirement(idrequirement);
        $location.path('/requirement/'+idrequirement);
    }

    // Actions

    /**
     * Save requirement
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Requirement.create;
			} else {
				save = Requirement.update;
			}
			save($scope.requirement).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.requirement = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete requirement
     */
    $scope.delete = function(idrequirement) {
	    try {
			MessageHandler.cleanMessage();
    	    Requirement.delete(idrequirement).then(
				function(success) {
                	$scope.goToRequirementList();
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
        $scope.requirement = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.idrequirement != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshRequirement($routeParams.idrequirement);
    } else {
        // List page
        $scope.refreshRequirementList();
    }
    
    
}]);
