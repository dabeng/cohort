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
      var dt = angular.element(element).DataTable(scope.options);
      scope.$watch('options.data', function(newData) {
        var newData = newData || null;
        if (newData) {
          dt.clear();
          dt.rows.add(newData).draw();
        }
       }, true);
    }
  };
});