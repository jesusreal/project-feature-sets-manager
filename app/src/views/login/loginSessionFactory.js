(function () {
    'use strict';   	

    angular
		.module('projectFeatureSetsManager')
		.factory('LoginSession', LoginSessionFactory);
				 
	 function LoginSessionFactory ($rootScope, LOGIN_EVENTS, $cookies) {
		 var session = {};

		 session.id =  "";
		 session.user = {
			id: "",
			role: ""
		 };
		 
		session.setCookies = function(){
			$cookies.projectFeatureSetsManagerSessionId = session.id;
			$cookies.projectFeatureSetsManagerUserId = session.user.id;
			$cookies.projectFeatureSetsManagerUserRole = session.user.role;
		};
				 
		session.removeCookies = function() {
		 	delete $cookies.projectFeatureSetsManagerSessionId;
		 	delete $cookies.projectFeatureSetsManagerUserId;
		 	delete $cookies.projectFeatureSetsManagerUserRole;
		};
		
		session.createSessionFromCookies = function(){
			if (Object.keys($cookies).length > 0) {
				var sessionId = $cookies.projectFeatureSetsManagerSessionId;
				var user = {
					id: $cookies.projectFeatureSetsManagerUserId,
					role: $cookies.projectFeatureSetsManagerUserRole
				};
				session.createSession(sessionId, user);
				$rootScope.$broadcast(LOGIN_EVENTS.loginSuccess);
			}
		};

		session.createSession = function (sessionId, user) {
			session.id = sessionId;
			session.user.id = user.id;
			session.user.role = user.role;
			session.setCookies();
		};

		session.destroySession = function () {
			session.id = "";
			session.user.id = "";
			session.user.role = "";
			session.removeCookies();
		};

		return session;
	};    	
})();