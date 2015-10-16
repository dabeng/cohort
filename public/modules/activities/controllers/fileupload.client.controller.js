'use strict';

angular.module('activities')
  .controller('AttachmentUploadCtrl', [ '$scope', '$http', '$filter', '$window', function ($scope, $http) {
    $scope.options = {
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png|mp4)$/i
    };

    $scope.$on('fileuploadsubmit', function (e, data) {
      if (data.files[0].attachDes) {
        data.formData = {'attachDes': data.files[0].attachDes};
      }
    });

    $scope.$on('fileuploaddone', function(e, data) {
      if (data.result.error_message) {
        alert(data.result.error_message);
      } else {
        // $scope.$parent.attachments = $scope.$parent.attachments.concat();
        data.files[0].$destroy();
        $scope.$emit('newAttachment', data.result.attachment);
      }
    });

  }])
  .controller('FileDestroyController', function ($scope) {
    var file = $scope.file;
    file.$destroy = function () {
      $scope.clear(file);
    };
  });