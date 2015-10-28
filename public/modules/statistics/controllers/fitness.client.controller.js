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
    $scope.fitness.maxDate = new Date();

    $scope.submitted = false;
    $scope.validationInfo = {};
    $scope.addRecord = function() {
      if ($scope.fitnessForm.$valid) {
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
          $scope.submitted = false;
          $scope.fitness = {};
          $scope.validationInfo = {};
        }, function(errorResponse) {
          $scope.fitness.error = errorResponse.data.message;
        });
      } else {
        $scope.submitted = true;
        // validate fitness-day field
        if ($scope.fitnessForm.fitnessDay.$error.required) {
          $scope.validationInfo.fitnessDay = 'It\'s a required field.';
        }
        // validate pullup field
        if ($scope.fitnessForm.pullup.$error.required) {
          $scope.validationInfo.pullup = 'It\'s a required field.';
        }
        if ($scope.fitnessForm.pullup.$error.number) {
          $scope.validationInfo.pullup = 'The value should be an integer.';
        }
        if ($scope.fitnessForm.pullup.$error.pattern) {
          $scope.validationInfo.pullup = 'The value should be an integer that is greater than or equal to 0.';
        }
        if ($scope.fitnessForm.pullup.$error.max) {
          $scope.validationInfo.pullup = 'The value should be less than or equal to 300.';
        }
        // validate situp field
        if ($scope.fitnessForm.situp.$error.required) {
          $scope.validationInfo.situp = 'It\'s a required field.';
        }
        if ($scope.fitnessForm.situp.$error.number) {
          $scope.validationInfo.situp = 'The value should be an integer.';
        }
        if ($scope.fitnessForm.situp.$error.pattern) {
          $scope.validationInfo.situp = 'The value should be an integer that is greater than or equal to 0.';
        }
        if ($scope.fitnessForm.situp.$error.max) {
          $scope.validationInfo.situp = 'The value should be less than or equal to 500.';
        }
        // validate running field
        if ($scope.fitnessForm.running.$error.required) {
          $scope.validationInfo.running = 'It\'s a required field.';
        }
        if ($scope.fitnessForm.running.$error.number) {
          $scope.validationInfo.running = 'The value should be an integer.';
        }
        if ($scope.fitnessForm.running.$error.pattern) {
          $scope.validationInfo.running = 'The value should be an integer that is greater than or equal to 0.';
        }
        if ($scope.fitnessForm.running.$error.max) {
          $scope.validationInfo.running = 'The value should be less than or equal to 20.';
        } 
      }

    };

}]);