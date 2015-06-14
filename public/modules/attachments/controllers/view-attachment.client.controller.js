'use strict';

angular.module('attachments').controller('ViewAttachmentCtrl', ['$scope', '$stateParams', '$location', 'Authentication', 'Attachments',
  function($scope, $stateParams, $location, Authentication, Attachments) {
    $scope.authentication = Authentication;

    // Find existing Attachment
    $scope.findOne = function() {
      $scope.attachment = Attachments.get({ 
        attachmentId: $stateParams.attachmentId
      });
    };
  }
]);