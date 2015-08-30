module.exports = function(config) {
  config.set({

    basePath : '../',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-ui-grid/ui-grid.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-ui-tree/dist/angular-ui-tree.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/bootstrap-ui-treeview/dist/tree-view.js',
      'app/src/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      // 'test/unit/project/projectIndexCtrlSpec.js',
      'test/unit/project/DEPRECATED_projectFactorySpec.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    // browsers : ['Firefox', 'Chrome'],
    browsers : ['Chrome'],

    colors: true,

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    // reporters: ['dots'],
 
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};