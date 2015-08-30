(function () {

    angular
		.module('projectFeatureSetsManager')
		.controller("ProjectIndexController", ProjectIndexController);

    function ProjectIndexController($modal, Project, FeatureSet, DataGrid, Methods) {
        var self = this;
        this.searchQuery = "";
        this.dataGrid = DataGrid;
        this.dataGrid.initialise(null, "projects");

        this.modalInstance;
       	Project.getAll().then(function(projects) {
            self.projects = projects;
            self.dataGrid.setData(self.projects);
        });


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

