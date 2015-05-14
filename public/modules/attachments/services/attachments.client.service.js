'use strict';

angular.module('attachments').factory('Attachments', function($resource) {
  return $resource('/attachments/:id', {id: '@id'}, {
    update: {
      method: 'PUT'
    }
  });
});