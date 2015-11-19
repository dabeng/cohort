'use strict';

// Moms controller
angular.module('moms').controller('ViewMomCtrl',
  ['$scope', '$stateParams', '$location', '$window', 'Authentication', 'Moms', 'MomThemeColors',
  function($scope, $stateParams, $location, $window, Authentication, Moms, MomThemeColors) {
    $scope.authentication = Authentication;

    $scope.$on('$destroy', function() {
      // when it's the logout of last online attendee, we store the latest mom content to the database
      if ($scope.attendees.length === 1) {
        $scope.updateBoardContent();
      }
      socket.disconnect();
    });

    var generateThemeColor = function() {
      var hue = parseInt(Math.random() * 360);
      var saturation = parseInt(Math.random() * 75 + 25) + '%';
      var lightness = parseInt(Math.random() * 35 + 40) + '%';
      return 'hsl(' + hue + ',' + saturation + ',' + lightness + ')' ;
    };

    $scope.attendees = [];

    var socket = io.connect('http://localhost:3000', {
      'forceNew': true,
      'query': 'username=' + $scope.authentication.user.username
        + '&displayName=' + $scope.authentication.user.displayName
        + '&id=' + $scope.authentication.user._id
        + '&momId=' + $stateParams.momId
    });

    socket.on('attendee logined', function (data) {
      // append one attendee info to attendee list on right side
      var nameList = [];
      $scope.attendees.forEach(function(attendee, index) {
        nameList.push(attendee.username);
      });
      data.attendeeList.forEach(function(attendee, index) {
        if (nameList.indexOf(attendee.username) === -1) {
          if (attendee.username === $scope.authentication.user.username) {
            $scope.myThemeColor = attendee.themeColor;
          }
          $scope.$apply(function() {
            $scope.attendees.push({
              'username': attendee.username,
              'displayName': attendee.displayName,
              'backgroundColor': 'background-color:' + attendee.themeColor
            });
          });
        }
      });
      // store the coordidates of path which is used to identify different attendee's words to the local storage.
      // It's like we use highlighter to paint different attendee's words.
      localStorage.setItem($scope.authentication.user.username, '');
    });
    socket.on('attendee logouted', function (data) {
      // remove the logouted attendee in curent attendee list
      var index = -1;
      $scope.attendees.some(function(attendee, i) {
        if (attendee.username === data.attendeeName) {
          index = i;
          return true;
        }
        return false;
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

    // Update the basic properties of existing Mom
    $scope.update = function() {
      var mom = $scope.mom;

      mom.$update(function() {
        $location.path('moms/' + mom._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.updateBoardContent = function() {
      var mom = $scope.mom;

      mom.$update(function() {
      
      }, function(errorResponse) {
        console.log(errorResponse.data.message);
      });
    };

    // Find existing Mom
    $scope.findOne = function() {
      $scope.mom = Moms.get({ 
        momId: $stateParams.momId
      });
    };

    $scope.updatBoard = function() {
      socket.emit('updating board', $scope.mom.boardContent);
    };

    socket.on('board updated', function (data) {
      $scope.$apply(function() {
        $scope.mom.boardContent = data.boardContent;
      });
    });

  }
]);