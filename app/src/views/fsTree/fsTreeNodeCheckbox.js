(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.directive("fsTreeNodeCheckbox", fsTreeNodeCheckbox);
    
    function fsTreeNodeCheckbox() {
    	return {
    		restrict: "A",
    		scope: {
    			activeNodes: "=activeNodes",
    		},
    		link: function(scope, element, attrs) {
    			
    			var checkboxManager = function (element, id) {
	    			this.treeCheckboxes = null; 
				};
				
				checkboxManager.prototype = {
					setCheckboxState: function(checkbox, elementId){
    					var newStateForCurrentCheckbox = this.getActiveNodeState(elementId);
		    			if (newStateForCurrentCheckbox !== undefined) {
		    				checkbox.prop(newStateForCurrentCheckbox, true);
		    			}
					},
					setTreeCheckboxes: function(elem) {
    					while (!elem.hasClass("row well")) {
    						elem = elem.parent();
    					}
    					var treeDomElement = elem;
    					this.treeCheckboxes = treeDomElement.find("input");
					},
					getTreeCheckboxes: function() {
    					return this.treeCheckboxes;
					},
					updateTreeCheckboxesState: function(){
	    				var treeCheckboxes = this.getTreeCheckboxes();
						treeCheckboxes.prop("checked", false);
	    				treeCheckboxes.prop("indeterminate", false);
	    				var currentCheckbox;
	    				var currentCheckboxId;
	    				for (var i=0; i<treeCheckboxes.length; i++) {
	    					currentCheckbox = treeCheckboxes.eq(i);
	    					currentCheckboxId = currentCheckbox.prop("id");
	    					this.setCheckboxState(currentCheckbox, currentCheckboxId);
	    				}
					},
                    getActiveNodeState: function(nodeId) {
                        var amountOfNodes = scope.activeNodes.length;
                        for (var i=0; i<amountOfNodes; i++) {
                            if (scope.activeNodes[i]["componentId"] == nodeId){
                                return scope.activeNodes[i]["state"];
                            }
                        }
                        return false;
                    }
				};
				
				var checkboxMngr = new checkboxManager();
				
				checkboxMngr.setCheckboxState(element, attrs.id);
    			
				element.bind('click', function() {
    				if (checkboxMngr.treeCheckboxes === null) {
    					checkboxMngr.setTreeCheckboxes(element);
    				}
    				checkboxMngr.updateTreeCheckboxesState();
				});
			}
		}
	};
 
})();
