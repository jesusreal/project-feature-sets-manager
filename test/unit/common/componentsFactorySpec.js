'use strict';

/* jasmine specs for app go here */
xdescribe('Components Factory', function() {

	/**********************  HELPER METHODS **************************/



    /**********************  SET UP AND TEAR DOWN  **************************/

	beforeEach(module('projectFeatureSetsManager'));


    /**********************  TESTS CASES FOR EXISTENCE **************************/

	describe('check the existence of Components Manager factory', function(){

		it('check the existence of Components Manager factory', inject(function(_ComponentsManager_) {
			expect(_ComponentsManager_).toBeDefined();
		}));

	});


    /**********************  TESTS CASES FOR METHODS **************************/

	describe('Methods', function(){

		var ComponentsManager;

		
		beforeEach(inject(function(_ComponentsManager_) {
			ComponentsManager = _ComponentsManager_;
		}));
		
		
		var partialComponentsGlobalTemplate = [
			{
				"id":1,
				"title": "AFO",
				"parentId": null,
				"tree": "afo"
			},
			{
			   "id":11,
			   "title": "Platform",
			   "parentId": 1,
			   "tree": "afo"
			},
			{
				"id":111,
				"title": "Platform subnode 1",
				"parentId": 11,
				"tree": "afo"
			},
			{
			   "id":12,
			   "title": "Administration",
			   "parentId": 1,
			   "tree": "afo"
			}
		];
		
		var completeComponentsGlobalTemplate = [
	       {
	      	   	"id":1,
	      	   	"title": "AFO",
	      	   	"parentId": null,
	      	   	"tree": "afo"
	       },
	   	   {
   	    	   "id":11,
   	    	   "title": "Platform",
   	    	   "parentId": 1,
   	    	   "tree": "afo"
	   	   },
	       {
	  	   	    "id":111,
	  	   	    "title": "Platform subnode 1",
  	   	    	"parentId": 11,
	      	   	"tree": "afo"
	       },
	       {
	    	   "id":112,
	    	   "title": "Platform subnode 2",
	    	   "parentId": 11,
	    	   "tree": "afo"
	       },
	       {
	    	   "id":113,
	    	   "title": "Platform subnode 3",
	    	   "parentId": 11,
	    	   "tree": "afo"
	       },
	       {
	    	   "id":12,
	    	   "title": "Administration",
	    	   "parentId": 1,
	    	   "tree": "afo"
	       },
	       {
	    	   "id":13,
	    	   "title": "Applications",
	    	   "parentId": 1,
	    	   "tree": "afo"
	       },
	       {
	    	   "id":14,
	    	   "title": "Performance Management",
	    	   "parentId": 1,
	    	   "tree": "afo"
	       },
	       {
	    	   "id":15,
	    	   "title": "Alarm Management",
	    	   "parentId": 1,
	    	   "tree": "afo"
	       },
	       {
	    	   "id":16,
	    	   "title": "Reseller Administration",
	    	   "parentId": 1,
	    	   "tree": "afo"
	       },
	       {
	    	   "id":2,
	    	   "title": "Services",
	    	   "parentId": null,
	    	   "tree": "services"
	       },
	       {
	    	   "id":21,
	    	   "title": "Effective",
	    	   "parentId": 2,
	    	   "tree": "services"
	       }
       ];
		
	
		var treeForCompleteComponentsGlobalTemplate = [
		  [{
			  "id": 1,
			  "title": "AFO",
			  "children":[
					 {
						 "id": 11,
						 "title": "Platform",
						 "children":[
							{
								"id": 111,
								"title": "Platform subnode 1",
								"children":[]
							},
							{
								"id": 112,
								"title": "Platform subnode 2",
								"children":[]
							},
							{
								"id": 113,
								"title": "Platform subnode 3",
								"children":[]
							}
						 ]
					 },
					 {
						 "id": 12,
						 "title": "Administration",
						 "children":[]
					 },
					 {
						 "id": 13,
						 "title": "Applications",
						 "children":[]
					 },
					 {
						 "id": 14,
						 "title": "Performance Management",
						 "children":[]
					 },
					 {
						 "id": 15,
						 "title": "Alarm Management",
						 "children":[]
					 },
					 {
						 "id": 16,
						 "title": "Reseller Administration",
						 "children":[]
					 }
				]
			}],
			[{
			  "id": 2,
			  "title": "Services",
			  "children":[
					 {
						 "id": 21,
						 "title": "Effective",
						 "children":[]
					 }
			  ]
			}]
		];
		
		var treeForPartialComponentsGlobalTemplate = [
		  {
			  "id": 1,
			  "title": "AFO",
			  "children":[
					 {
						 "id": 11,
						 "title": "Platform",
						 "children":[
								{
									"id": 111,
									"title": "Platform subnode 1",
									"children":[]
								}   
						]
					 },
					 {
						 "id": 12,
						 "title": "Administration",
						 "children":[]
					 }
			 ]
		  }
		];
		

		it('should display component', function() {
			var componentId = 1;
			var actualResult = ComponentsManager.displayComponentInTree(componentId);
			expect(actualResult).toBe(true);
		});

		it('should build tree', function() {
			var expectedResult = treeForPartialComponentsGlobalTemplate;
			var actualResult = ComponentsManager.buildTree(partialComponentsGlobalTemplate);
			expect(actualResult).toEqual(expectedResult);
		});
		
		
		it('should build trees', function() {
			var expectedResult = treeForCompleteComponentsGlobalTemplate;
			spyOn(ComponentsManager,'setComponentsGlobalTemplate').and.callFake(function(){
				ComponentsManager.componentsGlobalTemplate = completeComponentsGlobalTemplate;
			});
			spyOn(ComponentsManager,'buildTree').and.callThrough();
			ComponentsManager.initialise();
			ComponentsManager.buildTrees();
			expect(ComponentsManager.buildTree.calls.count()).toBe(2);	
			expect(ComponentsManager.trees[0]).toEqual(expectedResult[0]);
			expect(ComponentsManager.trees[1]).toEqual(expectedResult[1]);
		});
		
		
		it('should remove parents', function() {
			var componentId = 111;
			var activeComponents = [
				{componentId: 11, state:"checked"},
				{componentId: 1, state:"indeterminate"}
			]
			var expectedResult = [];
			ComponentsManager.setComponentsGlobalTemplate(completeComponentsGlobalTemplate);
			ComponentsManager.setActiveComponents(activeComponents);
			spyOn(ComponentsManager,'getAmountOfActiveChildren').and.returnValue(0);
			ComponentsManager.updateParentsState(componentId);
			var actualResult = ComponentsManager.getActiveComponents();
			expect(actualResult).toEqual(expectedResult);
		});
		
		it('should add and update all parents to "checked"', function() {
			var parentFromComponentId = 11;
			var activeComponents = [
				{componentId: 11, state:"indeterminate"},
				{componentId: 111, state:"checked"}
			]
			var expectedResult = [
				{componentId: 11, state:"checked"},
				{componentId: 111, state:"checked"},
				{componentId: 1, state:"checked"}
			]
			ComponentsManager.setComponentsGlobalTemplate(completeComponentsGlobalTemplate);
			ComponentsManager.setActiveComponents(activeComponents);
			spyOn(ComponentsManager,'getAmountOfActiveChildren').and.returnValue(2);
			spyOn(ComponentsManager,'getChildren').and.returnValue([{},{}]);
			ComponentsManager.updateParentsState(parentFromComponentId);
			var actualResult = ComponentsManager.getActiveComponents();
			expect(actualResult).toEqual(expectedResult);
		});

		it('should add and update all parents as "indeterminate"', function() {
			var parentFromComponentId = 11;
			var activeComponents = [
				{componentId: 21, state:"checked"},
				{componentId: 11, state:"checked"},
			]
			var expectedResult = [
				{componentId: 21, state:"checked"},
				{componentId: 11, state:"indeterminate"},
				{componentId: 1, state:"indeterminate"}
			]
			ComponentsManager.setActiveComponents(activeComponents);
			ComponentsManager.setComponentsGlobalTemplate(completeComponentsGlobalTemplate);
			spyOn(ComponentsManager,'getAmountOfActiveChildren').and.returnValue(2);
			spyOn(ComponentsManager,'getChildren').and.returnValue([{},{},{}]);
			ComponentsManager.updateParentsState(parentFromComponentId);
			var actualResult = ComponentsManager.getActiveComponents();
			expect(actualResult).toEqual(expectedResult);
		});
		
		it('should remove children for unchecked element', function() {
			var componentId = 1;
			var activeComponents = [
				{componentId: 11, state:"checked"},
				{componentId: 111, state:"checked"}
			]
			var expectedResult = [];
			ComponentsManager.setComponentsGlobalTemplate(completeComponentsGlobalTemplate);
			ComponentsManager.setActiveComponents(activeComponents);
			ComponentsManager.updateChildrenState(componentId);
			var actualResult = ComponentsManager.getActiveComponents();
			expect(actualResult).toEqual(expectedResult);
		});
		
		it('should add and update children for checked element', function() {
			var componentId = 11;
			var activeComponents = [
				{componentId: 11, state:"checked"},
				{componentId: 111, state:"indeterminate"},
				{componentId: 113, state:"checked"}
			];
			var expectedResult = [
				{componentId: 11, state:"checked"},
				{componentId: 111, state:"checked"},	
				{componentId: 113, state:"checked"},
				{componentId: 112, state:"checked"}
			];
			ComponentsManager.setComponentsGlobalTemplate(completeComponentsGlobalTemplate);
			ComponentsManager.setActiveComponents(activeComponents);
			ComponentsManager.updateChildrenState(componentId);
			var actualResult = ComponentsManager.getActiveComponents();
			expect(actualResult).toEqual(expectedResult);
		});

		
		it('should get active children for component', function() {
			var componentId = 1;
			var activeComponents = [
				{componentId: 11, state:"checked"},
				{componentId: 13, state:"indeterminate"},
				{componentId: 15, state:"checked"},
				{componentId: 16, state:"checked"}
			];
			var expectedResult = 3.5;
			ComponentsManager.setComponentsGlobalTemplate(completeComponentsGlobalTemplate);
			ComponentsManager.setActiveComponents(activeComponents);
			var actualResult = ComponentsManager.getAmountOfActiveChildren(componentId);
			expect(actualResult).toBe(expectedResult);
		});
		
	});



});