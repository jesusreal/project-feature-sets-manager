'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Grid', function() {
	
    /**********************  CONFIGURATIONS **************************/

	beforeAll(function() {
		jasmine.addMatchers(customMatchers);
		browser.get('app/index.html');
		login();
	});

	afterAll(function(){
		logout();
	});

	
    /**********************  CUSTOM MATCHERS **************************/  

	var customMatchers = {
		toStartWith: function(util, customEqualityTesters) {
			return {
				compare: function(actual, expectedText) {
					return {
						pass: actual.getText().then(function(actualText) {
							return actualText.indexOf(expectedText) === 0;
						})
					};
				}
			};
		}
	};

	
    /**********************  HELPER METHODS **************************/

	function login(){
		var loginButton = element(by.id('login'));
		element(by.id('username')).sendKeys(browser.params.login.username);
		element(by.id('password')).sendKeys(browser.params.login.password);
		loginButton.click(); 
		browser.wait(function(){
			return element(by.id('logged_user_info')).isPresent();
		}, 5000);
	}
	function logout(){
		sleep(5000);
		var logoutButton = element(by.id('logout'));
		logoutButton.click();
	}	
	function sleep(time_ms){
		if (time_ms === undefined) {
			time_ms = 1500;
		}
		browser.sleep(time_ms);
	}
	function getUrl() {
		return browser.getLocationAbsUrl().then(function(url){
			return url;	
		});
	}
	

    /**********************  TESTS  **************************/
	
	describe('Remember page', function() {

		beforeEach(function(){
			browser.get('app/index.html');
		});

		it('should remember project page after editing project', function() {
			var paginationInfo = element(by.id('pagination_info'));

			expect(paginationInfo).toStartWith("Page 1 of");
			element(by.id('next_page')).click();
			expect(paginationInfo).toStartWith("Page 2 of");
					
			element.all(by.className('ui-grid-icon-ok')).first().click();
			element(by.id('edit')).click();
			element(by.id('cancel')).click();
							
			expect(paginationInfo).toStartWith("Page 2 of");
		});
		
		
		it('should remember project page after viewing feature set', function() {
			var paginationInfo = element(by.id('pagination_info'));

			// Projects
			element(by.id('next_page')).click();
			element.all(by.className('ui-grid-icon-ok')).first().click();
			element(by.id('load_feature_sets')).click();

			// Feature Sets
			element.all(by.className('ui-grid-icon-ok')).first().click();
			element(by.id('view')).click();
			expect(getUrl()).toMatch("/feature-set/view");
			element(by.id('close')).click();
			element(by.id('close')).click();
							
			expect(getUrl()).toBe("/project");
			expect(paginationInfo).toStartWith("Page 2 of");
			

		});

	});

	

});
