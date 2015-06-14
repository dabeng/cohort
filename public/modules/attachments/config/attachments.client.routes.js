'use strict';

angular.module('attachments').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
    state('listAttachments', {
      url: '/attachments',
      templateUrl: 'modules/attachments/views/list-attachments.client.view.html'
    }).
    state('viewAttachment', {
      url: '/attachments/:attachmentId',
      templateUrl: 'modules/attachments/views/view-attachment.client.view.html'
    }).
    state('editAttachment', {
      url: '/attachments/:attachmentId/edit',
      templateUrl: 'modules/attachments/views/edit-attachment.client.view.html'
    });
  }
]);