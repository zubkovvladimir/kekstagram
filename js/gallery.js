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
  var сustomPreview = window.avatar.сustomPreview;

  formUploadControl.addEventListener('change', function (evt) {
    render(evt);
    сustomPreview(evt);
  });

  // var onUploadButtonChange = ;

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


