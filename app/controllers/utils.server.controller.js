'use strict';

// sanitizing string to compatible url convension
exports.formatForUrl = function(str) {
  return str.replace(/_/g, '-')
    .replace(/ /g, '-')
    .replace(/:/g, '-')
    .replace(/\\/g, '-')
    .replace(/\//g, '-')
    .replace(/[^a-zA-Z0-9\-]+/g, '')
    .replace(/-{2,}/g, '-')
    .toLowerCase();
};

//get filename extension string
exports.getExtension = function(filename) {
  var i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
};