(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.controller("ProjectIndexController", ProjectIndexController);

    function ProjectIndexController($modal, Project, FeatureSet, DataGrid, Methods) {
    	this.searchQuery = "";
    	this.projects = Project.getAll();
    	this.dataGrid = DataGrid;
    	this.dataGrid.initialise(this.projects, "projects");
    	this.modalInstance;
    	this.emptySearchQuery = function() {
    		this.searchQuery = "";
    	};
    	
    	this.openModal = function () {
    		var self = this;
   			var headerText = "project";
			var bodyText = "this " + headerText + "? This will also delete the feature sets of this project.";
       		this.modalInstance = Methods.openModal(headerText, bodyText);
    		this.modalInstance.result.then(
				function () {
					self.removeProject();
				}, 
				function () {}
    		);
    	};
    	
    	this.removeProject = function(){
    		var projectId = this.dataGrid.getSelectedRowId();
    		var returnVal = false;
    		var projectRemovedFromProjects = Project.remove(projectId);
    		if (projectRemovedFromProjects === true) {
	        	this.projects = Project.getAll();
	        	this.dataGrid.setData(this.projects);
	        	returnVal = true;
    		}
    		return returnVal;
    	} 
    		
    }
    
})();

