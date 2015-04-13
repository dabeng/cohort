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

function fSRename(renameParams) {
  var fileExt = utils.getExtension(renameParams.targetFilename);
  var filename = renameParams.targetFilename.slice(0, renameParams.targetFilename.lastIndexOf('.'))
    .replace(/\W+/g, '-').toLowerCase();
  var standardFilename = filename + fileExt;
  var partialPath = renameParams.targetPath + '/' + filename;
  var fullPath = renameParams.targetPath + '/' + standardFilename;
  fs.rename(renameParams.tmpPath, fullPath, function(err) {
    if (err) {
      renameParams.res.json({'user_error': 'Uploading attachment failed',
        'maintainer_error': 'Renaming path failed'});
    } else {
      var imageRegExp = /(\.|\/)(bmp|gif|jpe?g|png)$/i;
      if (imageRegExp.test(fileExt)) {
        var thumbPath_actList = partialPath + '-thumb-actlist' + fileExt;
        var thumbPath_act = partialPath + '-thumb-act' + fileExt;
        easyimg.info(fullPath).then(
          function(file) {
            var originalWidth = file.width;
            var originalHeight = file.height;
            var ratio = 5 / 3;
            var resizeWidth = 0;
            var resizeHeight = 0;

            if (originalWidth > 250 || originalHeight > 150) {
              if (originalWidth / originalHeight >= ratio) {
                resizeHeight = 150;
              } else {
                resizeWidth = 250;
              }
              easyimg.rescrop({
                  src: fullPath,
                  dst: thumbPath_actList,
                  width: resizeWidth || originalWidth,
                  height: resizeHeight || originalHeight,
                  cropwidth: 250,
                  cropheight: 150
                }).then(
                function(image) {
                  easyimg.resize({
                      src: thumbPath_actList,
                      dst: thumbPath_act,
                      width: 70,
                      height: 42
                    }).then(
                    function(image) {
                      renameParams.res.json({'attachment': {
                        'activityId': renameParams.activityId,
                        'uploaderId': renameParams.uploaderId,
                        'name': standardFilename,
                        'fileType': 'picture',
                        'size': renameParams.size,
                        'path': fullPath,
                        'cardThumbPath': thumbPath_actList,
                        'cardDetailThumbPath': thumbPath_act
                      }});
                    },
                    function(err) {
                      renameParams.res.json({'user_error': 'Uploading attachment failed',
                        'maintainer_error': 'Generating thumbnail for the card details view failed'});
                    }
                  );
                },
                function(err) {
                  renameParams.res.json({'user_error': 'Uploading attachment failed',
                    'maintainer_error': 'Generating thumbnail for the card view failed'});
                }
              );
            } else {
              easyimg.resize({
                src: fullPath,
                dst: thumbPath_act,
                width: 70,
                height: 42
              }).then(
              function(image) {
                renameParams.res.json({'attachment': {
                  'activityId': renameParams.activityId,
                  'uploaderId': renameParams.uploaderId,
                  'name': standardFilename,
                  'fileType': 'picture',
                  'size': renameParams.size,
                  'path': fullPath,
                  'cardDetailThumbPath': thumbPath_act
                }});
              },
              function(err) {
                renameParams.res.json({'user_error': 'Uploading attachment failed',
                  'maintainer_error': 'Generating thumbnail for the card details view failed'});
              }
            );
          }
        },
        function(err) {
          renameParams.res.json({'user_error': 'Uploading attachment failed',
            'maintainer_error': 'Reading image info failed'});
        }
      );
      } else {
        renameParams.res.json({'attachment': {
          'activityId': renameParams.activityId,
          'uploaderId': renameParams.uploaderId,
          'name': standardFilename,
          'size': renameParams.size,
          'path': fullPath
        }});
      }
    }
  });
}

// rote to upload attachments for card
exports.uploadFile = function(req, res) {
      var tmpPath = req.files.attachment.path;
      var targetPath = __dirname + '/../../public/attachments/' + req.params.activityId;
      var targetFilename = req._startTime.valueOf() + '-' + req.files.attachment.originalname;

      var renameParams = {
        'tmpPath': tmpPath,
        'targetPath': targetPath,
        'targetFilename': targetFilename,
        'activityId': req.params.activityId,
        'uploaderId': req.user.id,
        'size': req.files.attachment.size,
        'res': res
      };
      fs.exists(targetPath, function (isExist) {
        if (!isExist) {
          fs.mkdir(targetPath, function(err) {
            if (err) {
              res.json({'user_error': 'Uploading attachment failed',
                'maintainer_error': 'Making directory failed'});
            } else {
              fSRename(renameParams);
            }
          });
        } else {
          fSRename(renameParams);
        }
      });

    };