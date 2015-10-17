'use strict';

angular.module('attachments').controller('ViewAttachmentCtrl', ['$scope', '$stateParams',
  '$location','Authentication', 'Attachments', 'Comments',
  function($scope, $stateParams, $location, Authentication, Attachments, Comments) {
    $scope.authentication = Authentication;

    $scope.comments = Comments.query({
      attachment: $stateParams.attachmentId
    });

    // Find existing Attachment
    $scope.findOne = function() {
      $scope.attachment = Attachments.get({ 
        attachmentId: $stateParams.attachmentId
      });
    };

    $scope.$on('newComment', function(e, data) {
      data.commenter = $scope.authentication.user;
      $scope.comments.push(data);
    });

  }
]);