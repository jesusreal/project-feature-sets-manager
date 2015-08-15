(function () {
    'use strict';   	

	var roles = {};
	
	roles.users = {
		admin: 'admin'
	};
	
	roles.authorizations = {
		projectNew: roles.users.admin,
		projectEdit: roles.users.admin,
		projectRemove: roles.users.admin,
		featureSetNew: roles.users.admin,
		featureSetView: roles.users.admin,
		featureSetRemove: roles.users.admin,	
		featureSetEditNameAndDescription: roles.users.admin,
		componentsGlobalTemplateEdit: roles.users.admin
	};

	angular
		.module('projectFeatureSetsManager')
		.constant("LOGIN_ROLES", roles); 	   	   	
    	
})();