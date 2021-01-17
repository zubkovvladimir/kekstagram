'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var formUploadControl = picturesContainer.querySelector('#upload-file');

  var dataArray;

  var addID = window.util.addID;
  var download = window.backend.download;
  var renderError = window.popup.renderError;
  var onUploadButtonChange = window.edit.onUploadButtonChange;
  var addtListenersPicture = window.preview.addtListenersPicture;
  var create = window.picture.create;

  formUploadControl.addEventListener('change', onUploadButtonChange);

  // отрисовка дом элементов фотографий

  var appendPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(create(pictures[i]));
    }

    picturesContainer.appendChild(fragment);
  };

  // сохраняет данные

  var succesLoad = function (data) {
    window.gallery.data = data.slice();
    renderPictures(data);
  };

  // отрисовка фотографий

  var renderPictures = function (data) {
    addID(data);
    appendPictures(data);
    addtListenersPicture(data);
  };

  // удаление фотографий из контейнера

  var removePictures = function (data) {
    var elements = picturesContainer.querySelectorAll('.picture');
    elements.forEach(function (element) {
      picturesContainer.removeChild(element);
    });
  };

  // загрузка фотографий

  download(succesLoad, renderError);

  window.gallery = {
    data: dataArray,
    renderPictures: renderPictures,
    removePictures: removePictures
  };
})();


