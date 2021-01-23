'use strict';

(function () {
  var overlay = document.querySelector('.img-upload__overlay');
  var slider = overlay.querySelector('.img-upload__effect-level');
  var imgPreview = overlay.querySelector('.img-upload__preview').querySelector('img');

  var setDefaultDepth = window.slider.setDefaultDepth;

  // применяет эффекты для фото

  var onRadioButtonClick = function (evt) {
    var target = evt.target;

    var effectType = target.id.split('-')[1];
    var isEffect = target.id.split('-')[0] === 'effect';

    if (effectType === 'none') {
      removeFilter(imgPreview);
      slider.classList.add('hidden');
    } else if (isEffect) {
      removeFilter(imgPreview);

      slider.classList.remove('hidden');
      imgPreview.classList.add('effects__preview--' + effectType);

      setDefaultDepth();
    }
  };

  // удаляет класс эффекта на фото

  var removeClass = function (preview) {
    var classString = preview.classList.value;
    var classArray = classString.split(' ');

    for (var i = 0; i < classArray.length; i++) {
      var isEffect = classArray[i].match(/effects__preview--/);

      if (isEffect) {
        preview.classList.remove(classArray[i]);
      }
    }
  };

  // удаляет эффект на фото

  var removeFilter = function (preview) {
    preview.style.filter = '';
    removeClass(preview);
  };

  window.effect = {
    onRadioButtonClick: onRadioButtonClick,
    removeFilter: removeFilter
  };
})();
