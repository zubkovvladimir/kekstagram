'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var formUploadControl = picturesContainer.querySelector('#upload-file');

  var dataArray;

  var show = window.filter.show;
  var addID = window.util.addID;
  var download = window.backend.download;
  var renderError = window.popup.renderError;
  var render = window.form.render;
  var addtListenersPicture = window.preview.addtListenersPicture;
  var getFragment = window.picture.getFragment;
  var сustomizePreview = window.upload.сustomizePreview;

  // отображение формы редктирования фото

  var onUploadButtonChange = function (evt) {
    render(evt);
    сustomizePreview(evt);
  };

  // отрисовка фотографий

  var initializationPage = function (data) {
    addID(data);
    window.gallery.data = data.slice();
    picturesContainer.appendChild(getFragment(data));
    addtListenersPicture(data);
    show();
    formUploadControl.addEventListener('change', onUploadButtonChange);
  };

  // загрузка фотографий

  download(initializationPage, renderError);

  window.gallery = {
    data: dataArray
  };
})();


