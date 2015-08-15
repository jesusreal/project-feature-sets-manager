(function () {
    'use strict';   	

    var componentsGlobalTemplate = [
	       {
	      	   	"id":1,
	      	   	"title": "Tree 1 main node",
	      	   	"parentId": null,
	      	   	"tree": "tree1"
	       },
	   	   {
   	    	   "id":2,
   	    	   "title": "Node 1.1",
   	    	   "parentId": 1,
   	    	   "tree": "tree1"
	   	   },
	       {
	  	   	    "id":3,
	  	   	    "title": "Node 1.1.1",
  	   	    	"parentId": 2,
	      	   	"tree": "tree1"
	       },
	       {
	    	   "id":4,
	    	   "title": "Node 1.2.2",
	    	   "parentId": 2,
	    	   "tree": "tree1"
	       },
	       {
	    	   "id":5,
	    	   "title": "Node 1.2.3",
	    	   "parentId": 2,
	    	   "tree": "tree1"
	       },
	       {
	    	   "id":6 ,
	    	   "title": "Node 1.3",
	    	   "parentId": 1,
	    	   "tree": "tree1"
	       },
	       {
	    	   "id":7,
	    	   "title": "Node 1.4",
	    	   "parentId": 1,
	    	   "tree": "tree1"
	       },
	       {
	    	   "id":8,
	    	   "title": "Node 1.5",
	    	   "parentId": 1,
	    	   "tree": "tree1"
	       },
	       {
	    	   "id":9,
	    	   "title": "Node 1.6",
	    	   "parentId": 1,
	    	   "tree": "tree1"
	       },
	       {
	    	   "id":10,
	    	   "title": "Node 1.7",
	    	   "parentId": 1,
	    	   "tree": "tree1"
	       },
	       {
	    	   "id":11,
	    	   "title": "Tree 2 main node",
	    	   "parentId": null,
	    	   "tree": "tree2"
	       },
	       {
	    	   "id":12,
	    	   "title": "Node 2.1",
	    	   "parentId": 11,
	    	   "tree": "tree2"
	       }
       ];

    angular
		.module('projectFeatureSetsManager')
		.value("COMPONENTS_GLOBAL_TEMPLATE_DATA", componentsGlobalTemplate); 	   	   	
    	
})();
