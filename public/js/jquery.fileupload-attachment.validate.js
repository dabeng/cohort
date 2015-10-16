$.blueimp.fileupload.prototype.options.processQueue.push(
  { action: 'imageSize' },
  { action: 'imageDimension' },
  { action: 'videoSize' }
);

$.widget('blueimp.fileupload', $.blueimp.fileupload, {
  processActions: {
    imageSize: function (data, options) {
      var dfd = $.Deferred();
      var file = data.files[data.index];
      var imageTypes = /^image\/(gif|jpe?g|png)$/;
      if (imageTypes.test(file.type)) {
        var maxSize =  5*1024*1024;
        var minSize = 50*1024;
        if (file.size > maxSize) {
          file.error = 'Picture should be less than 5M';
          data.files.error = true;
          dfd.rejectWith(this, [data]);
        } else {
          dfd.resolveWith(this, [data]);
        }
      if (file.size < minSize) {
          file.error = 'Picture should be more than 50K';
          data.files.error = true;
          dfd.rejectWith(this, [data]);
        } else {
          dfd.resolveWith(this, [data]);
        }
      } else {
        dfd.resolveWith(this, [data]);
      }
      return dfd.promise();
    },
    imageDimension: function (data, options) {
      var dfd = $.Deferred();
      var file = data.files[data.index];
      var imageTypes = /^image\/(gif|jpe?g|png)$/;
      if (imageTypes.test(file.type)) {
        var image = new Image();
        image.onload = function() {
          if (this.width < 450 || this.height < 450) {
            file.error = 'Picture should be bigger than 450x450';
          }
          if (this.width > 8000 || this.height > 4500) {
            if (file.error) {
              file.error += '\nPicture should be bigger than 8000x4500';
            } else {
              file.error = 'Picture should be smaller than 8000x4500';
            }
          }
          if (file.error) {
            data.files.error = true;
            dfd.rejectWith(this, [data]);
          } else {
            dfd.resolveWith(this, [data]);
          }
        };
        image.src = URL.createObjectURL(data.files[0]);
      } else {
        dfd.resolveWith(this, [data]);
      }
      return dfd.promise();
    },
    videoSize: function (data, options) {
      var dfd = $.Deferred();
      var file = data.files[data.index];
      var videoTypes = /^video\/.*$/;
      if (videoTypes.test(file.type)) {
        var maxSize =  50*1024*1024;
        if (file.size > maxSize) {
          file.error = 'Video should be less than 50M';
          data.files.error = true;
          dfd.rejectWith(this, [data]);
        } else {
          dfd.resolveWith(this, [data]);
        }
      } else {
        dfd.resolveWith(this, [data]);
      }
      return dfd.promise();
    }
  }
});