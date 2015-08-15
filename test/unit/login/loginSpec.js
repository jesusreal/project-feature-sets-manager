'use strict';

/* jasmine specs for app go here */
describe('LoginController', function() {

	/**********************  GLOBAL VARIABLES  **************************/

	var ctrl, rootScope;//, Login;
	
	
	/**********************  HELPER METHODS **************************/


    /**********************  SET UP AND TEAR DOWN  **************************/

	beforeEach(module('projectFeatureSetsManager'));
	beforeEach(inject(function($controller, _$rootScope_, _$q_, _Login_, _$state_) {
		ctrl = $controller('LoginController', {this: null, $scope:_$rootScope_.$new(), $state:_$state_});
		//Login = _Login_;

		var deferred = _$q_.defer();
		rootScope = _$rootScope_;
		deferred.resolve();
		spyOn(_Login_, 'login').and.returnValue(deferred.promise);
		spyOn(_$state_, 'go');
	}));
 

	
	/**********************  TESTS CASES  **************************/

	xit('should login successfully', function(done){
		var loginResult = ctrl.login();
		console.log(loginResult);
		rootScope.$apply();
		expect(loginResult).toBe(true);
		done();

/*		setTimeout(function() {
			console.log("Hu");
		}, 4000);*/
	});
	


	
});