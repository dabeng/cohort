'use strict';

// Configuring the Articles module
angular.module('activities')
  .config([ '$httpProvider', 'fileUploadProvider',
    function ($httpProvider, fileUploadProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      fileUploadProvider.defaults.redirect = window.location.href.replace(
          /\/[^\/]*$/,
          '/cors/result.html?%s'
      );
 
          // Demo settings:
          angular.extend(fileUploadProvider.defaults, {
              // Enable image resizing, except for Android and Opera,
              // which actually support image resizing, but fail to
              // send Blob objects via XHR requests:
              disableImageResize: /Android(?!.*Chrome)|Opera/
                  .test(window.navigator.userAgent),
              maxFileSize: 5000000,
              acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
          });
      
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