'use strict';

(function () {
  var formUploadControl = document.querySelector('#upload-file');
  var picturesContainer = document.querySelector('.pictures');

  var isEnterEvent = window.util.isEnterEvent;
  var addID = window.util.addID;
  var render = window.picture.render;
  var show = window.preview.show;
  var download = window.backend.download;
  var renderError = window.popup.renderError;
  var onUploadButtonChange = window.edit.onUploadButtonChange;

  formUploadControl.addEventListener('change', onUploadButtonChange);

  // добавит обработчики фотографий

  var addtListenersPicture = function (picturesArray) {
    var onPictureClick = function (evt) {
      show(evt, picturesArray);
    };

    var onPictureEnterKeydown = function (evt) {
      isEnterEvent(evt, show, picturesArray);
    };

    picturesContainer.addEventListener('click', onPictureClick);
    picturesContainer.addEventListener('keydown', onPictureEnterKeydown);
  };

  // отрисовка фотографий

  var renderPictures = function (data) {
    addID(data);
    render(data);
    addtListenersPicture(data);
  };

  // загрузка фотографий

  download(renderPictures, renderError);
})();


