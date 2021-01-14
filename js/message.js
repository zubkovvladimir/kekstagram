'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  var renderSuccessMessage = function () {
    var successElement = successMessage.cloneNode(true);
    main.appendChild(successElement);

    document.addEventListener('keydown', onButtonKeydown);
    successElement.addEventListener('click', onOverlayClick);
  };

  var renderErrorMessage = function (message, buttonText) {
    var errorElement = errorMessage.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = message;
    errorElement.querySelector('.error__button').textContent = buttonText;
    main.appendChild(errorElement);

    document.addEventListener('keydown', onButtonKeydown);
    errorElement.addEventListener('click', onOverlayClick);
  };

  var closeMessage = function (evt) {
    var messageElement;
    var success = document.querySelector('.success');
    var error = document.querySelector('.error');

    var isEscape = evt.keyCode === ESC_KEYCODE;
    var isSucces = success && !error || success && !error && isEscape;
    var isError = error && !success || error && !success && isEscape;

    if (isSucces) {
      messageElement = success;
    } else if (isError) {
      messageElement = error;
    }

    document.removeEventListener('keydown', onButtonKeydown);
    messageElement.removeEventListener('click', onOverlayClick);

    main.removeChild(messageElement);
  };

  var onOverlayClick = function (evt) {
    closeMessage(evt);
  };

  var onButtonKeydown = function (evt) {
    window.util.isEscEvent(evt, closeMessage);
  };

  window.message = {
    renderSuccess: renderSuccessMessage,
    renderError: renderErrorMessage
  };
})();
