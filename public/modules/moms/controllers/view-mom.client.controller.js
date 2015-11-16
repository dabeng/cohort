'use strict';

// Moms controller
angular.module('moms').controller('ViewMomCtrl',
  ['$scope', '$stateParams', '$location', '$window', 'Authentication', 'Moms', 'MomThemeColors',
  function($scope, $stateParams, $location, $window, Authentication, Moms, MomThemeColors) {
    $scope.authentication = Authentication;

    $scope.$on('$destroy', function() {
      socket.disconnect();
    })

    $scope.generateThemeColor = function() {
      var hue = parseInt(Math.random() * 360);
      var saturation = parseInt(Math.random() * 75 + 25) + '%';
      var lightness = parseInt(Math.random() * 35 + 40) + '%';
      return 'hsl(' + hue + ',' + saturation + ',' + lightness + ')' ;
    };

    $scope.attendees = [];

    var socket = io.connect('http://localhost:3000', {
      'forceNew': true,
      'query': 'name=' + $scope.authentication.user.displayName
        + '&id=' + $scope.authentication.user._id
        + '&momId=' + $stateParams.momId
    });

    socket.on('attendee logined', function (data) {
      var nameList = [];
      $scope.attendees.forEach(function(attendee, index) {
        nameList.push(attendee.name);
      });
      data.attendeeList.forEach(function(attendee, index) {
        if (nameList.indexOf(attendee.name) === -1) {
          $scope.$apply(function() {
            $scope.attendees.push({
              'name': attendee.name,
              'backgroundColor': 'background-color:' + attendee.themeColor
            });
          });
        }
      });
    });
    socket.on('attendee logouted', function (data) {
      var index = -1;
      $scope.attendees.forEach(function(attendee, i) {
        if (attendee.name === data.attendeeName) {
          index = i;
        }
      });
      if (index > -1) {
        $scope.$apply(function() {
          $scope.attendees.splice(index, 1);
        });
      }

    });

    // Remove existing Mom
    $scope.remove = function(mom) {
      if ( mom ) { 
        mom.$remove();

        for (var i in $scope.moms) {
          if ($scope.moms [i] === mom) {
            $scope.moms.splice(i, 1);
          }
        }
      } else {
        $scope.mom.$remove(function() {
          $location.path('moms');
        });
      }
    };

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

    $scope.updatBoard = function() {
      socket.emit('updating board', $scope.boardContent);
    };

    socket.on('board updated', function (data) {
      $scope.$apply(function() {
        $scope.boardContent = data.boardContent;
      });
    });

  }
]);