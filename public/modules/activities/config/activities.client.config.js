'use strict';

// Configuring the Articles module
angular.module('activities')
  .config([ '$httpProvider', 'fileUploadProvider',
    function ($httpProvider, fileUploadProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      
    }
  ])
  .run(['Menus',
  	function(Menus) {
  		// Set top bar menu items
  		Menus.addMenuItem('topbar', 'Activities', 'activities', 'dropdown', '/activities(/create)?');
  		Menus.addSubMenuItem('topbar', 'activities', 'List Activities', 'activities');
  		Menus.addSubMenuItem('topbar', 'activities', 'New Activity', 'activities/create');
  	}
  ]);