'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var main = document.querySelector('main');
  var successPopup = document.querySelector('#success').content.querySelector('.success');
  var errorPopup = document.querySelector('#error').content.querySelector('.error');

  var isEscEvent = window.util.isEscEvent;

  // отрисует попап о успешной загрузки фото

  var renderSuccessPopup = function () {
    var successElement = successPopup.cloneNode(true);
    main.appendChild(successElement);

    document.addEventListener('keydown', onButtonKeydown);
    successElement.addEventListener('click', onOverlayClick);
  };

  // отрисует попап о не успешной загрузки фото

  var renderErrorPopup = function (popup, buttonText) {
    var errorElement = errorPopup.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = popup;
    errorElement.querySelector('.error__button').textContent = buttonText;
    main.appendChild(errorElement);

    document.addEventListener('keydown', onButtonKeydown);
    errorElement.addEventListener('click', onOverlayClick);
  };

  // скроет попап

  var closePopup = function (evt) {
    var popupElement;
    var success = document.querySelector('.success');
    var error = document.querySelector('.error');

    var isEscape = evt.keyCode === ESC_KEYCODE;
    var isSucces = success && !error || success && !error && isEscape;
    var isError = error && !success || error && !success && isEscape;

    if (isSucces) {
      popupElement = success;
    } else if (isError) {
      popupElement = error;
    }

    document.removeEventListener('keydown', onButtonKeydown);
    popupElement.removeEventListener('click', onOverlayClick);

    main.removeChild(popupElement);
  };

  // обработчик клика на попап

  var onOverlayClick = function (evt) {
    closePopup(evt);
  };

  // обработчик клавиши эскейп на попапе

  var onButtonKeydown = function (evt) {
    isEscEvent(evt, closePopup);
  };

  window.popup = {
    renderSuccess: renderSuccessPopup,
    renderError: renderErrorPopup
  };
})();
