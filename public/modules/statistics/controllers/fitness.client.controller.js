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

  // var dataset = [
  //   [ "2015/10/23", 21, 50, 6 ],
  //   [ "2015/10/22", 30, 60, 4 ],
  //   [ "2015/10/21", 20, 50, 3 ],
  //   [ "2015/10/20", 40, 70, 2 ],
  //   [ "2015/10/19", 30, 50, 6 ],
  //   [ "2015/10/18", 20, 50, 7 ],
  //   [ "2015/10/17", 30, 90, 8 ],
  //   [ "2015/10/16", 20, 50, 9 ],
  //   [ "2015/10/15", 32, 50, 5 ],
  //   [ "2015/10/14", 14, 60, 4 ],
  //   [ "2015/10/13", 10, 50, 3 ],
  //   [ "2015/10/12", 24, 50, 2 ],
  //   [ "2015/10/11", 28, 70, 1 ],
  //   [ "2015/10/10", 20, 70, 8 ],
  //   [ "2015/10/9" , 25, 40, 6 ],
  //   [ "2015/10/8" , 20, 10, 7 ],
  //   [ "2015/10/7" , 30, 20, 9 ],
  //   [ "2015/10/6" , 20, 50, 5 ]
  // ];

  $scope.dataset = Fitnesses.query({
      exerciser: $scope.authentication.user._id
    });

  var columns = [
    { title: 'date' },
    { title: 'sit-up' },
    { title: 'running (km)' },
    { title: 'pull-up' }
  ];

  var initCompleteCallback = function(settings, json) {
    settings.nTHead.childNodes[0].classList.add('info');
  };

  $scope.tableOptions = {
    'columns': columns,
    'data': [],
    'initComplete': initCompleteCallback
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

      // Redirect after save
      fitness.$save(function(response) {
        // $location.path('fitnesses/' + response._id);

        // Clear form fields
        $scope.fitness = null;
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
  };

}]);