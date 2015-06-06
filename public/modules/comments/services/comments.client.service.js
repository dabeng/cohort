'use strict';

angular.module('comments').factory('Comments', function($resource) {
  return $resource('/comments/:id', {id: '@id'}, {
    update: {
      method: 'PUT'
    }
  });
});