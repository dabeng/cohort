'use strict';

angular.module('activities')
  .controller('AttachmentUploadCtrl', [ '$scope', '$http', '$filter', '$window', function ($scope, $http) {
    $scope.options = {
      // loadVideoFileTypes: /^mp4$/
      // multipart: true,
      // formData: function() {
      //   return {'firstComment': angular.element('.attach-des').val()};
      // }
    };

    $scope.$on('fileuploadsubmit', function (e, data) {
      data.formData = {'attachDes': data.files[0].attachDes};
    });

    $scope.$on('fileuploaddone', function(e, data) {
      if (data.result.error_message) {
        alert(data.result.error_message);
      } else {
        $scope.$parent.attachments = $scope.$parent.attachments.concat(data.result.attachment);
        data.files[0].$destroy();
      }
    });

  }])
  .controller('FileDestroyController', function ($scope) {
    var file = $scope.file;
    file.$destroy = function () {
      $scope.clear(file);
    };
  });