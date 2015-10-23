'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
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

    $scope.icons = [{ src: 'modules/core/img/cohort/01.jpg', name: 'haoran' },
      { src: 'modules/core/img/cohort/02.jpg', name: 'diaosi' },
      { src: 'modules/core/img/cohort/03.jpg', name: 'xingge' },
      { src: 'modules/core/img/cohort/04.jpg', name: 'jinmiao' },
      { src: 'modules/core/img/cohort/05.jpg', name: 'xuebin' },
      { src: 'modules/core/img/cohort/06.jpg', name: 'haoran' },
      { src: 'modules/core/img/cohort/07.jpg', name: 'guansheng' },
      { src: 'modules/core/img/cohort/08.jpg', name: 'jiwei' },
      { src: 'modules/core/img/cohort/09.jpg', name: 'hama' },
      { src: 'modules/core/img/cohort/10.jpg', name: 'datun' },
      { src: 'modules/core/img/cohort/11.jpg', name: 'huihui' },
      { src: 'modules/core/img/cohort/12.jpg', name: 'haoran' },
      { src: 'modules/core/img/cohort/13.jpg', name: 'laozhu' },
      { src: 'modules/core/img/cohort/14.jpg', name: 'haoran' },
      { src: 'modules/core/img/cohort/15.jpg', name: 'erge' },
      { src: 'modules/core/img/cohort/16.jpg', name: 'haoran' },
      { src: 'modules/core/img/cohort/17.jpg', name: 'haoran' },
      { src: 'modules/core/img/cohort/18.jpg', name: 'haoran' },
      { src: 'modules/core/img/cohort/19.jpg', name: 'haoran' },
      { src: 'modules/core/img/cohort/20.jpg', name: 'haoran' },
      { src: 'modules/core/img/cohort/21.jpg', name: 'jianchen' },
      { src: 'modules/core/img/cohort/22.jpg', name: 'haoran' },
      { src: 'modules/core/img/cohort/23.jpg', name: 'weitao' },
      { src: 'modules/core/img/cohort/24.jpg', name: 'haoran' }];

  }

]);