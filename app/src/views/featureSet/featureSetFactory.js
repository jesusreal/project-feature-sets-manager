(function () {
    'use strict';   	

    angular
		.module('projectFeatureSetsManager')
		.factory('FeatureSet', FeatureSetFactory);
				
	function FeatureSetFactory (FEATURE_SET_DATA, FeatureSetActiveComponents) {
		return {
			getAllForProject: function(projectId){
				var featureSetData = [];
	    		var amountOfRows = FEATURE_SET_DATA.length;
				for (var i=0; i<amountOfRows; i++) {
					var projectIdMatch = (FEATURE_SET_DATA[i].projectId === projectId);
	    			if (projectIdMatch) {
	    	    		featureSetData.push(FEATURE_SET_DATA[i]);
	    			}
	    		}
				return angular.copy(featureSetData);
			},
			getFeatureSetsIdForProject: function(projectId){
				var featureSets = this.getAllForProject(projectId);
				var featureSetsId =  [];
				for (var i=0; i<featureSets.length; i++) {
					featureSetsId.push(featureSets[i].id);
				}
				return featureSetsId;
			},				
			get: function(featureSetId){
				var featureSetData = {};
	    		var amountOfRows = FEATURE_SET_DATA.length;
	    		for (var i=0; i<amountOfRows; i++) {
					var featureSetIdMatch = (FEATURE_SET_DATA[i].id === featureSetId);
	    			if (featureSetIdMatch) {
	    	    		featureSetData = FEATURE_SET_DATA[i];
	    	    		break;
	    			}
	    		}
	    		return angular.copy(featureSetData);
			},
			insert: function(featureSetData, featureSetComponents) {
				featureSetData.id = Math.ceil(Math.random() * 1e3);
	    		FEATURE_SET_DATA.push(featureSetData);
				FeatureSetActiveComponents.insert(featureSetComponents, featureSetData.id);
				return featureSetData.id;
			},
			update: function(featureSetData) {
	    		var returnVal = false;
	    		var featureSetId = featureSetData.id;
	    		var amountOfRows = FEATURE_SET_DATA.length;
	    		for (var i=0; i<amountOfRows; i++) {
					var featureSetIdMatch = (FEATURE_SET_DATA[i].id === featureSetId);
	    			if (featureSetIdMatch) {
	    				var createdCopy = FEATURE_SET_DATA[i].created; 
    					FEATURE_SET_DATA[i] = featureSetData;
    					FEATURE_SET_DATA[i].created = createdCopy;
	        			returnVal = true;
	    	    		break;
	    			}
	    		}
	    		return returnVal;
			},
			remove: function(featureSetId) {
				var returnVal = false;
	    		var featureSetRemoved = false;
				for (var i=0; i<FEATURE_SET_DATA.length; i++) {
					var featureSetIdMatch = (FEATURE_SET_DATA[i].id === featureSetId);
					if (featureSetIdMatch) {
						FEATURE_SET_DATA.splice(i,1);
						featureSetRemoved = true;
						break;
					}
				}
				if (featureSetRemoved) {
					var componentsRemovedFromFeatureSet = FeatureSetActiveComponents.removeAllForFeatureSet(featureSetId)
					if (componentsRemovedFromFeatureSet) {
						returnVal = true;
					}
				}
				return returnVal;
			},
			removeAllForProject: function(projectId) {
	    		var featureSetsRemoved = false;
				var returnVal = true;
				var featureSetsId = this.getFeatureSetsIdForProject(projectId);
				for (var i=0; i<FEATURE_SET_DATA.length; i++) {
					var projectIdMatch = (FEATURE_SET_DATA[i].projectId === projectId);
					if (projectIdMatch) {
						FEATURE_SET_DATA.splice(i,1);
						i = i - 1;
						featureSetsRemoved = true;
					}
				}
	    		console.log(FEATURE_SET_DATA.length);
				if (featureSetsRemoved && featureSetsId.length>0) {
					returnVal = false;
					var componentsRemovedFromFeatureSet = FeatureSetActiveComponents.removeAllForProject(featureSetsId);
					if (componentsRemovedFromFeatureSet) {
						returnVal = true;
					}
				}
				return returnVal;
			}
		}
	}; 	   	
    	
})();