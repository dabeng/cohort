$.blueimp.fileupload.prototype.options.processQueue.push(
  { action: 'imageSize' },
  { action: 'imageDimension' }
);

$.widget('blueimp.fileupload', $.blueimp.fileupload, {
  processActions: {
    imageSize: function (data, options) {
      var dfd = $.Deferred();
      var file = data.files[data.index];
      var imageTypes = /(\.|\/)(gif|jpe?g|png)$/i;
      if (imageTypes.test(file.type)) {
        var maxSize =  5*1024*1024;
        if (file.size > maxSize) {
          file.error = 'Picture should be less than 5M';
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
      var imageTypes = /(\.|\/)(gif|jpe?g|png)$/i;
      if (imageTypes.test(file.type)) {
        var image = new Image();
        image.onload = function() {
          if (this.width < 300 || this.height < 300) {
            file.error = 'Picture should be bigger than 300x300';
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
    }
  }
});