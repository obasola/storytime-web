'use strict';

/**
 * Controller for Person
 **/
personModule.controller('PersonCtrl', ['Person',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Person, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of persons
    $scope.persons = [];
	// person to edit
    $scope.person = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh persons list
     */
    $scope.refreshPersonList = function() {
    	try {
			$scope.persons = [];
        	Person.getAll().then(
				function(success) {
        	        $scope.persons = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh person
     */
    $scope.refreshPerson = function(idperson) {
    	try {
        	$scope.person = null;
	        Person.get(idperson).then(
				function(success) {
        	        $scope.person = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the persons list page
     */
    $scope.goToPersonList = function() {
        $scope.refreshPersonList();
        $location.path('/person');
    }
    /**
     * Go to the person edit page
     */
    $scope.goToPerson = function(idperson) {
        $scope.refreshPerson(idperson);
        $location.path('/person/'+idperson);
    }

    // Actions

    /**
     * Save person
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Person.create;
			} else {
				save = Person.update;
			}
			save($scope.person).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.person = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete person
     */
    $scope.delete = function(idperson) {
	    try {
			MessageHandler.cleanMessage();
    	    Person.delete(idperson).then(
				function(success) {
                	$scope.goToPersonList();
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
        $scope.person = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.idperson != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPerson($routeParams.idperson);
    } else {
        // List page
        $scope.refreshPersonList();
    }
    
    
}]);
