'use strict';

module.exports = function(app) {
  var multer  = require('multer');

  // Root routing
  var core = require('../../app/controllers/core.server.controller');
  app.route('/').get(core.index);

  // attchament upload routing
  // app.use(multer({
  //   dest: '../../public/attachments'
  // }));
  // app.post('/upload/:activityId', core.uploadFile);
};