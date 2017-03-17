'use strict';

/**
 * Controller for Comment
 **/
commentModule.controller('CommentCtrl', ['Comment',  'Requirement', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Comment, Requirement, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Requirement',     // edition mode
    $scope.mode = null;
    
	// list of comments
    $scope.comments = [];
	// comment to edit
    $scope.comment = null;

	// referencies entities
	$scope.items = {};
    // requirements
	$scope.items.requirements = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Requirement.getAllAsListItems().then(
				function(success) {
        	        $scope.items.requirements = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh comments list
     */
    $scope.refreshCommentList = function() {
    	try {
			$scope.comments = [];
        	Comment.getAll().then(
				function(success) {
        	        $scope.comments = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh comment
     */
    $scope.refreshComment = function(idcomment) {
    	try {
        	$scope.comment = null;
	        Comment.get(idcomment).then(
				function(success) {
        	        $scope.comment = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the comments list page
     */
    $scope.goToCommentList = function() {
        $scope.refreshCommentList();
        $location.path('/comment');
    }
    /**
     * Go to the comment edit page
     */
    $scope.goToComment = function(idcomment) {
        $scope.refreshComment(idcomment);
        $location.path('/comment/'+idcomment);
    }

    // Actions

    /**
     * Save comment
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Comment.create;
			} else {
				save = Comment.update;
			}
			save($scope.comment).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.comment = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete comment
     */
    $scope.delete = function(idcomment) {
	    try {
			MessageHandler.cleanMessage();
    	    Comment.delete(idcomment).then(
				function(success) {
                	$scope.goToCommentList();
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
        $scope.comment = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.idcomment != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshComment($routeParams.idcomment);
    } else {
        // List page
        $scope.refreshCommentList();
    }
    
    
}]);
