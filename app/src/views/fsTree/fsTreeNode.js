(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
    	.directive("fsTreeNode", fsTreeNode);
  
    function fsTreeNode($compile) {
    	return {
    		restrict: "A",
    		templateUrl: "/app/src/views/fsTree/fs-tree-node.html",
			link: function (scope, element, attrs) {
	            var nodeItemsHtml = '<ol ui-tree-nodes="" ng-model="node.children" ng-class="{hidden: collapsed}"><li fs-tree-node ui-tree-node collapsed="false" ng-repeat="node in node.children"></li></ol>';
	            if (scope.node.children.length) {       
	                $compile(nodeItemsHtml)(scope, function(cloned, scope)   {
	  	  	     	  	element.append(cloned); 
	                });
				}
			}	
    	}
    }
})();


