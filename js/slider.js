'use strict';

(function () {
  var DEFAULT_LEVEL = 100;
  var BLUR_MAX = 3;
  var BRIGHTNESS_MAX = 3;
  var BRIGHTNESS_MIN = 1;

  var overlay = document.querySelector('.img-upload__overlay');
  var levelLine = overlay.querySelector('.effect-level__line');
  var sliderPin = levelLine.querySelector('.effect-level__pin');
  var sliderDepth = levelLine.querySelector('.effect-level__depth');
  var imgPreview = overlay.querySelector('.img-upload__preview').querySelector('img');
  var sliderInput = overlay.querySelector('.effect-level__value');

  var setDefaultDepth = function () {
    sliderInput.value = DEFAULT_LEVEL;
    sliderPin.style.left = DEFAULT_LEVEL + '%';
    sliderDepth.style.width = DEFAULT_LEVEL + '%';
  };

  var setEffectDepth = function (depth) {
    var depthProportion = (depth / 100);
    var valueBrightness = depthProportion * (BRIGHTNESS_MAX - BRIGHTNESS_MIN) + 1;

    switch (imgPreview.classList.value) {
      case 'effects__preview--chrome':
        imgPreview.style.filter = 'grayscale(' + depthProportion + ')';
        break;
      case 'effects__preview--sepia':
        imgPreview.style.filter = 'sepia(' + depthProportion + ')';
        break;
      case 'effects__preview--marvin':
        imgPreview.style.filter = 'invert(' + depth + '%)';
        break;
      case 'effects__preview--phobos':
        imgPreview.style.filter = 'blur(' + (depthProportion * BLUR_MAX) + 'px)';
        break;
      case 'effects__preview--heat':
        imgPreview.style.filter = 'brightness(' + valueBrightness + ')';
        break;
      default:
        imgPreview.style.filter = '';
    }
  };

  var onPinMousedown = function (evt) {
    evt.preventDefault();

    var levelLineWidth = levelLine.offsetWidth;
    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordX - moveEvt.clientX;
      var pinCoord = sliderPin.offsetLeft - shift;

      startCoordX = moveEvt.clientX;

      if (!(pinCoord < 0 || pinCoord > levelLineWidth)) {
        var pinCoordProportion = Math.round((pinCoord / levelLineWidth) * 100);

        sliderInput.value = pinCoordProportion;
        sliderPin.style.left = pinCoordProportion + '%';
        sliderDepth.style.width = pinCoordProportion + '%';
        setEffectDepth(sliderInput.value);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.slider = {
    setDefaultDepth: setDefaultDepth,
    onPinMousedown: onPinMousedown
  };
})();
