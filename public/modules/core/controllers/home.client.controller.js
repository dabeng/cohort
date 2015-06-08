'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$animate',
  function($scope, Authentication, $animate) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $animate.enabled(false);
    $scope.myInterval = 3000;
    $scope.slides = [{ image: 'modules/core/img/slides/01.jpg', text: 'basketball at Dida' },
      { image: 'modules/core/img/slides/02.jpg', text: 'basketball at Qinghua' },
      { image: 'modules/core/img/slides/03.jpg', text: 'basketball at Beida' },
      { image: 'modules/core/img/slides/04.jpg', text: 'fishing' },
      { image: 'modules/core/img/slides/05.jpg', text: 'fishing' },
      { image: 'modules/core/img/slides/06.jpg', text: 'fishing' },
      { image: 'modules/core/img/slides/07.jpg', text: 'travel' },
      { image: 'modules/core/img/slides/08.jpg', text: 'travel' },
      { image: 'modules/core/img/slides/09.jpg', text: 'travel' },
      { image: 'modules/core/img/slides/10.jpg', text: 'party' }
      ];

    $scope.icons = [{ src: 'modules/core/img/cohort/01.jpg', name: 'haoran'},
      { src: 'modules/core/img/cohort/02.jpg' },
      { src: 'modules/core/img/cohort/03.jpg' },
      { src: 'modules/core/img/cohort/04.jpg' },
      { src: 'modules/core/img/cohort/05.jpg' },
      { src: 'modules/core/img/cohort/06.jpg' },
      { src: 'modules/core/img/cohort/07.jpg' },
      { src: 'modules/core/img/cohort/08.jpg' },
      { src: 'modules/core/img/cohort/09.jpg' },
      { src: 'modules/core/img/cohort/10.jpg' },
      { src: 'modules/core/img/cohort/11.jpg' },
      { src: 'modules/core/img/cohort/12.jpg' },
      { src: 'modules/core/img/cohort/13.jpg' },
      { src: 'modules/core/img/cohort/14.jpg' },
      { src: 'modules/core/img/cohort/15.jpg' },
      { src: 'modules/core/img/cohort/16.jpg' },
      { src: 'modules/core/img/cohort/17.jpg' },
      { src: 'modules/core/img/cohort/18.jpg' },
      { src: 'modules/core/img/cohort/19.jpg' },
      { src: 'modules/core/img/cohort/20.jpg' },
      { src: 'modules/core/img/cohort/21.jpg' },
      { src: 'modules/core/img/cohort/22.jpg' },
      { src: 'modules/core/img/cohort/23.jpg' },
      { src: 'modules/core/img/cohort/24.jpg' }];

  }

]);