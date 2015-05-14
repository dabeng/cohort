'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/users.server.controller');
  var attachments = require('../../app/controllers/attachments.server.controller');

  // Attachments Routes
  app.route('/attachments')
    .get(attachments.list)
    .post(users.requiresLogin, attachments.create);

  app.route('/attachments/:attachmentId')
    .get(attachments.read)
    .put(users.requiresLogin, attachments.hasAuthorization, attachments.update)
    .delete(users.requiresLogin, attachments.hasAuthorization, attachments.delete);

  // Finish by binding the Attachment middleware
  app.param('attachmentId', attachments.attachmentByID);
};
