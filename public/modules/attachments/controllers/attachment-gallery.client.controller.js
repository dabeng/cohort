'use strict'

angular.module('attachments').controller('AttachmentGalleryCtrl',
  ['$scope', '$stateParams', '$location', 'Authentication', 'Attachments',
  function($scope, $stateParams, $location, Authentication, Attachments) {

    $scope.attachments = Attachments.query({
      activity: $stateParams.activityId
    });

}]);