(function () {
    'use strict';   	

    angular
		.module('projectFeatureSetsManager')
		.factory('ComponentsGlobalTemplate', ComponentsGlobalTemplateFactory);
	
	 function ComponentsGlobalTemplateFactory(COMPONENTS_GLOBAL_TEMPLATE_DATA, ProjectActiveComponents) {
		return {
			getAll: function() {
				return angular.copy(COMPONENTS_GLOBAL_TEMPLATE_DATA);

			},
			insert: function(componentData) {
				componentData.id = Math.ceil(Math.random() * 1e3);
				COMPONENTS_GLOBAL_TEMPLATE_DATA.push(componentData);
				return componentData.id;
			},
			update: function(componentData) {
				var amountOfRows = COMPONENTS_GLOBAL_TEMPLATE_DATA.length;
				var componentId = componentData.id;
				var returnVal = false;
				for (var i=0; i<amountOfRows; i++) {
					var componentIdMatch = (COMPONENTS_GLOBAL_TEMPLATE_DATA[i].id === componentId);
					if (componentIdMatch) {
						COMPONENTS_GLOBAL_TEMPLATE_DATA[i].title = componentData.title;
						returnVal = true;
						break;
					}
				}
				return returnVal;
			},
			remove: function(componentsToRemove) {
				var returnVal = false;
				var componentsRemovedFromGlobalTemplate = false;
				var componentsId = [];
				for (var i=0; i<componentsToRemove.length; i++) {
					componentsId.push(componentsToRemove[i].componentId);
				}
				// DB Query simulation
				for (var i=0; i<COMPONENTS_GLOBAL_TEMPLATE_DATA.length; i++) {
					var currentComponentId = COMPONENTS_GLOBAL_TEMPLATE_DATA[i].id;
					var currentComponentParentId = COMPONENTS_GLOBAL_TEMPLATE_DATA[i].parentId;
					var componentMatch = (componentsId.indexOf(currentComponentId) !== -1);
					//var rootComponentMatch = (currentComponentParentId === null);
					if (componentMatch) {
						COMPONENTS_GLOBAL_TEMPLATE_DATA.splice(i,1);
						i = i - 1;
						componentsRemovedFromGlobalTemplate = true;
					}
				}
				if (componentsRemovedFromGlobalTemplate) {
					var componentsRemovedFromProject = ProjectActiveComponents.removeAfterRemovingFromGlobalTemplate(componentsId);
					returnVal = true;
				}			
				return returnVal;
			}
		}
	}; 	   	
    	
})();