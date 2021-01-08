'use strict';

(function () {
  var DECIMAL = 10;

  var currentClass;

  var overlay = document.querySelector('.img-upload__overlay');
  var levelLine = overlay.querySelector('.effect-level__line');
  var sliderPin = levelLine.querySelector('.effect-level__pin');
  var sliderImg = overlay.querySelector('.img-upload__effect-level');
  var effectsList = overlay.querySelector('.effects__list');
  var imgPreview = overlay.querySelector('.img-upload__preview').querySelector('img');
  var sliderInput = overlay.querySelector('.effect-level__value');

  var onRadioButtonClick = function (evt) {
    var target = evt.target;

    for (var i = 0; i < window.constant.EFFECTS.length; i++) {
      var input = effectsList.querySelector('#effect-' + window.constant.EFFECTS[i]);
      var isItem = target.contains(input);

      if (isItem) {
        if (window.constant.EFFECTS[i] === 'none') {
          imgPreview.classList.remove(currentClass);
          imgPreview.style.filter = '';
          sliderImg.classList.add('hidden');
          return;
        }
        imgPreview.style.filter = '';
        imgPreview.classList.remove(currentClass);
        sliderImg.classList.remove('hidden');

        imgPreview.classList.add('effects__preview--' + window.constant.EFFECTS[i]);
        currentClass = 'effects__preview--' + window.constant.EFFECTS[i];
      }
    }
  };

  var onPinMouseup = function () {
    var pinPosition = getComputedStyle(sliderPin).getPropertyValue('left');
    var roundPinPosition = parseInt(pinPosition.split('.')[0], 10);

    var lineWidth = getComputedStyle(levelLine).getPropertyValue('width');
    var roundLineWidth = parseInt(lineWidth.split('.')[0], 10);

    var proportion = Math.round(roundPinPosition / roundLineWidth * 100);

    sliderInput.value = proportion;

    switch (currentClass) {
      case 'effects__preview--chrome':
        imgPreview.style.filter = 'grayscale(' + proportion / 100 + ')';
        break;
      case 'effects__preview--sepia':
        imgPreview.style.filter = 'sepia(' + proportion / 100 + ')';
        break;
      case 'effects__preview--marvin':
        imgPreview.style.filter = 'invert(' + proportion + '%)';
        break;
      case 'effects__preview--phobos':
        imgPreview.style.filter = 'blur(' + proportion / DECIMAL + 'px)';
        break;
      case 'effects__preview--heat':
        imgPreview.style.filter = 'brightness(' + proportion + '%)';
        break;
    }
  };

  var removeClass = function (preview) {
    for (var i = 0; i < window.constant.EFFECTS.length; i++) {
      var current = 'effects__preview--' + window.constant.EFFECTS[i];
      var isCurrent = preview.classList.contains(current);

      if (isCurrent) {
        preview.classList.remove(current);
      }
    }
  };

  window.effect = {
    onRadioButtonClick: onRadioButtonClick,
    onPinMouseup: onPinMouseup,
    removeClass: removeClass
  };
})();
