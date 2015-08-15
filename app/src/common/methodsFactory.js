(function () {
    'use strict';   	

    angular
		.module('projectFeatureSetsManager')
		.factory('Methods', MethodsFactory);
    
	function MethodsFactory ($modal) {
		return {
	    	getDateFormatted: function(d) {
	    		var returnVal = false;
	    		if (d instanceof Date) {
		    		var monthPrefix = '';
		    		var dParams = {
		    			"year": d.getFullYear(),
		    			"month": d.getMonth() + 1,
		    			"day": d.getDate(),
		    			"hour": d.getHours(),
		    			"minute": d.getMinutes(),
		    			"second": d.getSeconds()
		    		}
		    		var separators = ["-", "-", " ", ":", ":", ""]
		    		var formattedDate = "";
		    		var i = 0;
	//    	    		Object.keys(obj).forEach(function(key) { console.log(key); });
		    		for (var key in dParams) {
		    			if (dParams.hasOwnProperty(key) && dParams[key]<10) {
		    				dParams[key] = '0' + dParams[key];
		    			}
		    			formattedDate += dParams[key] + separators[i];
		    			i++;
		    		}
		    		returnVal = formattedDate;
		    	}
	    		return returnVal;
	    	}, 
	    	openModal: function(headerText, bodyText) {
	    		var modalInstance = $modal.open({
	    			animation: true,
	    			templateUrl: '/app/src/views/modal/modal-delete.html',
	    			controller: 'ModalController',
	    			controllerAs: 'modalCtrl',
	    			size: null,
	    			resolve: {
						headerText: function () {
							return headerText;
						},
						bodyText: function () {
							return bodyText;
						}
					}
	    		});
	    		return modalInstance;
	    	}
		}
	}; 	   	
    	
})();