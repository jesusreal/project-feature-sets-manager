(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
    	.directive("fsTree", fsTree);
    
  
    function fsTree() {
    	return {
    		restrict: "E",
    		templateUrl: "/app/src/views/fsTree/fs-tree.html",
//    		controller: "@",
//    		name: "controllerName",
//		    controllerAs: 'ctrl',
		    scope: {
		    	tree: "&"
		    },   	
    	}
    }
})();


