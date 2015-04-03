'use strict';

angular.module('activities').controller('DatePickerCtrl', function ($scope) {
  $scope.today = function() {
    $scope.holdDate = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.holdDate = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.changed = function() {
    $scope.$parent.datetime.holdDate = $scope.holdDate.toDateString();
  };

});

angular.module('activities').controller('TimePickerCtrl', function ($scope, $log) {
  $scope.holdTime = new Date();
  $scope.hstep = 1;
  $scope.mstep = 1;
  $scope.ismeridian = true;

  $scope.changed = function () {
    $scope.$parent.datetime.holdTime = $scope.holdTime.toTimeString();
  };

});