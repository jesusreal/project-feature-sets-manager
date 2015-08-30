(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
    	.directive("fsTree", fsTree);
    
  
    function fsTree() {
    	return {
    		restrict: "E",
    		templateUrl: "/src/views/fsTree/fs-tree.html",
//    		controller: "@",
//    		name: "controllerName",
//		    controllerAs: 'ctrl',
		    scope: {
		    	tree: "&"
		    },   	
    	}
    }
})();


