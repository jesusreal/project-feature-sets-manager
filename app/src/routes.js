(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.config(function ($stateProvider, $urlRouterProvider, LOGIN_ROLES) {
			var baseUrl = '/src/views';

			var projectIndex = {
				url: '/project',
				templateUrl: baseUrl + '/project/project-index.html',
				controller: 'ProjectIndexController',
				controllerAs: 'projectIndexCtrl'
			};

			var projectNew = {
				url: '/new',
				views: {
					'@': {
						templateUrl: baseUrl + '/project/newEdit/project-new-edit.html',				    		
						controller: 'ProjectNewEditController',
						controllerAs: 'projectNewEditCtrl'						    	
					}
				},
				data: {
					authorizedRoles: LOGIN_ROLES.authorizations.projectNew
				}
			};				

			var projectEdit = {
//	    			onEnter: function($stateParams, resolvedData ) {
////    				    console.log('project.edit');
////    				    console.log(resolvedData);
//    				},		    			
//    				resolve: {
//    					resolvedData : function() { return "jesus"; } 
//    				},   			
				url: '/edit/:projectId',
				views: {
					'@': {
						templateUrl: baseUrl + '/project/newEdit/project-new-edit.html',				    		
						controller: 'ProjectNewEditController',
						controllerAs: 'projectNewEditCtrl'						    	
					}
				},
				data: {
					authorizedRoles: LOGIN_ROLES.authorizations.projectEdit
				}
			};

			var featureSetIndex = {
				url: '/:projectId/feature-set',
				views: {
					'@': {
						templateUrl: baseUrl + '/featureSet/feature-set-index.html',
						controller: 'FeatureSetIndexController',
						controllerAs: 'featureSetIndexCtrl'				    	
					}
				}
			};
			var featureSetView = {
				url: '/view/:featureSetId',
				views: {
					'@': {
						templateUrl: baseUrl + '/featureSet/view/feature-set-view.html',				    		
						controller: 'FeatureSetViewController',
						controllerAs: 'featureSetViewCtrl'						    	
					}
				},
				data: {
					authorizedRoles: LOGIN_ROLES.authorizations.featureSetView
				}
			};		
			var featureSetNew = {
				url: '/new',
				views: {
					'@': {
						templateUrl: baseUrl + '/featureSet/newEdit/feature-set-new-edit.html',				    		
						controller: 'FeatureSetNewEditController',
						controllerAs: 'featureSetNewEditCtrl'						    	
					}
				},
				data: {
					authorizedRoles: LOGIN_ROLES.authorizations.featureSetNew
				}
			};
			var featureSetEdit = {
				url: '/edit/:featureSetId',
				views: {
					'@': {
						templateUrl: baseUrl + '/featureSet/newEdit/feature-set-new-edit.html',				    		
						controller: 'FeatureSetNewEditController',
						controllerAs: 'featureSetNewEditCtrl'						    	
					}
				},
			};			
			var componentsGlobalTemplateEdit = {
				url: '/componentsGlobalTemplateEdit',
				templateUrl: baseUrl + '/componentsGlobalTemplate/components-global-template-edit.html',
				controller: 'ComponentsGlobalTemplateEditController',
				controllerAs: 'componentsGlobalTemplateEditCtrl',
				data: {
					authorizedRoles: LOGIN_ROLES.authorizations.componentsGlobalTemplateEdit
				}
			};

			$stateProvider
				.state('project', projectIndex)
				.state('project.new', projectNew)
				.state('project.edit', projectEdit)
				.state('project.feature-set', featureSetIndex)
				.state('project.feature-set.view', featureSetView)
				.state('project.feature-set.new', featureSetNew)
				.state('project.feature-set.edit', featureSetEdit)
				.state('componentsGlobalTemplateEdit', componentsGlobalTemplateEdit);


			$urlRouterProvider
				.otherwise('/project');

		}).run(function($rootScope, LoginSession, Login, LOGIN_EVENTS){
			$rootScope.$on('$stateChangeStart', function (event, next) {
				LoginSession.createSessionFromCookies();
				if (next.data !== undefined) {
					var authorizedRoles = next.data.authorizedRoles;
					if (!Login.isAuthorized(authorizedRoles)) {
						event.preventDefault();
						if (!Login.isAuthenticated()) {
							console.log(next);
							$rootScope.$broadcast(LOGIN_EVENTS.notAuthenticated);
						}
						else {
							$rootScope.$broadcast(LOGIN_EVENTS.notAuthorized);
						}
					}
				}
			});
		});

})();