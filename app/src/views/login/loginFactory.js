(function () {
	
    angular
		.module('projectFeatureSetsManager')
		.factory('Login', LoginFactory);
				 
	 function LoginFactory ($q, LoginSession) {
		 var loginFactory = {};

		 
		 loginFactory.login = function (credentials) {
			var role = credentials.username === "super" ? "admin" : "";
			var action = "resolve";
			var res = {
				sessionId: Math.ceil(Math.random() * 1e8),
				user: {
					id: 25,
					role:  role
				}
			};
			var deferred = $q.defer();
			setTimeout(function() {
				if (action==="resolve" && role==="admin") {
					LoginSession.createSession(res.sessionId, res.user);
					deferred.resolve();
				} else {
					deferred.reject();
				}
			}, 1000);
			return deferred.promise;
/*				return $http
				.post('/login', credentials)
				.then(function (res) {
					LoginSession.create(res.data.id, res.data.user.id,
							   res.data.user.role);
					return res.data.user;
			  });*/
		};
		 
		 loginFactory.isAuthenticated = function () {
			var returnVal = false;
			if (LoginSession.user !== null) {
				returnVal = !!LoginSession.user.id;
			}
			return returnVal;
		};

		loginFactory.isAuthorized = function (authorizedRoles) {
			var returnVal = false;
			if (authorizedRoles !== undefined) {
				if (typeof authorizedRoles === "string") {
					authorizedRoles = [authorizedRoles];
				}
				returnVal = (loginFactory.isAuthenticated() && authorizedRoles.indexOf(LoginSession.user.role) !== -1);
			}
			return returnVal;
			//return true;
		};

		return loginFactory;
	};    	
})();