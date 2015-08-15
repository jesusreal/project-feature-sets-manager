(function () {
    'use strict';   	

    angular
		.module('projectFeatureSetsManager')
		.factory('ProjectActiveComponents', ProjectActiveComponentsFactory); 
				
				
	function ProjectActiveComponentsFactory (PROJECT_ACTIVE_COMPONENTS_DATA, FeatureSet, FeatureSetActiveComponents) {
		return {
			get: function(projectId){
				var projectComponentsData = [];
	    		var amountOfRows = PROJECT_ACTIVE_COMPONENTS_DATA.length;
	    		for (var i=0; i<amountOfRows; i++) {
					var projectIdMatch = (PROJECT_ACTIVE_COMPONENTS_DATA[i].projectId === projectId);
	    			if (projectIdMatch) {
	    	    		projectComponentsData.push(PROJECT_ACTIVE_COMPONENTS_DATA[i]);
	    			}
	    		}
	    		return angular.copy(projectComponentsData);
			},
			getResourcesIdForComponentId: function(componentId){
				var projectsId = [];
	    		var amountOfRows = PROJECT_ACTIVE_COMPONENTS_DATA.length;
	    		for (var i=0; i<amountOfRows; i++) {
					var componentIdMatch = (PROJECT_ACTIVE_COMPONENTS_DATA[i].componentId === componentId);
	    			if (componentIdMatch) {
	    	    		projectsId.push(PROJECT_ACTIVE_COMPONENTS_DATA[i].projectId);
	    			}
	    		}
	    		return angular.copy(projectsId);
			},
			insert: function(projectComponentsData, projectId) {
//				projectComponentsData.id = Math.ceil(Math.random() * 1e3);
				var amountOfComponentsToInsert = projectComponentsData.length;
				for (var i=0; i<amountOfComponentsToInsert; i++) {
					if (projectId!==undefined && !projectComponentsData[i].projectId) {
						projectComponentsData[i].projectId = projectId;
					}
	    			PROJECT_ACTIVE_COMPONENTS_DATA.push(projectComponentsData[i]);
					console.log(projectComponentsData[i]);
				}
			},
			update: function(componentsToUpdate) {
				var projectId = componentsToUpdate[0].projectId;
	    		var amountOfRows = PROJECT_ACTIVE_COMPONENTS_DATA.length;
	    		var returnVal = false;
				var componentsId =  [];
 				for (var i=0; i<componentsToUpdate.length; i++) {
					componentsId.push(componentsToUpdate[i].componentId)
				}
				for (var i=0; i<amountOfRows; i++) {
					var projectIdMatch = (PROJECT_ACTIVE_COMPONENTS_DATA[i].projectId === projectId);
					var currentComponentId = PROJECT_ACTIVE_COMPONENTS_DATA[i].componentId;
					var currentComponentIndexInComponentsToUpdate = componentsId.indexOf(currentComponentId);
					var componentIdMatch = (currentComponentIndexInComponentsToUpdate !== -1);
					if (projectIdMatch && componentIdMatch) {
						PROJECT_ACTIVE_COMPONENTS_DATA[i].state = componentsToUpdate[currentComponentIndexInComponentsToUpdate].state;
						returnVal = true;
					}
				}
	    		return returnVal;
			},
			remove: function(componentsToRemove) {
	    		console.log("ProjectActiveComponents::remove. BEFORE removing: " + PROJECT_ACTIVE_COMPONENTS_DATA.length);
	    		var returnVal = false;
	    		var componentsRemovedFromProject = false;
				var projectId = componentsToRemove[0].projectId;
				var componentsId =  [];
 				for (var i=0; i<componentsToRemove.length; i++) {
					componentsId.push(componentsToRemove[i].componentId)
				}
				for (var i=0; i<PROJECT_ACTIVE_COMPONENTS_DATA.length; i++) {
					var projectIdMatch = (PROJECT_ACTIVE_COMPONENTS_DATA[i].projectId === projectId);
					var currentComponentId = PROJECT_ACTIVE_COMPONENTS_DATA[i].componentId;
					var componentIdMatch = (componentsId.indexOf(currentComponentId) !== -1);
					if (projectIdMatch && componentIdMatch) {
						PROJECT_ACTIVE_COMPONENTS_DATA.splice(i,1);
						i = i - 1;
						componentsRemovedFromProject = true;
					}
				}
	    		console.log("ProjectActiveComponents::remove. AFTER removing: " + PROJECT_ACTIVE_COMPONENTS_DATA.length);
				if (componentsRemovedFromProject) {
					var featureSetsId = FeatureSet.getFeatureSetsIdForProject(projectId);
					if (featureSetsId.length > 0){ 
						var componentsRemovedFromFeatureSet = 
								FeatureSetActiveComponents.removeAfterRemovingFromProject(componentsId, featureSetsId);
						if (componentsRemovedFromFeatureSet){ 
							returnVal = true;
						}
				}

				}
				return returnVal;
			},
			removeAllForProject: function(projectId) {
	    		console.log("ProjectActiveComponents::removeAllForProject. BEFORE removing: " + PROJECT_ACTIVE_COMPONENTS_DATA.length);
				var returnVal = false;
	    		for (var i=0; i<PROJECT_ACTIVE_COMPONENTS_DATA.length; i++) {
					var projectIdMatch = (PROJECT_ACTIVE_COMPONENTS_DATA[i].projectId === projectId);
	    			if (projectIdMatch) {
	    	    		PROJECT_ACTIVE_COMPONENTS_DATA.splice(i,1);
						i = i - 1;
	    	    		returnVal = true;
	    			}
	    		}
	    		console.log("ProjectActiveComponents::removeAllForProject. AFTER removing: " + PROJECT_ACTIVE_COMPONENTS_DATA.length);
	    		return returnVal;
			},
			removeAfterRemovingFromGlobalTemplate: function(componentsId) {
	    		console.log("ProjectActiveComponents::removeAfterRemovingFromGlobalTemplate. BEFORE removing: " +
							PROJECT_ACTIVE_COMPONENTS_DATA.length);
				for (var i=0; i<PROJECT_ACTIVE_COMPONENTS_DATA.length; i++) {
					var currentComponentId = PROJECT_ACTIVE_COMPONENTS_DATA[i].componentId;
					var componentIdMatch = (componentsId.indexOf(currentComponentId) !== -1);
					if (componentIdMatch) {
						PROJECT_ACTIVE_COMPONENTS_DATA.splice(i,1);
						i = i - 1;
					}
				}
	    		console.log("ProjectActiveComponents::removeAfterRemovingFromGlobalTemplate. AFTER removing: " + 	
							PROJECT_ACTIVE_COMPONENTS_DATA.length);
				FeatureSetActiveComponents.removeAfterRemovingFromGlobalTemplate(componentsId);			
			},
		}
	}; 	   	
    	
})();