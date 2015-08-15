'use strict';

/* jasmine specs for app go here */
describe('Methods Factory', function() {

	/**********************  HELPER METHODS **************************/



    /**********************  SET UP AND TEAR DOWN  **************************/

	beforeEach(module('projectFeatureSetsManager'));


    /**********************  TESTS CASES FOR EXISTENCE **************************/

	describe('check the existence of Methods factory', function(){

		it('check the existence of Methods factory', inject(function(_Methods_) {
			expect(_Methods_).toBeDefined();
		}));

	});


    /**********************  TESTS CASES FOR METHODS **************************/

	describe('Methods factory methods', function(){

		var Methods;
		
		beforeEach(inject(function(_Methods_) {
			Methods = _Methods_;
		}));

		it('should return the formatted date', function() {
			var d = new Date(2015, 5, 25, 10, 20, 30);
			var result = Methods.getDateFormatted(d);
			expect(result).toBe("2015-06-25 10:20:30")
		});
		
		it('should not return the formatted date', function() {
			var d = "2015-06-25 10:20:30";
			var result = Methods.getDateFormatted(d);
			expect(result).toBe(false);
		});
		
	});


});