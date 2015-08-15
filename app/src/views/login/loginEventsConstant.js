(function () {
    'use strict';   	
	
	var loginEvents = {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		notAuthorized: "auth-not-authorized",
		notAuthenticated: "auth-not-authenticated"
	};
    
	angular
		.module('projectFeatureSetsManager')
		.constant("LOGIN_EVENTS", loginEvents); 	   	   	
    	
})();