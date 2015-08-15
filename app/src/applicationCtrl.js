(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.controller("ApplicationController", ApplicationController);

	function ApplicationController (Login, LoginSession, $scope, LOGIN_EVENTS, LOGIN_ROLES) {
		this.currentUser = null;
		this.authorizedRolesForActions = LOGIN_ROLES.authorizations;
		this.isAuthorized = Login.isAuthorized;
		this.isAuthenticated = Login.isAuthenticated;
		
		this.setCurrentUser = function () {
			this.currentUser = LoginSession.user;
		};
				
		var self = this;
		$scope.$on(LOGIN_EVENTS.loginSuccess, function(event){
			self.setCurrentUser();
		});	
		$scope.$on(LOGIN_EVENTS.loginSuccess, function(event){
			self.setCurrentUser();
		});	
		$scope.$on(LOGIN_EVENTS.logoutSuccess, function(event){
			self.setCurrentUser();
		});
	}
})();

