'use strict';

(function () {
  var DECIMAL = 10;

  var currentClass;

  var formOverlay = document.querySelector('.img-upload__overlay');
  var formImgSlider = formOverlay.querySelector('.img-upload__effect-level');
  var formImgSliderPin = formImgSlider.querySelector('.effect-level__pin');
  var formEffectsList = formOverlay.querySelector('.effects__list');
  var formImgPreview = formOverlay.querySelector('.img-upload__preview').querySelector('img');
  var formImgSliderLine = formOverlay.querySelector('.effect-level__line');
  var formImgSliderInput = formOverlay.querySelector('.effect-level__value');

  var onRadioButtonClick = function (evt) {
    var target = evt.target;

    for (var i = 0; i < window.constant.EFFECTS.length; i++) {
      var input = formEffectsList.querySelector('#effect-' + window.constant.EFFECTS[i]);
      var isItem = target.contains(input);

      if (isItem) {
        if (window.constant.EFFECTS[i] === 'none') {
          formImgPreview.classList.remove(currentClass);
          formImgPreview.style.filter = '';
          formImgSlider.classList.add('hidden');
          return;
        }
        formImgPreview.style.filter = '';
        formImgPreview.classList.remove(currentClass);
        formImgSlider.classList.remove('hidden');

        formImgPreview.classList.add('effects__preview--' + window.constant.EFFECTS[i]);
        currentClass = 'effects__preview--' + window.constant.EFFECTS[i];
      }
    }
  };

  var onPinMouseup = function () {
    var pinPosition = getComputedStyle(formImgSliderPin).getPropertyValue('left');
    var roundPinPosition = parseInt(pinPosition.split('.')[0], 10);

    var lineWidth = getComputedStyle(formImgSliderLine).getPropertyValue('width');
    var roundLineWidth = parseInt(lineWidth.split('.')[0], 10);

    var proportion = Math.round(roundPinPosition / roundLineWidth * 100);

    formImgSliderInput.value = proportion;

    switch (currentClass) {
      case 'effects__preview--chrome':
        formImgPreview.style.filter = 'grayscale(' + proportion / 100 + ')';
        break;
      case 'effects__preview--sepia':
        formImgPreview.style.filter = 'sepia(' + proportion / 100 + ')';
        break;
      case 'effects__preview--marvin':
        formImgPreview.style.filter = 'invert(' + proportion + '%)';
        break;
      case 'effects__preview--phobos':
        formImgPreview.style.filter = 'blur(' + proportion / DECIMAL + 'px)';
        break;
      case 'effects__preview--heat':
        formImgPreview.style.filter = 'brightness(' + proportion + '%)';
        break;
    }
  };

  var removeClass = function (imgPreview) {
    for (var i = 0; i < window.constant.EFFECTS.length; i++) {
      var current = 'effects__preview--' + window.constant.EFFECTS[i];
      var isCurrent = imgPreview.classList.contains(current);

      if (isCurrent) {
        imgPreview.classList.remove(current);
      }
    }
  };

  window.effect = {
    onRadioButtonClick: onRadioButtonClick,
    onPinMouseup: onPinMouseup,
    removeClass: removeClass
  };
})();
