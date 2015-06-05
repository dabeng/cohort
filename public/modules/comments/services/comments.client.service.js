'use strict';

angular.module('comments').factory('Comments', function($resource) {
  return $resource('/comments/:id', null, {
    update: {
      method: 'PUT'
    }
  });
});