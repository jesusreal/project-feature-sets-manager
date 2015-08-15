(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.controller("FeatureSetNewEditController", FeatureSetNewEditController);

	function FeatureSetNewEditController ($stateParams, $state, Methods, ProjectActiveComponents,
										  FeatureSet, FeatureSetActiveComponents, ComponentsManagerForFeatureSets) {
		console.log("FeatureSetNewEditController");
		console.log($stateParams);
    	console.log($state.current);
		this.projectId = parseInt($stateParams.projectId);
		this.featureSetId = parseInt($stateParams.featureSetId);
    	this.featureSet = FeatureSet.get(this.featureSetId);
    	this.initialActiveComponents = FeatureSetActiveComponents.get(this.featureSetId);
    	var componentsToDisplay = ProjectActiveComponents.get(this.projectId);
    	ComponentsManagerForFeatureSets.initialise(angular.copy(this.initialActiveComponents), this.featureSetId, componentsToDisplay);
    	ComponentsManagerForFeatureSets.buildTrees();
    	this.componentsManager = ComponentsManagerForFeatureSets;

    	this.saveFeatureSet = function() {
    		var currentDate = Methods.getDateFormatted(new Date());
    		this.featureSet.lastChanged = currentDate;
    		var featureSetComponents = ComponentsManagerForFeatureSets.getActiveComponents(); 
    		if (!this.featureSet.id) {
	    		this.featureSet.projectId = this.projectId;   		
	    		this.featureSet.created = currentDate;
    			FeatureSet.insert(this.featureSet, featureSetComponents);
	    	}
	    	else {
    			FeatureSet.update(this.featureSet);
				var modifiedComponents = ComponentsManagerForFeatureSets.getComponentsGroupedByChangeType(this.initialActiveComponents);
				console.log(modifiedComponents);
				if (modifiedComponents.update.length > 0) {
					FeatureSetActiveComponents.update(modifiedComponents.update);
				}
				if (modifiedComponents.insert.length > 0) {
					FeatureSetActiveComponents.insert(modifiedComponents.insert);
				}
				if (modifiedComponents.remove.length > 0) {
					FeatureSetActiveComponents.remove(modifiedComponents.remove);
				}
	    	}
    		$state.go("project.feature-set");
    	}; 	
		
	}
})();

