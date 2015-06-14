'use strict';

angular.module('attachments').factory('Attachments', function($resource) {
  return $resource('/attachments/:attachmentId', {attachmentId: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
});