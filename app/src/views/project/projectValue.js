(function () {
    'use strict';   	

    var projectData = [
       {
    	   "id": 1, 
    	   "name": "Project 1", 
    	   "description": "Project 1 - description", 
    	   "created": "2015-03-11 15:45:25", 
    	   "lastChanged": "2014-03-11 15:45:25",
	   },
       {
		   "id": 12, 
		   "name": "Project 2", 
		   "description": "Project 2 - Description", 
		   "created": "2015-03-11 15:45:25", 
		   "lastChanged": "2014-03-11 15:45:25",
	   },
       {
		   "id": 10, 
		   "name": "Project 3", 
		   "description": "Project 3 - Description", 
		   "created": "2015-03-11 15:45:25", 
		   "lastChanged": "2014-03-11 15:45:25",
	   }
   ];	 

    angular
		.module('projectFeatureSetsManager')
        .value("PROJECT_DATA", projectData);    	
})();
