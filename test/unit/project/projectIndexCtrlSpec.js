describe('ProjectIndexController', function() {

	/**********************  GLOBAL VARIABLES  **************************/

	var ctrl, Project, $controller, $q, $rootScope;
	var projects = [ 
		{"desc": "project 1 data"},
		{"desc": "project 2 data"}, 
		{"desc": "project 3 data"}
	];

	/**********************  HELPER METHODS **************************/
	function createController(project) {
		return $controller('ProjectIndexController', {this:null, Project:project});
	}

    /**********************  SET UP AND TEAR DOWN  **************************/

	beforeEach(module('projectFeatureSetsManager'));
	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');
		$rootScope = $injector.get('$rootScope');
	}));


	/**********************  TESTS CASES  **************************/

	describe('using actual Project service', function() {
		var deferred;
		var mockedProjectFactory = {
			getAll : function() {
				deferred = $q.defer(); 
				return deferred.promise.then(
					function(projects){
						return projects;
					},
					function(error){
						throw error;
					}
				);
			}
		};

		beforeEach(inject(function($injector) {
			spyOn(mockedProjectFactory, 'getAll').and.callThrough();
			ctrl = createController(mockedProjectFactory);
		}));

		it('retrieves projects data on controller initialization', function() {
			deferred.resolve(projects);
			$rootScope.$apply();
			expect(mockedProjectFactory.getAll.calls.count()).toBe(1);
			expect(ctrl.projects).toEqual(projects);
		});

		it('does not retrieve projects data on controller initialization', function() {
			var responseData = "There was an error";
			try {
				deferred.reject(responseData);
				$rootScope.$apply();
			}
			catch(error){
				expect(error).toBe(responseData);
			}
			expect(mockedProjectFactory.getAll.calls.count()).toBe(1);
			expect(ctrl.projects).not.toBeDefined();
		});
	});


	xdescribe('using actual Project service', function() {
		beforeEach(inject(function($injector){
			Project = $injector.get('Project');
			ctrl = createController(Project);
		}));

		it('should empty search query', function(){
			ctrl.emptySearchQuery();
			expect(ctrl.searchQuery).toBe('');
		});
		
		it('should delete Project and update related parameters', function(){
			var selectedRowId = 1;
			var projects = [ {"desc": "project 1 data"}, {"desc": "project 2 data"}, {"desc": "project 3 data"}];
			spyOn(Project,'remove').and.returnValue(true);
			spyOn(Project,'getAll').and.returnValue(projects);
			spyOn(ctrl.dataGrid,'getSelectedRowId').and.returnValue(selectedRowId);
			spyOn(ctrl.dataGrid,'setData');
			spyOn(ctrl.dataGrid,'clearSelectedRows');
			var result = ctrl.removeProject();
			expect(ctrl.dataGrid.getSelectedRowId).toHaveBeenCalled();
			expect(Project.remove).toHaveBeenCalledWith(selectedRowId);
			expect(Project.getAll).toHaveBeenCalled();
			expect(ctrl.dataGrid.setData).toHaveBeenCalledWith(projects);
			expect(ctrl.projects).toEqual(projects);
			expect(result).toBe(true);
		});

		it('should not delete Project', function(){
			var selectedRowId = 1;
			var projects = [ {"desc": "project 1 data"}, {"desc": "project 2 data"}, {"desc": "project 3 data"}];
			spyOn(Project,'remove').and.returnValue(false);
			spyOn(Project,'getAll').and.returnValue(projects);
			spyOn(ctrl.dataGrid,'getSelectedRowId').and.returnValue(selectedRowId);
			spyOn(ctrl.dataGrid,'setData');
			spyOn(ctrl.dataGrid,'clearSelectedRows');
			var result = ctrl.removeProject(selectedRowId);
			expect(Project.remove).toHaveBeenCalledWith(selectedRowId);
			expect(Project.getAll).not.toHaveBeenCalled();
			expect(ctrl.dataGrid.setData).not.toHaveBeenCalled();
			expect(ctrl.dataGrid.clearSelectedRows).not.toHaveBeenCalled();
			expect(result).toBe(false);
		});
	});

	
});