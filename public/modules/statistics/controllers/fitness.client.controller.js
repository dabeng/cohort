'use strict';

angular.module('statistics').controller('FitnessCtrl', function($scope) {

  var dataset = [
    [ 21, 50, 6, "2015/10/23" ],
    [ 30, 60, 4, "2015/10/22" ],
    [ 20, 50, 3, "2015/10/21" ],
    [ 40, 70, 2, "2015/10/20" ],
    [ 30, 50, 6, "2015/10/19" ],
    [ 20, 50, 7, "2015/10/18" ],
    [ 30, 90, 8, "2015/10/17" ],
    [ 20, 50, 9, "2015/10/16" ],
    [ 32, 50, 5, "2015/10/15" ],
    [ 14, 60, 4, "2015/10/14" ],
    [ 10, 50, 3, "2015/10/13" ],
    [ 24, 50, 2, "2015/10/12" ],
    [ 28, 70, 1, "2015/10/11" ],
    [ 20, 70, 8, "2015/10/10" ],
    [ 25, 40, 6, "2015/10/9" ],
    [ 20, 10, 7, "2015/10/8" ],
    [ 30, 20, 9, "2015/10/7" ],
    [ 20, 50, 5, "2015/10/6" ]
  ];

  var columns = [
    { title: 'pull-up' },
    { title: 'sit-up' },
    { title: 'running' },
    { title: 'date' }
  ];

  var initCompleteCallback = function(settings, json) {
    settings.nTHead.childNodes[0].classList.add('info');
  };

  $scope.tableOptions = {
    'columns': columns,
    'data': dataset,
    'initComplete': initCompleteCallback
  };

});