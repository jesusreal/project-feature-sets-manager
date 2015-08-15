'use strict';

/* jasmine specs for app go here */
xdescribe('Grid Factory', function() {

	/**********************  HELPER METHODS **************************/


    /**********************  SET UP AND TEAR DOWN  **************************/

	beforeEach(module('projectFeatureSetsManager'));


    /**********************  TESTS CASES FOR EXISTENCE **************************/

	describe('check the existence of Grid factory', function(){

		it('check the existence of Grid factory', inject(function(_DataGrid_) {
			expect(_DataGrid_).toBeDefined();
		}));

	});


    /**********************  TESTS CASES FOR METHODS **************************/

	describe('Grid factory methods', function(){

		var DataGrid;

		beforeEach(inject(function(_DataGrid_) {
			DataGrid = _DataGrid_;
		}));

		it('should delete row from grid data', function() {
			var rowId = id;
			DataGrid.deleteRow();
			expect(rowId).toBeGreaterThan(0);
		});
		
		
	});



});