'use strict';

angular.module('statistics').directive('jqDatatables', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      'options': '=',
      'dataset': '='
    },
    template: '<table class="table table-striped table-bordered nowrap" width="100%"></table>',
    link: function(scope, element, attrs) {
       $timeout(function() {
      element.dataTable(scope.options);
    }, 0);
           scope.$watch(scope.dataset, function(value) {
                var val = value || null;
                if (val) {
                    dataTable.fnClearTable();
                    dataTable.fnAddData(scope.dataset);
                }
            });
    }
  };
}]);