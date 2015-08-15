(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.controller("FeatureSetIndexController", FeatureSetIndexController);

    function FeatureSetIndexController ($state, $modal, $stateParams, FeatureSet, DataGrid, Methods) {
		console.log($stateParams);
    	console.log($state.current);
		this.projectId = parseInt($stateParams.projectId);
    	this.featureSets = FeatureSet.getAllForProject(this.projectId);
    	this.searchQuery = "";
    	this.dataGrid = DataGrid;
    	this.dataGrid.initialise(this.featureSets, "feature_sets");
    	this.modalInstance; 
    	
    	this.emptySearchQuery = function() {
    		this.searchQuery = "";
    	}
    	
    	this.openModal = function () {
    		var self = this;
    		var headerText = "feature set";
    		this.modalInstance = Methods.openModal(headerText);
    		this.modalInstance.result.then(
				function () {
					self.removeFeatureSet();
				}, 
				function () {}
    		);
    	};
   	
    	this.removeFeatureSet = function(){
    		var featureSetId = this.dataGrid.getSelectedRowId();
    		var returnVal = false;
    		var featureSetRemovedFromFeatureSets = FeatureSet.remove(featureSetId);
    		if (featureSetRemovedFromFeatureSets === true) {
	        	this.featureSets = FeatureSet.getAllForProject(this.projectId);
				this.dataGrid.setData(this.featureSets);
	        	returnVal = true;
    		}
    		return returnVal;
    	} 
    }
    
})();

