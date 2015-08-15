exports.config = {
	allScriptsTimeout: 11000,

	specs: [
		'e2e/*/**.js',
		//'e2e/grid/grid.js'
	],

	/* capabilities: {
		'browserName': 'chrome'
	},*/
	multiCapabilities: [
		{'browserName': 'chrome'},
		{'browserName': 'firefox'},
	],
	
	//firefoxPath: "C:/Program Files (x86)/Mozilla Firefox/firefox.exe",
	
	//directConnect: true,
	
	baseUrl: 'http://localhost:8000/',

	params: {
		login: {
		  username: 'super',
		  password: 'any_password'
		}
	},

	framework: 'jasmine2',
	
	onPrepare: function() {
		browser.driver.manage().window().setSize(1200, 800);
	},

	jasmineNodeOpts: {
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 30000
	},
	
	suites: {
		grid: 'e2e/grid/*Spec.js',
		login: ['e2e/login/*Spec.js']
 	},
};
