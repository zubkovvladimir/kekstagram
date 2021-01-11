'use strict';

(function () {
  var MIN_SCALE_PICTURE = 25;
  var MAX_SCALE_PICTURE = 100;
  var SCALE_STEP = 25;

  var ESC_KEYCODE = 27;

  var body = document.body;

  var form = document.querySelector('.img-upload__form');
  var overlay = form.querySelector('.img-upload__overlay');

  var scaleSmaller = overlay.querySelector('.scale__control--smaller');
  var scaleBigger = overlay.querySelector('.scale__control--bigger');

  var slider = overlay.querySelector('.img-upload__effect-level');
  var sliderPin = slider.querySelector('.effect-level__pin');

  var hashtagsInput = form.querySelector('.text__hashtags');
  var textarea = overlay.querySelector('.text__description');

  var submit = form.querySelector('.img-upload__submit');
  var buttonClose = form.querySelector('#upload-cancel');

  var imgPreview = overlay.querySelector('.img-upload__preview').querySelector('img');
  var effectsList = overlay.querySelector('.effects__list');

  var addListeners = function () {
    buttonClose.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onButtonKeydown);

    effectsList.addEventListener('click', window.effect.onRadioButtonClick);
    sliderPin.addEventListener('mousedown', window.slider.onPinMousedown);

    scaleSmaller.addEventListener('click', onScaleClick);
    scaleBigger.addEventListener('click', onScaleClick);

    hashtagsInput.addEventListener('input', window.validation.check);
    submit.addEventListener('submit', window.validation.check);
  };

  var removeListeners = function () {
    buttonClose.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onButtonKeydown);

    effectsList.removeEventListener('click', window.effect.onRadioButtonClick);
    sliderPin.addEventListener('mousedown', window.slider.onPinMousedown);

    scaleSmaller.removeEventListener('click', onScaleClick);
    scaleBigger.removeEventListener('click', onScaleClick);

    hashtagsInput.removeEventListener('input', window.validation.check);
    submit.removeEventListener('submit', window.validation.check);
  };

  var onUploadButtonChange = function () {
    overlay.classList.remove('hidden');
    slider.classList.add('hidden');
    body.classList.add('modal-open');

    addListeners();
  };

  var closeOverlay = function () {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');

    removeListeners();

    imgPreview.style.transform = '';
    window.effect.removeFilter(imgPreview);
  };

  var onScaleClick = function (evt) {
    var target = evt.target;
    var formScaleValue = overlay.querySelector('.scale__control--value');
    var numberValue = parseInt(formScaleValue.value.replace('%', ''), 10);

    var isSmaller = target.classList.contains('scale__control--smaller');
    var isBigger = target.classList.contains('scale__control--bigger');

    if (numberValue > MIN_SCALE_PICTURE && isSmaller) {

      formScaleValue.value = ((numberValue - SCALE_STEP) + '%');
      imgPreview.style.transform = 'scale(' + ((numberValue - SCALE_STEP) / 100) + ')';

    } else if (numberValue < MAX_SCALE_PICTURE && isBigger) {

      formScaleValue.value = ((numberValue + SCALE_STEP) + '%');
      imgPreview.style.transform = 'scale(' + ((numberValue + SCALE_STEP) / 100) + ')';

    }
  };

  var onCloseButtonClick = function () {
    closeOverlay();
  };

  var onButtonKeydown = function (evt) {
    var isEscNotActiveElement = evt.keyCode === ESC_KEYCODE
                             && hashtagsInput !== document.activeElement
                             && textarea !== document.activeElement;

    if (isEscNotActiveElement) {
      closeOverlay();
    }
  };

  window.edit = {
    onUploadButtonChange: onUploadButtonChange
  };
})();
