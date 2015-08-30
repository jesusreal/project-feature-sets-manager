describe("project Factory Spec", function() {
	
	/* Global variables */ 

	var Project, $httpBackend;
	var projects = [ 
		{"desc": "project 1 data"},
		{"desc": "project 2 data"}, 
		{"desc": "project 3 data"}
	];


	/* Helper methods */

	/* Setup and tear down */

	beforeEach(module('projectFeatureSetsManager'));
	beforeEach( inject( function($injector) {	
		Project = $injector.get('Project');
		$httpBackend = $injector.get('$httpBackend');
		// getAllProjectsRequestHandler = $httpBackend
		// 	.when('GET', 'src/views/project/projectValue.json')
		// 	.respond({"res":"HI"});
	}));

	afterEach(function() {
		// $httpBackend.verifyNoOutstandingExpectation();
		// $httpBackend.verifyNoOutstandingRequest();
	});


	/* Test cases */

	it ("checks if the factory exist", function() {
		expect(Project).toBeDefined();
	});

	it("gets all the projects", function (done) {
		$httpBackend.expectGET('src/views/project/projectValue.json')
			.respond(projects);
		Project.getAll().then(
			function(responseData){
				expect(responseData).toEqual(projects);
				done();
			}
		);
		try {
			$httpBackend.flush();
		}
		catch (error) {
			done.fail();
		}
	});

	it("returns error when trying to get all projects", function (done) {
		var responseData = 'There was an error';
		$httpBackend.expectGET('src/views/project/projectValue.json')
			.respond(401, responseData);
		Project.getAll();
		try {
			$httpBackend.flush();
			done.fail();
		}
		catch (error) {
			expect(error).toBe(responseData);
			done();
		}
	});

});