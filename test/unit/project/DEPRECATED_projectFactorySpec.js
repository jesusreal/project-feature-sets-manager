'use strict';

/* jasmine specs for app go here */
xdescribe('_Project_ Factory', function() {

	
	/**********************  HELPER METHODS **************************/

	function checkParamsNotToHaveChanged (result, initial, params) {
		for (var i=0; i < params.length; i++){
			var param = params[i];
			expect(result[param]).toBe(initial[param]);
		}
	};
	function checkParamsToHaveChanged (result, update, initial, params) {
		for (var i=0; i < params.length; i++){
			var param = params[i];
			expect(result[param]).toEqual(update[param]);
			expect(result[param]).not.toEqual(initial[param]);
		}
	};


    /**********************  SET UP AND TEAR DOWN  **************************/

	beforeEach(module('projectFeatureSetsManager'));


    /**********************  TESTS CASES FOR EXISTENCE **************************/

	describe('check the existence of _Project_ factory', function(){

		it('check the existence of _Project_ factory', inject(function(_Project_) {
			expect(_Project_).toBeDefined();
		}));

	});


    /**********************  TESTS CASES FOR METHODS **************************/

	describe('_Project_ factory methods', function(){

		var testProjectId = 99999999999;
		var Project;

		beforeEach(inject(function(_Project_) {
			Project = _Project_;
		}));

		it('should get all project entries', function() {
			var allProjects = Project.getAll();
			expect(allProjects.length).toBeGreaterThan(0);
			expect(allProjects[0] instanceof Object).toBe(true);
		});
		
		it('should get a single project entry', function() {
			var existingProjectId = 1;
			var project = Project.get(existingProjectId);
			expect(project.id).toBe(existingProjectId);
		});
		
		it('should insert a project entry', function() {
			var newProjectEntry = {
					"id":testProjectId, 
					"name":"mocked name", 
					"description":"mocked description", 
					"created":"2050-01-31 10:00:00", 
					"lastChanged":"2099-12-31 15:45:25", 
					"components": {"1":"indeterminate", "11":"indeterminate", "113":"checked", "12":"checked", "2":"checked", "21":"checked"}
			};
			Project.insert(newProjectEntry);
			var project = Project.get(testProjectId);
			expect(project.id).toBe(testProjectId);
		});
		
		it('should update a project entry', function() {
			var projectBeforeUpdating = Project.get(testProjectId);
			var updateForProjectEntry = {
					"id":testProjectId, 
					"name":"updated mocked name", 
					"description":"updated mocked description", 
					"created":"0000-00-00 00:00:00", 
					"lastChanged":"2100-12-31 00:11:22", 
					"components": {"1":"indeterminate", "11":"indeterminate", "113":"checked", "12":"checked"}
			};			
			Project.update(updateForProjectEntry);
			var projectAfterUpdating = Project.get(testProjectId);
			
			var paramsNotToHaveChanged = ["created"];
			var paramsToHaveChanged = ["name","description","lastChanged","components"];
			checkParamsNotToHaveChanged(projectAfterUpdating, projectBeforeUpdating, paramsNotToHaveChanged);
			checkParamsToHaveChanged(projectAfterUpdating, updateForProjectEntry, projectBeforeUpdating, paramsToHaveChanged);
		});
		
		it('should remove a project entry', function() {
			Project.remove(testProjectId);
			var project = Project.get(testProjectId);
			expect(Object.keys(project).length).toBe(0);
		});
	});



});