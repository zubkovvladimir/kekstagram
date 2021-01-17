'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var formUploadControl = picturesContainer.querySelector('#upload-file');

  var dataArray;

  var show = window.filter.show;
  var addID = window.util.addID;
  var download = window.backend.download;
  var renderError = window.popup.renderError;
  var onUploadButtonChange = window.edit.onUploadButtonChange;
  var addtListenersPicture = window.preview.addtListenersPicture;
  var getFragment = window.picture.getFragment;

  formUploadControl.addEventListener('change', onUploadButtonChange);

  // отрисовка фотографий

  var renderPictures = function (data) {
    window.gallery.data = data.slice();
    addID(data);
    picturesContainer.appendChild(getFragment(data));
    addtListenersPicture(data);
    show();
  };

  // загрузка фотографий

  download(renderPictures, renderError);

  window.gallery = {
    data: dataArray
  };
})();


