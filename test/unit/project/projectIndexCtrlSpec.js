'use strict';

/* jasmine specs for app go here */
describe('ProjectIndexController', function() {

	/**********************  GLOBAL VARIABLES  **************************/

	var ctrl, Project, DataGrid;
	
	
	/**********************  HELPER METHODS **************************/


    /**********************  SET UP AND TEAR DOWN  **************************/

	beforeEach(module('projectFeatureSetsManager'));
	beforeEach(inject(function($controller, _Project_) {
		ctrl = $controller('ProjectIndexController', {this: null});
		Project = _Project_;
	}));


	/**********************  TESTS CASES  **************************/

	it('should empty search query', function(){
		ctrl.emptySearchQuery();
		expect(ctrl.searchQuery).toBe('');
	});
	
	it('should delete Project and update related parameters', function(){
		var selectedRowId = 1;
		var projects = [ {"desc": "project 1 data"}, {"desc": "project 2 data"}, {"desc": "project 3 data"}];
		spyOn(Project,'remove').and.returnValue(true);
		spyOn(Project,'getAll').and.returnValue(projects);
		spyOn(ctrl.dataGrid,'getSelectedRowId').and.returnValue(selectedRowId);
		spyOn(ctrl.dataGrid,'setData');
		spyOn(ctrl.dataGrid,'clearSelectedRows');
		var result = ctrl.removeProject();
		expect(ctrl.dataGrid.getSelectedRowId).toHaveBeenCalled();
		expect(Project.remove).toHaveBeenCalledWith(selectedRowId);
		expect(Project.getAll).toHaveBeenCalled();
		expect(ctrl.dataGrid.setData).toHaveBeenCalledWith(projects);
		expect(ctrl.projects).toEqual(projects);
		expect(result).toBe(true);
	});

	it('should not delete Project', function(){
		var selectedRowId = 1;
		var projects = [ {"desc": "project 1 data"}, {"desc": "project 2 data"}, {"desc": "project 3 data"}];
		spyOn(Project,'remove').and.returnValue(false);
		spyOn(Project,'getAll').and.returnValue(projects);
		spyOn(ctrl.dataGrid,'getSelectedRowId').and.returnValue(selectedRowId);
		spyOn(ctrl.dataGrid,'setData');
		spyOn(ctrl.dataGrid,'clearSelectedRows');
		var result = ctrl.removeProject(selectedRowId);
		expect(Project.remove).toHaveBeenCalledWith(selectedRowId);
		expect(Project.getAll).not.toHaveBeenCalled();
		expect(ctrl.dataGrid.setData).not.toHaveBeenCalled();
		expect(ctrl.dataGrid.clearSelectedRows).not.toHaveBeenCalled();
		expect(result).toBe(false);
	});
	

	
});