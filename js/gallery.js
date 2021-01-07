'use strict';

(function () {
  var PICTURES_MAX_RANGE = 25;

  var form = document.querySelector('.img-upload__form');
  var formUploadControl = form.querySelector('#upload-file');
  var picturesArray = window.data.getPictures(PICTURES_MAX_RANGE);

  formUploadControl.addEventListener('change', window.edit.onUploadButtonChange);

  window.picture.render(picturesArray);

  window.preview.addtListenersPicture(picturesArray);
})();


