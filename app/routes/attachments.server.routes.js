'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/users.server.controller');
  var attachments = require('../../app/controllers/attachments.server.controller');
  var  multer  = require('multer');

  app.use(multer({
    dest: '../../public/attachments'
  }));
  // app.post('/upload/:activityId', core.uploadFile);

  // Attachments Routes
  app.route('/attachments')
    .get(attachments.list);
    
  app.route('/attachments/:activityId')
    .post(users.requiresLogin, attachments.uploadAttachment);

  app.route('/attachments/:attachmentId')
    .get(attachments.read)
    .put(users.requiresLogin, attachments.hasAuthorization, attachments.update)
    .delete(users.requiresLogin, attachments.hasAuthorization, attachments.delete);

  // Finish by binding the Attachment middleware
  app.param('attachmentId', attachments.attachmentByID);
};
