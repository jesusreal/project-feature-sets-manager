'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Login', function() {
	
    /**********************  CONFIGURATIONS **************************/

	var usernameField = element(by.id('username'));
	var passwordField = element(by.id('password'));
	var loggedUserInfo = element(by.id('logged_user_info'));

	beforeEach(function() {
		browser.get('app/index.html');
		login();
	});
	
	// Helper methods
	function login(){
		var loginButton = element(by.id('login'));
		usernameField.sendKeys(browser.params.login.username);
		passwordField.sendKeys(browser.params.login.password);
		loginButton.click(); 
		browser.wait(function(){
			return loggedUserInfo.isPresent();
		}, 10000);
	}
	function logout(){
		var logoutButton = element(by.id('logout'));
		logoutButton.click();
	}	
	
	
	
	/**********************  HELPER METHODS **************************/
    
    
    /**********************  CUSTOM MATCHERS **************************/  
    
	
    /**********************  TESTS  **************************/
	
	describe('Successful Login', function() {

		it('should login successfully', function() {
			expect(loggedUserInfo.isPresent()).toBe(true);
			logout();
		});

		
		it('should display user id and role after login', function() {
			expect(loggedUserInfo.getText()).toBe('Logged as user id 25 (admin)');
			logout();
		});
		

		it('should have username and passwords empty after logout', function() {
			logout();
			expect(usernameField.getText()).toBe('');
			expect(passwordField.getText()).toBe('');
		});
	});
	
	
	xit('should display a message after unsuccessful login', function() {
		var unsuccessfulLoginMessage = element(by.css('span', 'Invalid username and/or password'));

		element(by.id('username')).sendKeys('wrong_username');
		element(by.id('password')).sendKeys('any_password');
		element(by.id('login')).click();
		
		browser.wait(function(){
			return unsuccessfulLoginMessage.isPresent();
		}, 10000);

		expect(unsuccessfulLoginMessage.isPresent()).toBe(true);
	});
	

	xit('should not display edit buttons on project index before login', function(){});
	xit('should display edit buttons on project index after login', function(){});

	xit('should not display edit buttons on feature set index before login', function(){});
	xit('should display edit buttons on feature set index after login', function(){});

	xit('should go back to projects list after logout', function(){});
	
	xit('should set cookies after successful login', function(){});
	xit('should not set cookies after unsuccessful login', function(){});

	xit('should keep cookies when reloaded', function(){});

	xit('should remove cookies after logout', function(){});
	
	xit('should display access denied message when not logged in', function() {
		//TODO
		var unsuccessfulLoginMessage = element(by.cssContainingText('span', 'Invalid username and/or password'));

		browser.navigate().to('http://localhost:8000/app/#/componentsGlobalTemplateEdit')
		browser.wait(function(){
			return false;
		}, 10000);

		expect(unsuccessfulLoginMessage.isPresent()).toBe(true);
	});
	
	xit('should display first access denied but not second message after login in', function() {});

});
