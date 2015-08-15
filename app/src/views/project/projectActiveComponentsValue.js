(function () {
    'use strict';   	

    var projectActiveComponentsData = [
       {
    	   "projectId": 1,
           "componentId": 1,
           "state": "indeterminate"
       },
       {
    	   "projectId": 1,
           "componentId": 2,
           "state": "indeterminate"
       },
       {
    	   "projectId": 1,
           "componentId": 5,
           "state": "checked"
       },
       {
    	   "projectId": 1,
           "componentId": 6,
           "state": "checked"
       },
       {
    	   "projectId": 1,
           "componentId": 11,
           "state": "checked"
       },
       {
    	   "projectId": 1,
           "componentId": 12,
           "state": "checked"
       },
		{
    	   "projectId": 10,
           "componentId": 1,
           "state": "indeterminate"
       },
       {
    	   "projectId": 10,
           "componentId": 2,
           "state": "checked"
       },
       {
    	   "projectId": 10,
           "componentId": 3,
           "state": "checked"
       },
       {
    	   "projectId": 10,
           "componentId": 4,
           "state": "checked"
       },
       {
    	   "projectId": 10,
           "componentId": 5,
           "state": "checked"
       },
       {
    	   "projectId": 10,
           "componentId": 7,
           "state": "checked"
       },
       {
    	   "projectId": 10,
           "componentId": 11,
           "state": "checked"
       },
       {
    	   "projectId": 10,
           "componentId": 12,
           "state": "checked"
       },
       {
    	   "projectId": 12,
           "componentId": 11,
           "state": "checked"
       },
       {
    	   "projectId": 12,
           "componentId": 12,
           "state": "checked"
       }
    ];

    angular
		.module('projectFeatureSetsManager')
        .value("PROJECT_ACTIVE_COMPONENTS_DATA", projectActiveComponentsData);    	
})();