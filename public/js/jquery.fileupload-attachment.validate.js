$.blueimp.fileupload.prototype.options.processQueue.push(
  { action: 'imageDimension' }
);

$.widget('blueimp.fileupload', $.blueimp.fileupload, {
  processActions: {
    imageDimension: function (data, options) {
      var dfd = $.Deferred();
      var file = data.files[data.index];
      var imageTypes = /(\.|\/)(gif|jpe?g|png)$/i;
      var image = new Image();
      image.onload = function() {
        if (this.width < 300 || this.height < 300) {
          file.error = 'Picture should be more than 300x300.';
        }
        // if (this.width > 8000 || this.height > 4500) {
          // if (file.error) {
          //   file.error += '\nPicture should be less than 8000x4500.';
          // } else {
            // file.error = 'Picture should be less than 8000x4500.';
          // }
        // }
        if (file.error) {
          data.files.error = true;
          dfd.rejectWith(this, [data]);
        } else {
          dfd.resolveWith(this, [data]);
        }
      };
      image.src = URL.createObjectURL(data.files[0]);

      return dfd.promise();
    }
  }
});