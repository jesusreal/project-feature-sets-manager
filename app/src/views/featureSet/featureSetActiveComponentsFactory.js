(function () {
    'use strict';   	

    angular
		.module('projectFeatureSetsManager')
		.factory('FeatureSetActiveComponents', FeatureSetActiveComponentsFactory); 
				
				
	function FeatureSetActiveComponentsFactory (FEATURE_SET_ACTIVE_COMPONENTS_DATA) {
		return {
			get: function(featureSetId) {
				var featureSetComponentsData = [];
	    		var amountOfRows = FEATURE_SET_ACTIVE_COMPONENTS_DATA.length;
	    		for (var i=0; i<amountOfRows; i++) {
					var featureSetIdMatch = (FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].featureSetId === featureSetId);
	    			if (featureSetIdMatch) {
	    	    		featureSetComponentsData.push(FEATURE_SET_ACTIVE_COMPONENTS_DATA[i]);
	    			}
	    		}
	    		return angular.copy(featureSetComponentsData);
			},
			getResourcesIdForComponentId: function(componentId){
				var featureSetsId = [];
	    		var amountOfRows = FEATURE_SET_ACTIVE_COMPONENTS_DATA.length;
	    		for (var i=0; i<amountOfRows; i++) {
					var componentIdMatch = (FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].componentId === componentId);
	    			if (componentIdMatch) {
	    	    		featureSetsId.push(FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].featureSetId);
	    			}
	    		}
	    		return angular.copy(featureSetsId);
			},
			insert: function(featureSetComponentsData, featureSetId) {
				var amountOfComponentsToInsert = featureSetComponentsData.length;
				for (var i=0; i<amountOfComponentsToInsert; i++) {
					if (featureSetId!==undefined && !featureSetComponentsData[i].featureSetId) {
						featureSetComponentsData[i].featureSetId = featureSetId;
					}
	    			FEATURE_SET_ACTIVE_COMPONENTS_DATA.push(featureSetComponentsData[i]);
				}

			},
			update: function(componentsToUpdate) {
				var featureSetId = componentsToUpdate[0].featureSetId;
				var amountOfRows = FEATURE_SET_ACTIVE_COMPONENTS_DATA.length;
	    		var returnVal = false;
				var componentsId =  [];
 				for (var i=0; i<componentsToUpdate.length; i++) {
					componentsId.push(componentsToUpdate[i].componentId)
				}
				for (var i=0; i<amountOfRows; i++) {
					var featureSetIdMatch = (FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].featureSetId === featureSetId);
					var currentComponentId = FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].componentId;
					var currentComponentIndexInComponentsToUpdate = componentsId.indexOf(currentComponentId);
					var componentIdMatch = (currentComponentIndexInComponentsToUpdate !== -1);
					if (featureSetIdMatch && componentIdMatch) {
						FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].state = componentsToUpdate[currentComponentIndexInComponentsToUpdate].state;
						returnVal = true;
					}
				}
	    		return returnVal;
			},
			remove: function(componentsToRemove) {
	    		console.log("FeatureSetActiveComponents::remove. BEFORE removing: " +
							FEATURE_SET_ACTIVE_COMPONENTS_DATA.length);
	    		var returnVal = false;
				var featureSetId = componentsToRemove[0].featureSetId;
				var componentsId =  [];
 				for (var i=0; i<componentsToRemove.length; i++) {
					componentsId.push(componentsToRemove[i].componentId)
				}				
				for (var i=0; i<FEATURE_SET_ACTIVE_COMPONENTS_DATA.length; i++) {
					var currentFeatureSetId = FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].featureSetId;
					var currentComponentId = FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].componentId;
					var featureSetIdMatch = (currentFeatureSetId === featureSetId);
					var componentIdMatch = (componentsId.indexOf(currentComponentId) !== -1);
					if (featureSetIdMatch && componentIdMatch) {
						FEATURE_SET_ACTIVE_COMPONENTS_DATA.splice(i,1);
						i = i - 1;
						returnVal = true;
					}
				}
	    		console.log("FeatureSetActiveComponents::remove. AFTER removing: " +
							FEATURE_SET_ACTIVE_COMPONENTS_DATA.length);
				return returnVal;
			},
			removeAllForProject: function(featureSetsId) {		
	    		console.log("FeatureSetActiveComponents::removeAllForProject. BEFORE removing: " +
							FEATURE_SET_ACTIVE_COMPONENTS_DATA.length);
				var returnVal = false;
				for (var i=0; i<FEATURE_SET_ACTIVE_COMPONENTS_DATA.length; i++) {
					var currentFeatureSetId = FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].featureSetId;
					var featureSetIdMatch = (featureSetsId.indexOf(currentFeatureSetId) !== -1);
					if (featureSetIdMatch) {
						FEATURE_SET_ACTIVE_COMPONENTS_DATA.splice(i,1);
						i = i - 1;
						returnVal = true;
					}
				}
	    		console.log("FeatureSetActiveComponents::removeAllForProject. AFTER removing: " +
							FEATURE_SET_ACTIVE_COMPONENTS_DATA.length);
				return returnVal;
			},
			removeAllForFeatureSet: function(featureSetId) {		
	    		console.log("FeatureSetActiveComponents::removeAllForFeatureSet. BEFORE removing: " +
							FEATURE_SET_ACTIVE_COMPONENTS_DATA.length);
				var returnVal = false;
				for (var i=0; i<FEATURE_SET_ACTIVE_COMPONENTS_DATA.length; i++) {
					var currentFeatureSetId = FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].featureSetId;
					var featureSetIdMatch = (currentFeatureSetId === featureSetId);
					if (featureSetIdMatch) {
						FEATURE_SET_ACTIVE_COMPONENTS_DATA.splice(i,1);
						i = i - 1;
						returnVal = true;
					}
				}
	    		console.log("FeatureSetActiveComponents::removeAllForFeatureSet. AFTER removing: " +
							FEATURE_SET_ACTIVE_COMPONENTS_DATA.length);
				return returnVal;
			},
			removeAfterRemovingFromGlobalTemplate: function(componentsId) {
	    		console.log("FeatureSetActiveComponents::removeAfterRemovingFromGlobalTemplate. BEFORE removing: " +
							FEATURE_SET_ACTIVE_COMPONENTS_DATA.length);
				for (var i=0; i<FEATURE_SET_ACTIVE_COMPONENTS_DATA.length; i++) {
					var currentComponentId = FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].componentId;
					var componentIdMatch = (componentsId.indexOf(currentComponentId) !== -1);
					if (componentIdMatch) {
						FEATURE_SET_ACTIVE_COMPONENTS_DATA.splice(i,1);
						i = i - 1;
					}
				}
	    		console.log("FeatureSetActiveComponents::removeAfterRemovingFromGlobalTemplate. AFTER removing: " +
							FEATURE_SET_ACTIVE_COMPONENTS_DATA.length);
			},
			removeAfterRemovingFromProject: function(componentsId, featureSetsId) {
	    		console.log("FeatureSetActiveComponents::removeAfterRemovingFromGlobalTemplate. BEFORE removing: " +
							FEATURE_SET_ACTIVE_COMPONENTS_DATA.length);
				for (var i=0; i<FEATURE_SET_ACTIVE_COMPONENTS_DATA.length; i++) {
					var currentFeatureSetId = FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].featureSetId;
					var currentComponentId = FEATURE_SET_ACTIVE_COMPONENTS_DATA[i].componentId;
					var featureSetIdMatch = (featureSetsId.indexOf(currentFeatureSetId) !== -1);
					var componentIdMatch = (componentsId.indexOf(currentComponentId) !== -1);
					if (featureSetIdMatch && componentIdMatch) {
						FEATURE_SET_ACTIVE_COMPONENTS_DATA.splice(i,1);
						i = i - 1;
					}
				}
	    		console.log("FeatureSetActiveComponents::removeAfterRemovingFromGlobalTemplate. AFTER removing: " +
							FEATURE_SET_ACTIVE_COMPONENTS_DATA.length);	
				if (FEATURE_SET_ACTIVE_COMPONENTS_DATA.length === 1)
				console.log(FEATURE_SET_ACTIVE_COMPONENTS_DATA);	
					
			},
		}
	}; 	   	
    	
})();