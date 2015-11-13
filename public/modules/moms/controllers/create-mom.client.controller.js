'use strict';

angular.module('moms').controller('CreateMomCtrl', 
  ['$scope', '$stateParams', '$location', 'Authentication', 'Moms',
  function($scope, $stateParams, $location, Authentication, Moms) {
    $scope.authentication = Authentication;

    //Create new Mom
    $scope.create = function() {
      // Create new Mom object
      var mom = new Moms ({
        name: this.name
      });

      // Redirect after save
      mom.$save(function(response) {
        $location.path('moms/' + response._id);

      // Clear form fields
      $scope.name = '';
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

  }
]);