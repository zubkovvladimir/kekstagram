'use strict';

(function () {
  var MIN_SCALE_PICTURE = 25;
  var MAX_SCALE_PICTURE = 100;
  var SCALE_STEP = 25;

  var ESC_KEYCODE = 27;

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var body = document.body;

  var form = document.querySelector('.img-upload__form');
  var overlay = form.querySelector('.img-upload__overlay');

  var scaleSmaller = overlay.querySelector('.scale__control--smaller');
  var scaleBigger = overlay.querySelector('.scale__control--bigger');

  var slider = overlay.querySelector('.img-upload__effect-level');
  var sliderPin = slider.querySelector('.effect-level__pin');

  var hashtagsInput = form.querySelector('.text__hashtags');
  var textarea = overlay.querySelector('.text__description');

  var buttonClose = form.querySelector('#upload-cancel');
  var imgPreview = overlay.querySelector('.img-upload__preview').querySelector('img');
  var effectsList = overlay.querySelector('.effects__list');

  var preview = document.querySelector('.img-upload__preview img');
  var previewEffect = document.querySelectorAll('.effects__preview');

  var onRadioButtonClick = window.effect.onRadioButtonClick;
  var onPinMousedown = window.slider.onPinMousedown;
  var onTextHashtagsInput = window.validation.onTextHashtagsInput;
  var removeFilter = window.effect.removeFilter;
  var upload = window.backend.upload;
  var renderSuccess = window.popup.renderSuccess;
  var renderError = window.popup.renderError;

  // добавит все обработчики формы

  var addListeners = function () {
    buttonClose.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onButtonKeydown);

    effectsList.addEventListener('click', onRadioButtonClick);
    sliderPin.addEventListener('mousedown', onPinMousedown);

    scaleSmaller.addEventListener('click', onScaleClick);
    scaleBigger.addEventListener('click', onScaleClick);

    hashtagsInput.addEventListener('input', onTextHashtagsInput);
    form.addEventListener('submit', onFormSubmit);
  };

  // удалит все обработчики формы

  var removeListeners = function () {
    buttonClose.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onButtonKeydown);

    effectsList.removeEventListener('click', onRadioButtonClick);
    sliderPin.addEventListener('mousedown', onPinMousedown);

    scaleSmaller.removeEventListener('click', onScaleClick);
    scaleBigger.removeEventListener('click', onScaleClick);

    hashtagsInput.removeEventListener('input', onTextHashtagsInput);
    form.removeEventListener('submit', onFormSubmit);
  };

  var onControlChange = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

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

  // отобразит форму редактирования

  var onUploadButtonChange = function () {
    overlay.classList.remove('hidden');
    slider.classList.add('hidden');
    body.classList.add('modal-open');

    addListeners();
    onControlChange();
  };

  // изменяет масштаб фото

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

  // скрывает форму редактирования

  var closeOverlay = function () {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');

    removeListeners();

    imgPreview.style.transform = '';
    removeFilter(imgPreview);
    form.reset();
  };

  // обработчик клика кнопки закрытия формы

  var onCloseButtonClick = function () {
    closeOverlay();
  };

  // обработчик клавиши эскейп, кнопки закрытия формы, вне элементов в фокусе

  var onButtonKeydown = function (evt) {
    var isEscNotActiveElement = evt.keyCode === ESC_KEYCODE
                             && hashtagsInput !== document.activeElement
                             && textarea !== document.activeElement;

    if (isEscNotActiveElement) {
      closeOverlay();
    }
  };

  // отправка данных формы на сервер

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    upload(new FormData(form), renderSuccess, renderError);
    closeOverlay();
  };

  window.form = {
    onUploadButtonChange: onUploadButtonChange
  };
})();
