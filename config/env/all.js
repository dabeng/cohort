'use strict';

module.exports = {
  app: {
    title: 'Cohort',
    description: 'A arrange activities tool for cohort',
    keywords: 'AngularJS, Node.js, MEAN.JS'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  assets: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/modules/core/css/font-awesome.css',
        'public/lib/blueimp-file-upload/css/jquery.fileupload.css',
        'public/lib/blueimp-file-upload/css/jquery.fileupload-ui.css',
        'public/lib/animate.css/animate.css',
        'public/lib/DataTables/media/css/dataTables.bootstrap.css'
      ],
      js: [
        'public/lib/jquery/dist/jquery.js',
        'public/lib/DataTables/media/js/jquery.dataTables.js',
        'public/lib/DataTables/media/js/dataTables.bootstrap.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js', 
        'public/lib/angular-cookies/angular-cookies.js', 
        'public/lib/angular-animate/angular-animate.js', 
        'public/lib/angular-touch/angular-touch.js', 
        'public/lib/angular-sanitize/angular-sanitize.js', 
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
        'public/lib/blueimp-load-image/js/load-image.all.min.js',
        'public/lib/blueimp-canvas-to-blob/canvas-to-blob.js',
        'public/lib/blueimp-file-upload/js/jquery.iframe-transport.js',
        'public/lib/blueimp-file-upload/js/jquery.fileupload.js',
        'public/lib/blueimp-file-upload/js/jquery.fileupload-process.js',
        'public/lib/blueimp-file-upload/js/jquery.fileupload-image.js',
        'public/lib/blueimp-file-upload/js/jquery.fileupload-audio.js',
        'public/lib/blueimp-file-upload/js/jquery.fileupload-video.js',
        'public/lib/blueimp-file-upload/js/jquery.fileupload-validate.js',
        'public/lib/blueimp-file-upload/js/jquery.fileupload-angular.js',
        'public/lib/highcharts/highcharts.js',
        'public/js/jquery.fileupload-attachment.validate.js',
        'public/js/mapdata/map.js',
        'public/js/mapdata/world.js',
        'public/lib/highcharts-ng/dist/highcharts-ng.js'
      ]
    },
    css: [
      'public/modules/**/css/*.css'
    ],
    js: [
      'public/config.js',
      'public/application.js',
      'public/modules/*/*.js',
      'public/modules/*/*[!tests]*/*.js'
    ],
    tests: [
      'public/lib/angular-mocks/angular-mocks.js',
      'public/modules/*/tests/*.js'
    ]
  }
};