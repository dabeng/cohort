'use strict';

//Statistics service used to communicate Statistics REST endpoints
angular.module('statistics').factory('Fitnesses', ['$resource',
  function($resource) {
    return $resource('fitnesses/:fitnessId', { fitnessId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);