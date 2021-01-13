'use strict';

(function () {
  var formUploadControl = document.querySelector('#upload-file');

  formUploadControl.addEventListener('change', window.edit.onUploadButtonChange);

  var renderPictures = function (data) {
    window.util.addID(data);
    window.picture.render(data);
    window.preview.addtListenersPicture(data);
  };

  window.backend.load(renderPictures);
})();


