'use strict';

angular.module('activities')
  .controller('DemoFileUploadController', [ '$scope', '$http', '$filter', '$window',
      function ($scope, $http) {
        $scope.$on('fileuploaddone', function(e, data) {
            if (data.result.error_message) {
              alert(data.result.error_message);
            } else {
              console.log('All uploads have finished');
            }
        });

      }
  ])
  .controller('FileDestroyController', [ '$scope', '$http',
      function ($scope, $http) {
          var file = $scope.file,
              state;
          if (file.url) {
              file.$state = function () {
                  return state;
              };
              file.$destroy = function () {
                  state = 'pending';
                  return $http({
                      url: file.deleteUrl,
                      method: file.deleteType
                  }).then(
                      function () {
                          state = 'resolved';
                          $scope.clear(file);
                      },
                      function () {
                          state = 'rejected';
                      }
                  );
              };
          } else if (!file.$cancel && !file._index) {
              file.$cancel = function () {
                  $scope.clear(file);
              };
          }
      }
  ]);