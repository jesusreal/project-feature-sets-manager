(function() {
	'use strict';

	angular.module('projectFeatureSetsManager')
			.factory('ComponentsManager', ComponentsManagerFactory)
			.factory('ComponentsManagerForProjects', ComponentsManagerForProjectsFactory)
			.factory('ComponentsManagerForGlobalTemplate', ComponentsManagerForGlobalTemplateFactory)
			.factory('ComponentsManagerForFeatureSets', ComponentsManagerForFeatureSetsFactory);

	function ComponentsManagerFactory(ComponentsGlobalTemplate) {
		var treeForComponents = {};
		treeForComponents.checkboxStates = {
			checked: "checked",
			indeterminate: "indeterminate"
		}
		treeForComponents.activeComponents;
		treeForComponents.componentsGlobalTemplate;
		treeForComponents.trees;
		treeForComponents.displayComponentInTree = function(componentId) {
			return true;
		};
		treeForComponents.initialise = function(activeComponents){
			this.setActiveComponents(activeComponents);
			if (treeForComponents.componentsGlobalTemplate === undefined) {
				this.setComponentsGlobalTemplate(ComponentsGlobalTemplate.getAll());
			}
		};
		treeForComponents.buildTrees = function() {
			var componentsGroupedByTree = [];
			var amountOfComponents = this.getComponentsGlobalTemplate().length;
			for (var i=0; i<amountOfComponents; i++) {
				var currentNode = this.getComponentsGlobalTemplate()[i];
				if (this.displayComponentInTree(currentNode.id)) {
					var treeName = currentNode["tree"];
					if (componentsGroupedByTree[treeName] === undefined) {
						componentsGroupedByTree[treeName] = new Array();
					}
					componentsGroupedByTree[treeName].push(currentNode);
				}
			}
			this.setTrees();
			for (var key in componentsGroupedByTree) {
				var treeFormatted = this.buildTree(componentsGroupedByTree[key]);
				this.getTrees().push(treeFormatted);
			}
		};
		treeForComponents.buildTree = function(components) {
			var tree = [];
			var treeNodes = [];
			for (var i=0; i <components.length; i++) {
				var parentId = components[i].parentId;
				var id = components[i].id;
				var title = components[i].title;
				var item = {
					"id" : id,
					"title" : title,
					"children" : []
				};
				treeNodes[id] = item;
				if (treeNodes[parentId]) {
					var newIndex = treeNodes[parentId].children.length;
					treeNodes[parentId].children[newIndex] = item;
				} else {
					tree.push(treeNodes[id]);
				}
			}
			return tree;
		};
		treeForComponents.getTrees = function() {			
			return this.trees;
		};
		treeForComponents.setTrees = function(trees) {			
			treeForComponents.trees = trees || [];
		};
		treeForComponents.onComponentSelectionChanged = function(componentId) {
			var activeComponentState = this.getActiveComponentState(componentId);
			var componentIndexInActiveComponents = this.getActiveComponentIndex(componentId);
			if (!activeComponentState) {
				this.addActiveComponent(componentId, this.checkboxStates.checked);
			}
			else if (activeComponentState === this.checkboxStates.indeterminate) {
				this.updateActiveComponent(componentIndexInActiveComponents, this.checkboxStates.checked);
			} 
			else if (activeComponentState === this.checkboxStates.checked) {
				this.removeActiveComponent(componentIndexInActiveComponents);
			}
			this.updateChildrenState(componentId);
			var parentId = this.getComponentParentId(componentId);
			this.updateParentsState(parentId);
		};
		treeForComponents.updateChildrenState = function(componentId) {
			var parentState = this.getActiveComponentState(componentId);
			var self = this;
			var checkAllChildrenForComponent = function(componentId) {
				var componentChildren = self.getChildren(componentId);
				var childId, componentIndexInActiveComponents;
				for (var i=0; i<componentChildren.length; i++) {
					childId = componentChildren[i].id;
					componentIndexInActiveComponents = self.getActiveComponentIndex(childId);
					if (parentState === self.checkboxStates.checked) {
						if (componentIndexInActiveComponents >= 0) { 
							self.updateActiveComponent(componentIndexInActiveComponents, self.checkboxStates.checked);
						}
						else {
							self.addActiveComponent(childId, self.checkboxStates.checked);
						}
					}
					else if (!parentState) {
						self.removeActiveComponent(componentIndexInActiveComponents);
					}
					checkAllChildrenForComponent(childId);
				}
				return;
			};
			checkAllChildrenForComponent(componentId, this);
		};
		treeForComponents.updateParentsState = function(parentId) {
			//var component = this.getComponent(componentId, this.getComponentsGlobalTemplate());
			//var parentId = component.parentId;
			var component;
			while (parentId !== null) {
				var componentIndexInActiveComponents = this.getActiveComponentIndex(parentId);
				var amountOfActiveChildren = this.getAmountOfActiveChildren(parentId);
				if (amountOfActiveChildren > 0) {	
					var amountOfChildren = this.getChildren(parentId).length;
					var newState = this.checkboxStates.indeterminate;
					if (amountOfActiveChildren === amountOfChildren) {
						newState = this.checkboxStates.checked;
					}
					if (componentIndexInActiveComponents >= 0) { 
						this.updateActiveComponent(componentIndexInActiveComponents, newState);
					}
					else {
						this.addActiveComponent(parentId, newState);
					}
				}
				else if (amountOfActiveChildren === 0) {
					this.removeActiveComponent(componentIndexInActiveComponents);
				}
				var newParentId = this.getComponentParentId(parentId);
				parentId = newParentId;
			}				
		};
		treeForComponents.updateActiveComponentsOnGlobalTemplateStructureChange = function (selectedComponentParentId, newComponentId){
			var affectedResourcesId = this.activeComponentsFactory.getResourcesIdForComponentId(selectedComponentParentId);
			for (var i=0; i<affectedResourcesId.length; i++){
				var resourceId = affectedResourcesId[i];
				var initialActiveComponents = this.activeComponentsFactory.get(resourceId);
				this.initialiseResourceFactoryOnGlobalTemplateStructureChange(resourceId, initialActiveComponents);
				var componentState = this.getActiveComponentState(selectedComponentParentId);
				if (componentState===this.checkboxStates.checked && newComponentId) {
					var newComponentData = [{
						"componentId": newComponentId,
						"state": this.checkboxStates.checked
					}];
					this.activeComponentsFactory.insert(newComponentData, resourceId);
				}
				else if (componentState === this.checkboxStates.indeterminate) {
					this.updateParentsState(selectedComponentParentId);
					var modifiedComponents = this.getComponentsGroupedByChangeType(initialActiveComponents);
					if (modifiedComponents.update.length > 0) {
						this.activeComponentsFactory.update(modifiedComponents.update);
					}
					if (modifiedComponents.remove.length > 0) {
						this.activeComponentsFactory.remove(modifiedComponents.remove);
					}
				}
			}
			Object.getPrototypeOf(this).initialise();	
		};
		treeForComponents.initialiseResourceFactoryOnGlobalTemplateStructureChange = function (resourceId, initialActiveComponents){
			var activeComponents;
			if (typeof this.setFeatureSetId === 'function') {
				var projectId = this.featureSetFactory.get(resourceId).projectId;
				var activeComponents = this.projectActiveComponentsFactory.get(projectId);
			}
			this.initialise(angular.copy(initialActiveComponents), resourceId, activeComponents)
		};
		treeForComponents.getComponent = function(componentId, components) {
			var returnVal = false;
			var amountOfComponents = components.length;
			var componentIdPropertyName = "id";
			if (amountOfComponents>0 && components[0].componentId!==undefined) {
				componentIdPropertyName = "componentId";
			}
			for (var i=0; i<amountOfComponents; i++) {
				if (components[i][componentIdPropertyName] === componentId) {
					returnVal = components[i];
					break;
				}
			}
			return returnVal;
		};
		treeForComponents.getComponentParentId = function(componentId) {
			var component = this.getComponent(componentId, this.getComponentsGlobalTemplate());
			return component.parentId;
		};
		treeForComponents.getChildren = function(componentId) {
			var children = [];
			var component;
			for (var i=0; i<this.getComponentsGlobalTemplate().length; i++) {
				component = this.getComponentsGlobalTemplate()[i];
				if (this.displayComponentInTree(component.id) && component.parentId===componentId) {
					children.push(component);
				}
			}
			return children;
		};		
		treeForComponents.getAmountOfActiveChildren = function(componentId) {
			var componentChildren = this.getChildren(componentId);
			var amountOfActiveChildren = 0;
			var childId, childState;
			for (var i=0; i<componentChildren.length; i++) {
				childId = componentChildren[i].id;
				childState = this.getActiveComponentState(childId);
				if (childState == this.checkboxStates.indeterminate) {
					amountOfActiveChildren += 0.5;
				} 
				else if (childState == this.checkboxStates.checked) {
					amountOfActiveChildren += 1;
				}
			}
			return amountOfActiveChildren;
		};
		treeForComponents.addActiveComponent = function(componentId, state) {
			var newComponent = {"componentId":parseInt(componentId), "state":state};
			if (typeof this.getProjectId === 'function'){
				newComponent.projectId = this.getProjectId();
			}
			else if (typeof this.getFeatureSetId === 'function'){
				newComponent.featureSetId = this.getFeatureSetId();
			}			
			this.getActiveComponents().push(newComponent);
		};
		treeForComponents.updateActiveComponent = function(index, state) {
			this.getActiveComponents()[index].state = state;
		};
		treeForComponents.removeActiveComponent = function(index) {
			this.getActiveComponents().splice(index,1);
		};
		treeForComponents.setActiveComponents = function(activeComponents) {
			treeForComponents.activeComponents = activeComponents || [];
		};
		treeForComponents.getActiveComponents = function() {
			return this.activeComponents;
		};
		treeForComponents.isAnyComponentActive = function() {
			return (this.getActiveComponents().length > 0);
		};
		treeForComponents.getActiveComponentState = function(componentId) {
			var returnVal = false;
			var component = this.getComponent(componentId, this.getActiveComponents());
			if (component) {
				returnVal = component.state;
			}
			return returnVal;
		};
		treeForComponents.getActiveComponentIndex = function(componentId) {
			var returnVal = -1;
			var amountOfActiveComponents = this.getActiveComponents().length;
			for (var i=0; i<amountOfActiveComponents; i++) {
				if (this.getActiveComponents()[i].componentId === componentId) {
					returnVal = i;
					break;
				}
			}
			return returnVal;
		};
		treeForComponents.setComponentsGlobalTemplate = function(componentsGlobalTemplate) {
			treeForComponents.componentsGlobalTemplate = componentsGlobalTemplate;
		};
		treeForComponents.getComponentsGlobalTemplate = function() {
			return this.componentsGlobalTemplate;
		};
		treeForComponents.getComponentsGroupedByChangeType = function(initialActiveComponents) {
			var currentActiveComponents = this.getActiveComponents();
			var modifiedComponents = {"update":[], "insert":[], "remove":[]};
			var initialComponent, currentComponent;
			for (var i=0; i<initialActiveComponents.length; i++) {
				initialComponent = initialActiveComponents[i];
				currentComponent = this.getComponent(initialComponent.componentId, currentActiveComponents);
				if (!currentComponent) {
					modifiedComponents.remove.push(initialComponent);
				}
				else if (currentComponent.state !== initialComponent.state) {
					modifiedComponents.update.push(currentComponent);
				}
			}
			for (var i=0; i<currentActiveComponents.length; i++) {
				currentComponent = currentActiveComponents[i];		
				initialComponent = this.getComponent(currentComponent.componentId, initialActiveComponents)
				if (!initialComponent) {
					modifiedComponents.insert.push(currentComponent);
				}
			}
			return modifiedComponents;
		};
		return treeForComponents;
	}

	
	function ComponentsManagerForGlobalTemplateFactory(ComponentsManager) {
		var treeForComponentsGlobalTemplate = Object.create(ComponentsManager);

		treeForComponentsGlobalTemplate.onComponentSelectionChanged = function(componentId) {
			if (this.getActiveComponentState(componentId) !== this.checkboxStates.checked) {
				this.setActiveComponents();
				this.addActiveComponent(componentId, this.checkboxStates.checked);
			} else {
				//var component = this.getComponent(componentId, this.getComponentsGlobalTemplate());
				//var amountOfActiveComponents = this.getActiveComponents().length;
				//var isParentFromClickedComponentChecked = this.getComponent(component.parentId, this.getActiveComponents());
				this.setActiveComponents();
				/*if (amountOfActiveComponents>1 && isParentFromClickedComponentChecked) {
					this.addActiveComponent(componentId, this.checkboxStates.checked);
				}*/
			}
			//this.updateChildrenState(componentId);
		};
		
		treeForComponentsGlobalTemplate.getActiveComponentId = function() {
			var activeComponentId = this.getActiveComponents()[0].componentId;
			return activeComponentId;
		}
		
		treeForComponentsGlobalTemplate.getComponentIndex = function() {
			var activeComponentId = this.getActiveComponents()[0].componentId;
			return activeComponentId;
		}

		return treeForComponentsGlobalTemplate;
	}

	
	function ComponentsManagerForProjectsFactory(ComponentsManager, ProjectActiveComponents) {
		var treeForProjects = Object.create(ComponentsManager);
		
		treeForProjects.activeComponentsFactory = ProjectActiveComponents;

		treeForProjects.projectId;
		
		treeForProjects.initialise = function(activeComponents, projectId){
			Object.getPrototypeOf(this).initialise(activeComponents);
			this.setProjectId(projectId);
		};

		treeForProjects.setProjectId = function (projectId) {
			this.projectId = projectId;
		};
		
		treeForProjects.getProjectId = function () {
			return this.projectId;
		};
		
		return treeForProjects;
	}

	
	function ComponentsManagerForFeatureSetsFactory(ComponentsManager, FeatureSetActiveComponents, FeatureSet, ProjectActiveComponents) {
		var treeForFeatureSets = Object.create(ComponentsManager);

		treeForFeatureSets.featureSetId;

		treeForFeatureSets.componentsToDisplay;

		treeForFeatureSets.onlyView;

		treeForFeatureSets.activeComponentsFactory = FeatureSetActiveComponents;
		treeForFeatureSets.featureSetFactory = FeatureSet;
		treeForFeatureSets.projectActiveComponentsFactory = ProjectActiveComponents;

		treeForFeatureSets.initialise = function(activeComponents, featureSetId, componentsToDisplay){
			Object.getPrototypeOf(this).initialise(activeComponents);
			this.setFeatureSetId(featureSetId);
			this.setComponentsToDisplay(componentsToDisplay);
			this.deactivateOnlyView();
		};

		treeForFeatureSets.setFeatureSetId = function (featureSetId) {
			this.featureSetId = featureSetId;
		};
		
		treeForFeatureSets.getFeatureSetId = function () {
			return this.featureSetId;
		};
		
		treeForFeatureSets.activateOnlyView = function () {
			this.onlyView = true;
		};
		
		treeForFeatureSets.isOnlyViewActivated = function () {
			return (this.onlyView === true);
		};
		treeForFeatureSets.deactivateOnlyView = function () {
			this.onlyView = false;
		};
		
		treeForFeatureSets.displayComponentInTree = function(componentId) {
			var returnVal = false;
			var component = this.getComponent(componentId, this.getComponentsToDisplay());
			if (component) {
				returnVal = true;
			}
			return returnVal;
		};

		treeForFeatureSets.setComponentsToDisplay = function(components) {
			this.componentsToDisplay = components || [];
		};
		
		treeForFeatureSets.getComponentsToDisplay = function(components) {
			return this.componentsToDisplay;
		};

		return treeForFeatureSets;
	};

})();