'use strict';

/**
 * Module dependencies.
 */

var moment = require('moment');
var utils = require('./utils.server.controller');
var Activity = require('../models/activity.server.model');
var User = require('../models/user.server.model');
var fs = require('fs');
var easyimg = require('easyimage');

exports.index = function(req, res) {
  res.render('index', {
    user: req.user || null,
    request: req
  });
};

function keepImage(uploading) {
  async.parallel([
    function(callback){
      KeepStandardImage(uploading, callback);
    },
    function(callback){
      KeepCoverImage(uploading, callback);
    },
    function(callback){
      KeepThumbnailImage(uploading, callback);
    }
  ]);
  /*var fullPath = uploading.fullPath;
  var partialPath = fullPath.slice(0, fullPath.lastIndexOf('.'));
  var fileExt = fullPath.slice(fullPath.lastIndexOf('.'));
  // keeping a original uploding attachments
  fs.rename(uploading.tmpPath, fullPath, function(err) {
    if (err) {
      uploading.res.json({'user_error': 'Uploading attachment failed',
        'maintainer_error': 'Renaming path failed'});
    } else { // if attachment is picture, we need to creat mutliple thumbnails for feature use.
        var thumbPath_actList = partialPath + '-thumb-actlist' + fileExt;
        var thumbPath_act = partialPath + '-thumb-act' + fileExt;
        easyimg.info(fullPath).then(
          function(file) {
            var originalWidth = file.width;
            var originalHeight = file.height;
            var ratio = 16 / 9;
            var resizeWidth = 0;
            var resizeHeight = 0;

            if (originalWidth > 800 || originalHeight > 450) {
              if (originalWidth / originalHeight >= ratio) {
                resizeHeight = 450;
              } else {
                resizeWidth = 800;
              }
              easyimg.rescrop({
                  src: fullPath,
                  dst: thumbPath_actList,
                  width: resizeWidth || originalWidth,
                  height: resizeHeight || originalHeight,
                  cropwidth: 800,
                  cropheight: 450
                }).then(
                function(image) {
                  easyimg.resize({
                      src: thumbPath_actList,
                      dst: thumbPath_act,
                      width: 160,
                      height: 90
                    }).then(
                    function(image) {
                      uploading.res.json({'attachment': {
                        'activityId': uploading.activityId,
                        'uploaderId': uploading.uploaderId,
                        'name': standardFilename,
                        'fileType': 'picture',
                        'size': uploading.size,
                        'path': fullPath,
                        'actListThumbPath': thumbPath_actList,
                        'actThumbPath': thumbPath_act
                      }});
                    },
                    function(err) {
                      uploading.res.json({'user_error': 'Uploading attachment failed',
                        'maintainer_error': 'Generating thumbnail for the card details view failed'});
                    }
                  );
                },
                function(err) {
                  uploading.res.json({'user_error': 'Uploading attachment failed',
                    'maintainer_error': 'Generating thumbnail for the card view failed'});
                }
              );
            } else {
              easyimg.resize({
                src: fullPath,
                dst: thumbPath_act,
                width: 160,
                height: 90
              }).then(
              function(image) {
                uploading.res.json({'attachment': {
                  'activityId': uploading.activityId,
                  'uploaderId': uploading.uploaderId,
                  'name': standardFilename,
                  'fileType': 'picture',
                  'size': uploading.size,
                  'path': fullPath,
                  'actThumbPath': thumbPath_act
                }});
              },
              function(err) {
                uploading.res.json({'user_error': 'Uploading attachment failed',
                  'maintainer_error': 'Generating thumbnail for the card details view failed'});
              }
            );
          }
        },
        function(err) {
          uploading.res.json({'user_error': 'Uploading attachment failed',
            'maintainer_error': 'Reading image info failed'});
        }
      );
    }
  });*/
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
exports.uploadFile = function(req, res) {
  var isImage = req.files.attachment.mimetype.indexOf('image') > -1;
  var originalname = req.files.attachment.originalname;
  var activityStuff = __dirname + '/../../public/attachments/' + req.params.activityId;
  var filename = Date.now() + '-'
    + originalname.slice(0, originalname.lastIndexOf('.')).replace(/\W+/g, '-').toLowerCase()
    + '.' + req.files.attachment.extension;

  var uploading = {
    'tmpPath': req.files.attachment.path,
    'targetPath': activityStuff,
    'timestamp': Date.now(),
    'activityId': req.params.activityId,
    'uploaderId': req.user.id,
    'size': req.files.attachment.size,
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