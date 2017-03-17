'use strict';

/**
 * Controller for PersonAssignment
 **/
personAssignmentModule.controller('PersonAssignmentCtrl', ['PersonAssignment',  'Person', 'Requirement', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(PersonAssignment, Person, Requirement, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Person',  'Requirement',     // edition mode
    $scope.mode = null;
    
	// list of personAssignments
    $scope.personAssignments = [];
	// personAssignment to edit
    $scope.personAssignment = null;

	// referencies entities
	$scope.items = {};
    // persons
	$scope.items.persons = [];
    // requirements
	$scope.items.requirements = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Person.getAllAsListItems().then(
				function(success) {
        	        $scope.items.persons = success.data;
            	}, 
	            MessageHandler.manageError);
		Requirement.getAllAsListItems().then(
				function(success) {
        	        $scope.items.requirements = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh personAssignments list
     */
    $scope.refreshPersonAssignmentList = function() {
    	try {
			$scope.personAssignments = [];
        	PersonAssignment.getAll().then(
				function(success) {
        	        $scope.personAssignments = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh personAssignment
     */
    $scope.refreshPersonAssignment = function(personIdperson, requirementIdrequirement) {
    	try {
        	$scope.personAssignment = null;
	        PersonAssignment.get(personIdperson, requirementIdrequirement).then(
				function(success) {
        	        $scope.personAssignment = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the personAssignments list page
     */
    $scope.goToPersonAssignmentList = function() {
        $scope.refreshPersonAssignmentList();
        $location.path('/personAssignment');
    }
    /**
     * Go to the personAssignment edit page
     */
    $scope.goToPersonAssignment = function(personIdperson, requirementIdrequirement) {
        $scope.refreshPersonAssignment(personIdperson, requirementIdrequirement);
        $location.path('/personAssignment/'+personIdperson+'/'+requirementIdrequirement);
    }

    // Actions

    /**
     * Save personAssignment
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = PersonAssignment.create;
			} else {
				save = PersonAssignment.update;
			}
			save($scope.personAssignment).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.personAssignment = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete personAssignment
     */
    $scope.delete = function(personIdperson, requirementIdrequirement) {
	    try {
			MessageHandler.cleanMessage();
    	    PersonAssignment.delete(personIdperson, requirementIdrequirement).then(
				function(success) {
                	$scope.goToPersonAssignmentList();
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
        $scope.personAssignment = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.personIdperson != null && $routeParams.requirementIdrequirement != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPersonAssignment($routeParams.personIdperson, $routeParams.requirementIdrequirement);
    } else {
        // List page
        $scope.refreshPersonAssignmentList();
    }
    
    
}]);
