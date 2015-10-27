'use strict';

angular.module('statistics').controller('FitnessCtrl',
  ['$scope', 'Authentication', 'Fitnesses',
  function($scope, Authentication, Fitnesses) {

    $scope.authentication = Authentication;

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    var data = Fitnesses.query({ exerciser: $scope.authentication.user._id });

    var columns = [
      { 'title': 'date',
        'render': function ( data, type, full, meta ) {
          return data.slice(0, 10);
        }
      },
      { 'title': 'sit-up' },
      { 'title': 'running (km)' },
      { 'title': 'pull-up' }
    ];

    var initCompleteCallback = function(settings, json) {
      settings.nTHead.childNodes[0].classList.add('info');
    };

    $scope.tableOptions = {
      'columns': columns,
      'order': [[ 0, 'desc' ]],
      'initComplete': initCompleteCallback,
      'data': data
    };

    $scope.fitness = {};
    $scope.fitness.fitnessDay = new Date();

    $scope.addRecord = function() {
      // Create new Fitness object
      var fitness = new Fitnesses ({
        fitnessDay: this.fitness.fitnessDay,
        pullup: parseInt(this.fitness.pullup),
        situp: parseInt(this.fitness.situp),
        running: parseFloat(this.fitness.running)
      });

      fitness.$save(function(response) {
        $scope.tableOptions.data.push([
          response.fitnessDay,
          response.pullup,
          response.situp,
          response.running
        ]);

        // Clear form fields
        $scope.fitness = null;
      }, function(errorResponse) {
        $scope.fitness.error = errorResponse.data.message;
      });
    };

}]);