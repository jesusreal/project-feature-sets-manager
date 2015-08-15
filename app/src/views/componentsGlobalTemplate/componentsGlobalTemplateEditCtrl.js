(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.controller("ComponentsGlobalTemplateEditController", ComponentsGlobalTemplateEditController);

	function ComponentsGlobalTemplateEditController (Methods, ComponentsGlobalTemplate, ComponentsManagerForGlobalTemplate,
													 ComponentsManagerForProjects, ComponentsManagerForFeatureSets) {
    	this.componentsManager = ComponentsManagerForGlobalTemplate;
    	ComponentsManagerForGlobalTemplate.initialise();
    	ComponentsManagerForGlobalTemplate.buildTrees();
    	this.modalInstance;
		this.mode = 'none';
		this.editData;

		this.enterMode = function(mode){
			this.mode = mode;
			if (mode === "removeComponent") {
				this.openModal();
			}
			else {
				this.editData = {
					componentTitle: "",
					treeName: ""
				}
			}
		}
		
		this.openModal = function () {
    		var self = this;
    		var headerText = "component from the global template";
			var bodyText = "this " + headerText + "? This will also delete its children. " 
				+ "In addition, deleted components will be removed from all projects and features sets where they were active.";
       		this.modalInstance = Methods.openModal(headerText, bodyText);
    		this.modalInstance.result.then(
				function () {
					var activeComponentId = ComponentsManagerForGlobalTemplate.getActiveComponentId();
					var selectedComponentParentId = ComponentsManagerForGlobalTemplate.getComponentParentId(activeComponentId);
					self.removeComponent();
					ComponentsManagerForProjects.updateActiveComponentsOnGlobalTemplateStructureChange(selectedComponentParentId);
					ComponentsManagerForFeatureSets.updateActiveComponentsOnGlobalTemplateStructureChange(selectedComponentParentId);
				}
    		);
    	};
		
    	this.removeComponent = function() {
			var activeComponentId = ComponentsManagerForGlobalTemplate.getActiveComponentId();
			ComponentsManagerForGlobalTemplate.updateChildrenState(activeComponentId);
    		var componentsToRemove = ComponentsManagerForGlobalTemplate.getActiveComponents();
			var changeSuccessful = !!ComponentsGlobalTemplate.remove(componentsToRemove);
			this.resetAndUpdateTreeVars(changeSuccessful);
    		return changeSuccessful;
    	};
					
		this.saveChanges = function(){
    		console.log(this.editData);
			var changeSuccessful;
			if (this.mode === "addNewTree") {
				var newComponent = {
					"title": this.editData.componentTitle,
					"parentId": null,
					"tree": this.editData.treeName
				};
				changeSuccessful = ComponentsGlobalTemplate.insert(newComponent);
			}
			else if (this.mode === "addNewChild") {
				var newComponentId;
				var activeComponentId = ComponentsManagerForGlobalTemplate.getActiveComponentId();
				var components = ComponentsManagerForGlobalTemplate.getComponentsGlobalTemplate();
				var componentData = ComponentsManagerForGlobalTemplate.getComponent(activeComponentId, components);
			 	var newComponent = {
					"title": this.editData.componentTitle,
					"parentId": activeComponentId,
					"tree": componentData.tree
				};
				newComponentId = ComponentsGlobalTemplate.insert(newComponent);
				changeSuccessful = newComponentId;
				ComponentsManagerForProjects.updateActiveComponentsOnGlobalTemplateStructureChange(activeComponentId, newComponentId);
				ComponentsManagerForFeatureSets.updateActiveComponentsOnGlobalTemplateStructureChange(activeComponentId, newComponentId);
			}
			else if (this.mode === "editComponent") {
				var activeComponentId = ComponentsManagerForGlobalTemplate.getActiveComponentId();
				var changeSuccessful = ComponentsGlobalTemplate.update({id:activeComponentId, title:this.editData.componentTitle});
			}
			changeSuccessful = !!changeSuccessful;
			this.resetAndUpdateTreeVars(changeSuccessful);
			return changeSuccessful;
		};
		
		this.resetAndUpdateTreeVars = function(changeSuccessful) {
			this.mode = 'none';
	    	ComponentsManagerForGlobalTemplate.initialise();
			if (changeSuccessful) {
				ComponentsManagerForGlobalTemplate.setComponentsGlobalTemplate(ComponentsGlobalTemplate.getAll());
				ComponentsManagerForGlobalTemplate.buildTrees();
			}
		}    	
	}
})();

