(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.controller("LoginController", LoginController);

	function LoginController (Login, LoginSession, LOGIN_EVENTS, $rootScope, $scope, $state) {
    	this.credentials = {
			username: "",
			password: ""
		};
		this.loginFailed = false;
		this.accessDenied = false;
		this.accessDeniedMessage = null;
		
		this.login = function () {
			var self = this;
			return Login.login(this.credentials).then(function () {
				$rootScope.$broadcast(LOGIN_EVENTS.loginSuccess);
				$state.go("project");
				return true;
			}, function () {
				self.loginFailed = true;
				self.resetCredentials();
				$rootScope.$broadcast(LOGIN_EVENTS.loginFailed);
				return false;
			});
		};
		
		this.logout = function () {
			this.resetCredentials();
			LoginSession.destroySession();
			$rootScope.$broadcast(LOGIN_EVENTS.logoutSuccess);
			$state.go("project");	
		};
		
		this.resetCredentials = function(){
			this.credentials.username = "";
			this.credentials.password = "";
		}
		
		
		this.resetAccessDeniedMessage = function() {
			this.accessDeniedMessage = null;
		}
		
		var self = this;
		$rootScope.$on(LOGIN_EVENTS.notAuthenticated, function(event){
			self.accessDeniedMessage = "Access denied. Please log in";
			setTimeout(function() {
				self.resetAccessDeniedMessage();
			}, 2000);
		});
		$scope.$on(LOGIN_EVENTS.notAuthorized, function(event){
			self.accessDeniedMessage = "Access denied. Insufficient rights";
			setTimeout(function() {
				self.resetAccessDeniedMessage();
			}, 2000);
		});

	}
})();

