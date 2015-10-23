'use strict';

angular.module('statistics').directive('jqDatatables', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      'options': '='
    },
    template: '<table class="table table-striped table-bordered nowrap" width="100%"></table>',
    link: function(scope, element, attrs) {
      element.dataTable(scope.options);
    }
  };
});