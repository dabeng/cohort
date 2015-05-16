'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Attachment = mongoose.model('Attachment'),
  _ = require('lodash'),
  fs = require('fs'),
  async = require('async'),
  easyimg = require('easyimage');

function keepThumbnailImage(uploading, callback) {
  var thumbImagePath = uploading.targetPath + '/' + uploading.timestamp + '-' + uploading.filename
    + '-thumb' + uploading.extension;
  easyimg.resize({
      src: uploading.stdImagePath,
      dst: thumbImagePath,
      width: 160,
      height: 90
    }).then(
    function(image) {
      callback(null, uploading.stdImagePath, thumbImagePath);
    },
    function(err) {
      uploading.res.json({ 'user_error': 'Uploading attachment failed' });
    }
  );
}

function keepStandardImage(uploading, callback) {
  var originalWidth = uploading.originalWidth;
  var originalHeight = uploading.originalHeight;
  var ratio = 16 / 9;
  var resizeWidth = 0;
  var resizeHeight = 0;
  var stdImagePath = uploading.targetPath + '/' + uploading.timestamp + '-' + uploading.filename
    + '-std' + uploading.extension;
  if (originalWidth > 800 || originalHeight > 450) {
    if (originalWidth / originalHeight >= ratio) {
      resizeHeight = 450;
    } else {
      resizeWidth = 800;
    }
    easyimg.rescrop({
        src: uploading.tmpPath,
        dst: stdImagePath,
        width: resizeWidth || originalWidth,
        height: resizeHeight || originalHeight,
        cropwidth: 800,
        cropheight: 450
      }).then(
      function(image) {
        uploading.stdImagePath = stdImagePath;
        keepThumbnailImage(uploading, callback);
      },
      function(err) {
        uploading.res.json({ 'error_message': 'Uploading attachment failed' });
      }
    );
  } else {
    fs.rename(uploading.tmpPath, stdImagePath, function(err) {
      if (err) {
        uploading.res.json({ 'error_message': 'Uploading attachment failed' });
      }
      keepThumbnailImage(uploading, callback);
    });
  }
}

function keepCoverImage(uploading, callback) {
  var originalWidth = uploading.originalWidth;
  var originalHeight = uploading.originalHeight;
  var resizeWidth = 0;
  var resizeHeight = 0;
  var coverImagePath = uploading.targetPath + '/' + uploading.timestamp + '-' + uploading.filename
    + '-cover' + uploading.extension;

    if (originalWidth / originalHeight >= 1) {
      resizeHeight = 300;
    } else {
      resizeWidth = 300;
    }
    easyimg.rescrop({
        src: uploading.tmpPath,
        dst: coverImagePath,
        width: resizeWidth || originalWidth,
        height: resizeHeight || originalHeight,
        cropwidth: 300,
        cropheight: 300
      }).then(
      function(image) {
        callback(null, coverImagePath);
      },
      function(err) {
        uploading.res.json({ 'error_message': 'Uploading attachment failed' });
      }
    );

}

function keepImage(uploading) {
  easyimg.info(uploading.tmpPath).then(
    function(file) {
      uploading.originalWidth = file.width;
      uploading.originalHeight = file.height;
      async.parallel([
       function(callback){
         keepStandardImage(uploading, callback);
       },
       function(callback){
         keepCoverImage(uploading, callback);
       }
      ],
      function(err, results){
        if (err) {
          uploading.res.json({ 'error_message': 'Uploading attachment failed' });
        } else {
          var attachment = new Attachment({
            'name': uploading.filename,
            'fileType': 'picture',
            'path': results[0][0],
            'thumbImagePath': results[0][1],
            'coverImagePath': results[1]
          });
          attachment.activity = uploading.req.activity;
          attachment.uploader = uploading.req.user;
          attachment.save(function(err) {
            if (err) {
              uploading.res.json({ 'error_message': 'Uploading attachment failed' });
            } else {
              uploading.res.json(attachment);
            }
          });
        }
      });
    },
    function(err) {
      uploading.res.json({ 'error_message': 'Uploading attachment failed' });
    }
  );
}

function keepVedio(uploading) {
  fs.rename(uploading.tmpPath, uploading.fullPath, function(err) {
    if (err) {
      uploading.res.json({'user_error': 'Uploading vedio failed',
        'maintainer_error': 'Renaming path failed'});
    } else {

    }
  });
}

// rote to upload attachments for card
exports.uploadAttachment = function(req, res) {
  var isImage = req.files.attachment.mimetype.indexOf('image') > -1;
  var originalname = req.files.attachment.originalname;
  var activityStuff = __dirname + '/../../public/attachments/' + req.params.activityId;
  var filename = originalname.slice(0, originalname.lastIndexOf('.')).replace(/\W+/g, '-').toLowerCase();

  var uploading = {
    'tmpPath': req.files.attachment.path,
    'targetPath': activityStuff,
    'filename': filename,
    'extension': '.' + req.files.attachment.extension,
    'timestamp': Date.now(),
    'size': req.files.attachment.size,
    'req': req,
    'res': res
  };

  fs.exists(activityStuff, function (isExist) {
    if (!isExist) {
      fs.mkdir(activityStuff, function(err) {
        if (err) {
          res.json({'user_error': 'Uploading attachment failed',
            'maintainer_error': 'Making directory failed'});
        } else {
          isImage ? keepImage(uploading) : keepVideo(uploading);
        }
      });
    } else {
      isImage ? keepImage(uploading) : keepVideo(uploading);
    }
  });
};

/**
 * Create a Attachment
 */
exports.createAttachmentRecord = function(req, res) {
  var attachment = new Attachment(req.body);
  attachment.user = req.user;

  attachment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attachment);
    }
  });
};

/**
 * Show the current attachment
 */
exports.read = function(req, res) {
  res.jsonp(req.attachment);
};

/**
 * Update a attachment
 */
exports.update = function(req, res) {
  var attachment = req.attachment ;

  attachment = _.extend(attachment , req.body);

  attachment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attachment);
    }
  });
};

/**
 * Delete an attachment
 */
exports.delete = function(req, res) {
  var attachment = req.attachment ;

  attachment.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attachment);
    }
  });
};

/**
 * List of Attachments
 */
exports.list = function(req, res) { 
  Attachment.find().sort('-created').populate('user', 'displayName').exec(function(err, Attachments) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(Attachments);
    }
  });
};

/**
 * attachment middleware
 */
exports.attachmentByID = function(req, res, next, id) { 
  Attachment.findById(id).populate('user', 'displayName').exec(function(err, attachment) {
    if (err) return next(err);
    if (! attachment) return next(new Error('Failed to load attachment ' + id));
    req.attachment = attachment ;
    next();
  });
};

/**
 * attachment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.attachment.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
