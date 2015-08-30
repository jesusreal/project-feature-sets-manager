(function () {
	
    angular
		.module('projectFeatureSetsManager')
		.factory('DataGrid', DataGridFactory); 				
				
	function DataGridFactory ($filter, uiGridConstants) {
		var dataGrid = {};
	    dataGrid.api;
	    dataGrid.settings;
		dataGrid.lastVisitedPage= {};
		dataGrid.lastType;
		dataGrid.grid;
		dataGrid.initialise = function(gridData, gridType) {
			this.api = null;
			this.settings = {
				enableColumnMenus: false,
				enableSelectAll: false,
				enableRowSelection: true,
				minimumColumnSize: 30,
				headerRowHeight: 50,
				multiSelect: false,
				selectionRowHeaderWidth: 35,
				rowHeight: 35,
				enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
				enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
				//useExternalFiltering: true,
				enableFiltering: false,
				enablePaginationControls: false,
				paginationPageSize: 1
			};
			this.settings.columnDefs =  [
				{ field: 'id', sort:{"direction":uiGridConstants.ASC}, width:'5%' },		
				{ field: 'name', width:'25%' }, 
				{ field: 'description', width:'35%'},
				{ field: 'created', width:'*' },     		
				{ field: 'lastChanged', width:'*' }   		
			];
			this.setData(gridData);
			this.settings.onRegisterApi = function(gridApi) {
				dataGrid.setApi(gridApi);
				if (dataGrid.getLastVisitedPage(gridType) === undefined) {
					dataGrid.setLastVisitedPage(gridApi.pagination.getPage(), gridType);
				}
				else if (dataGrid.getLastType()===gridType || gridType==="projects") {
					this.paginationCurrentPage = dataGrid.getLastVisitedPage(gridType);
				}
				dataGrid.setLastType(gridType);
			};
		};
		dataGrid.getSettings = function() {
			return this.settings;
		},
		dataGrid.getData = function() {
			return this.settings.data;
		},
		dataGrid.setData = function(gridData) {
			this.settings.data = gridData;
		},		
		dataGrid.getApi = function() {
			return this.api;
		},
		dataGrid.setApi = function(gridApi) {
			this.api = gridApi;
		},
		dataGrid.getLastType = function() {
			return this.lastType;
		},
		dataGrid.setLastType = function(gridType) {
			this.lastType = gridType;
		},
		dataGrid.filterRows = function(rows, searchQuery) {
			this.settings.data = $filter('filter')(
				rows,
				function (value,index) {
					if ( searchQuery=="" || (value.id.toString().indexOf(searchQuery) !== -1)
							|| (value.name.toLowerCase().indexOf(searchQuery) !== -1) 
							|| (value.description.toLowerCase().indexOf(searchQuery) !== -1)) {
						return true;
					}
					return false;
				},
				false
			);
		},
		dataGrid.isAnyRowSelected = function() {
			var returnVal = false;
			if (this.getApi()) {
				returnVal = (this.getApi().grid.selection.selectedCount > 0);
			}
			return returnVal;
		},
		dataGrid.getSelectedRowId = function() {
			var gridApi = this.getApi();
			if (gridApi && gridApi.selection.getSelectedRows().length > 0) {
				return parseInt(gridApi.selection.getSelectedRows()[0].id);
			}
		},
		dataGrid.clearSelectedRows = function() {
			this.getApi().selection.clearSelectedRows();
		},
		dataGrid.goToPage = function(page) {
			if (typeof page === 'number') {
				this.getApi().pagination.seek(page);
			}
			else if (page === 'next') {
				this.getApi().pagination.nextPage();
			}
			else if (page === 'previous') {
				this.getApi().pagination.previousPage();
			}
			else if (page === 'first') {
				this.getApi().pagination.seek(1);
			}
			else if (page === 'last') {
				this.getApi().pagination.seek(this.getApi().pagination.getTotalPages());
			}
			this.clearSelectedRows();
			this.setLastVisitedPage(this.getApi().pagination.getPage(), dataGrid.getLastType());
		},
		dataGrid.isFirstPage = function() {
			var returnVal = false;
			if (this.getApi()) {
				returnVal = (this.getApi().pagination.getPage() === 1);
			}
			return returnVal;
		},
		dataGrid.isLastPage = function(page) {
			var returnVal = false;
			if (this.getApi()) {
				returnVal = (this.getApi().pagination.getPage() === this.getApi().pagination.getTotalPages());
			}
			return returnVal;
		},
		dataGrid.setLastVisitedPage = function(lastVisitedPaged, gridType) {
			this.lastVisitedPage[gridType] = lastVisitedPaged;
		}
		dataGrid.getLastVisitedPage = function(gridType) {
			return this.lastVisitedPage[gridType];
		}		
		return dataGrid;
	}  	
    	
})();