'use strict';

// Moms controller
angular.module('moms').controller('ListMomsCtrl', ['$scope', '$stateParams', '$location', 'Authentication', 'Moms',
  function($scope, $stateParams, $location, Authentication, Moms) {
    $scope.authentication = Authentication;

    // Find a list of Moms
    $scope.find = function() {
      $scope.moms = Moms.query();
    };

  }
]);