'use strict';

//Moms service used to communicate Moms REST endpoints
angular.module('momThemeColors').factory('MomThemeColors', ['$resource',
  function($resource) {
    return $resource('momThemeColors/:momThemeColorId', { momId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);