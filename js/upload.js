'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var preview = document.querySelector('.img-upload__preview img');
  var previewEffect = document.querySelectorAll('.effects__preview');

  // загружает картинку в форму

  var сustomizePreview = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    // проверка формата файла

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    // добавляет адрес картинку в атрибуты тегов

    var onLoad = function () {
      preview.src = reader.result;
      previewEffect.forEach(function (element) {
        element.style.backgroundImage = 'url("' + reader.result + '")';
      });
    };

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', onLoad);

      reader.readAsDataURL(file);
    }
  };

  window.upload = {
    сustomizePreview: сustomizePreview
  };
})();
