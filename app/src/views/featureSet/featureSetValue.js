(function () {
    'use strict';   	

    var featureSetData = [
       {
    	   "projectId": 10, 
    	   "id":3, 
    	   "name":"fs1", 
    	   "description":"Project 2 - fs1", 
    	   "created":"2015-03-11 15:45:25", 
    	   "lastChanged":"2014-03-11 15:45:25",
       },
       {
    	   "projectId": 10, 
    	   "id":4, 
    	   "name":"fs2", 
    	   "description":"Project 2 - fs2", 
    	   "created":"2015-03-11 15:45:25", 
    	   "lastChanged":"2014-03-11 15:45:25", 
       },
       {
    	   "projectId": 10, 
    	   "id":5, 
    	   "name":"fs3", 
    	   "description":"Project 2 - fs3", 
    	   "created":"2015-03-11 15:45:25", 
    	   "lastChanged":"2014-03-11 15:45:25",
       }
    ];	 

    angular
		.module('projectFeatureSetsManager')
		.value("FEATURE_SET_DATA", featureSetData); 	   	   	
    	
})();
