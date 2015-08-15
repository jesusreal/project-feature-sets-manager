(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
    	.directive("fsPagination", fsPagination);
    
  
    function fsPagination() {
    	return {
    		restrict: "E",
    		templateUrl: "/app/src/views/fsPagination/fs-pagination.html",
		    scope: {
		    	dataGrid: "&"
		    },   	
    	}
    }
})();


