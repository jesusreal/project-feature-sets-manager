(function () {
    'use strict';   	

    angular
		.module('projectFeatureSetsManager')
		.factory('Project', ProjectFactory); 
				
				
	function ProjectFactory (PROJECT_DATA, ProjectActiveComponents, FeatureSet) {
		return {
			getAll: function(){
				return angular.copy(PROJECT_DATA);
			},
			get: function(projectId){
				var projectData = {};
	    		var amountOfRows = PROJECT_DATA.length;
	    		for (var i=0; i<amountOfRows; i++) {
					var projectIdMatch = (PROJECT_DATA[i].id === projectId);
	    			if (projectIdMatch) {
						projectData = PROJECT_DATA[i];
	    	    		break;
	    			}
	    		}
	    		return angular.copy(projectData);
			},
			insert: function(projectData, projectComponents) {
				projectData.id = Math.ceil(Math.random() * 1e3);
	    		PROJECT_DATA.push(projectData);
				ProjectActiveComponents.insert(projectComponents, projectData.id);
				return projectData.id;
			},
			update: function(projectData) {
	    		var amountOfRows = PROJECT_DATA.length;
	    		var projectId = projectData.id;
	    		var returnVal = false;
	    		for (var i=0; i<amountOfRows; i++) {
					var projectIdMatch = (PROJECT_DATA[i].id === projectId);
	    			if (projectIdMatch) {
	    				var createdCopy = PROJECT_DATA[i].created; 
	    				PROJECT_DATA[i] = projectData;
	    				PROJECT_DATA[i].created = createdCopy;
	        			returnVal = true;
	    	    		break;
	    			}
	    		}
	    		return returnVal;
			},
			remove: function(projectId) {
	    		var returnVal = false;
				var projectRemoved = false;
	    		var amountOfRows = PROJECT_DATA.length;
	    		for (var i=0; i<amountOfRows; i++) {
					var projectIdMatch = (PROJECT_DATA[i].id === projectId);
	    			if (projectIdMatch) {
						PROJECT_DATA.splice(i,1);
	    	    		projectRemoved = true;
	    	    		break;
	    			}
	    		}
				if (projectRemoved) {
					var componentsRemovedFromProject = ProjectActiveComponents.removeAllForProject(projectId);
					var featureSetsRemoved = FeatureSet.removeAllForProject(projectId);
					console.log("Project removed: " + componentsRemovedFromProject + featureSetsRemoved);
					if (componentsRemovedFromProject && featureSetsRemoved) {
						returnVal = true;
					};
				}
	    		return returnVal;
			}
		}
	}; 	   	
    	
})();