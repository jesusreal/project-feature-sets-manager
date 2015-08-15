(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.controller("FeatureSetViewController", FeatureSetViewController);

	function FeatureSetViewController ($stateParams, Methods, ProjectActiveComponents,
										  FeatureSet, FeatureSetActiveComponents, ComponentsManagerForFeatureSets) {
		//console.log("FeatureSetViewController");
		//console.log($stateParams);
		this.projectId = parseInt($stateParams.projectId);
		this.featureSetId = parseInt($stateParams.featureSetId);
    	this.featureSet = FeatureSet.get(this.featureSetId);
		console.log(this.featureSet);
    	this.initialActiveComponents = FeatureSetActiveComponents.get(this.featureSetId);
		var componentsToDisplay = ProjectActiveComponents.get(this.projectId);
    	ComponentsManagerForFeatureSets.initialise(angular.copy(this.initialActiveComponents), this.featureSetId, componentsToDisplay);
    	ComponentsManagerForFeatureSets.buildTrees();
    	ComponentsManagerForFeatureSets.activateOnlyView();
    	this.componentsManager = ComponentsManagerForFeatureSets;

	}
})();

