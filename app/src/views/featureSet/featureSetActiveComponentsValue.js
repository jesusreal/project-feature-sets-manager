(function () {
    'use strict';   	

    var featureSetActiveComponentsData = [
       {
    	   "featureSetId": 3,
           "componentId": 1,
           "state": "indeterminate"
       },
       {
    	   "featureSetId": 3,
           "componentId": 7,
           "state": "checked"
       },
       {
    	   "featureSetId": 4,
           "componentId": 1,
           "state": "indeterminate"
       },
       {
    	   "featureSetId": 4,
           "componentId": 2,
           "state": "indeterminate"
       },
       {
    	   "featureSetId": 4,
           "componentId": 4,
           "state": "checked"
       },
       {
    	   "featureSetId": 5,
           "componentId": 1,
           "state": "indeterminate"
       },
       {
    	   "featureSetId": 5,
           "componentId": 2,
           "state": "indeterminate"
       },
       {
    	   "featureSetId": 5,
           "componentId": 3,
           "state": "checked"
       },
       {
    	   "featureSetId": 5,
           "componentId": 5,
           "state": "checked"
       }
    ];
	
    angular
		.module('projectFeatureSetsManager')
        .value("FEATURE_SET_ACTIVE_COMPONENTS_DATA", featureSetActiveComponentsData);    	
})();