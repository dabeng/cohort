'use strict';

angular.module('attachments').directive('attachmentitem', function() {
  return {
    restrict: 'E',
    scope: {
      datasource: '='
    },
    templateUrl: 'modules/attachments/views/attachment-item.html',
    controller: function($scope, Comments) {
      // var ngRef = angular.element(this).prop('nf-ref').val();
      $scope.comments = Comments.query({ attachment: $scope.datasource._id });


    }
  };
});