(function () {
    'use strict';

    angular
		.module('projectFeatureSetsManager')
		.controller("ModalController", ModalController);

	function ModalController (headerText, bodyText) {
		this.headerText = headerText;
		this.bodyText = bodyText;
	}
})();