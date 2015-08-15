(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.controller("ProjectNewEditController", ProjectNewEditController);

	function ProjectNewEditController($stateParams, $state, Project, ProjectActiveComponents, ComponentsManagerForProjects, Methods) {
//		console.log("ProjectNewEditController");
//		console.log($stateParams);
//    	console.log($state.current);
		this.projectId = parseInt($stateParams.projectId);
    	this.project = Project.get(this.projectId);
    	this.initialActiveComponents = ProjectActiveComponents.get(this.projectId);
    	ComponentsManagerForProjects.initialise(angular.copy(this.initialActiveComponents), this.projectId);
		ComponentsManagerForProjects.buildTrees();
    	this.componentsManager = ComponentsManagerForProjects;
    	
		this.openModal = function (amountOfComponentsToRemove) {
   			var headerText = "components from project";
			var bodyText = amountOfComponentsToRemove + " components from this project? " 
				+ "The components will be also removed from the feature sets of the project.";
       		var modalInstance = Methods.openModal(headerText, bodyText);
    		return modalInstance.result;
				/*.then(function () {
				ProjectActiveComponents.remove(componentsToRemove.remove);
			});*/
    	};
		
		this.saveProject = function() {
    		//console.log(this.initialActiveComponents);
    		var currentDate = Methods.getDateFormatted(new Date());
    		var projectComponents = ComponentsManagerForProjects.getActiveComponents(); 
    		this.project.lastChanged = currentDate;
    		if (!this.projectId) {
	    		this.project.created = currentDate;
    			Project.insert(this.project, projectComponents);
				$state.go("project");
	    	}
	    	else {
    			Project.update(this.project);
				var modifiedComponents = ComponentsManagerForProjects.getComponentsGroupedByChangeType(this.initialActiveComponents);
				console.log(modifiedComponents);
				if (modifiedComponents.update.length > 0) {
					ProjectActiveComponents.update(modifiedComponents.update);
				}
				if (modifiedComponents.insert.length > 0) {
					ProjectActiveComponents.insert(modifiedComponents.insert);
				}
				if (modifiedComponents.remove.length > 0) {
					var modalResultPromise = this.openModal(modifiedComponents.remove.length);
					modalResultPromise.then(function () {
						ProjectActiveComponents.remove(modifiedComponents.remove);
			    		$state.go("project");
					});
				}
				else {
					$state.go("project");
				}
	    	}
			//console.log(ProjectActiveComponents.get(this.projectId));
    	}; 
		

	}
})();

