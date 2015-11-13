'use strict';

angular.module('moms').controller('EditMomCtrl', ['$scope', '$stateParams', '$location', 'Authentication', 'Moms',
  function($scope, $stateParams, $location, Authentication, Moms) {
    $scope.authentication = Authentication;  

    // Update existing Mom
    $scope.update = function() {
      var mom = $scope.mom;

      mom.$update(function() {
        $location.path('moms/' + mom._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find existing Mom
    $scope.findOne = function() {
      $scope.mom = Moms.get({ 
        momId: $stateParams.momId
      });
    };

  }
]);