'use strict';

angular.module('attachments').directive('attachmentitem', function() {
  return {
    restrict: 'E',
    scope: {
      datasource: '=',
      activityId: '@'
    },
    templateUrl: 'modules/attachments/views/attachment-item.html',
    controller: function($scope, Comments) {



    }
  };
});