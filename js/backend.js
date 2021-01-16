'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';
  var BUTTON_TEXT = 'закрыть';
  var TIMEOUT = 10000;
  var CONNECTION = 'Произошла ошибка соединения';
  var TIMEOUT_TEXT = 'Запрос не успел выполниться за ';

  var errorMap = {
    400: 'Неверный запрос',
    403: 'Доступ запрещен',
    404: 'Ничего не найдено',
    500: 'Ошибка сервера',
    502: 'Неверный ответ сервера',
    503: 'Сервер временно недоступен'
  };

  // создает запрос

  var createRequest = function (onSucces, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onLoad = function () {
      if (xhr.status === 200) {
        onSucces(xhr.response);
      } else if (errorMap[xhr.status]) {
        onError('Ошибка ' + xhr.status + ': ' + errorMap[xhr.status], BUTTON_TEXT);
      } else {
        onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', function () {
      onError(CONNECTION, BUTTON_TEXT);
    });
    xhr.addEventListener('timeout', function () {
      onError(TIMEOUT_TEXT + xhr.timeout + 'мс', BUTTON_TEXT);
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  //  отправка данных

  var upload = function (data, onSucces, onError) {
    var xhr = createRequest(onSucces, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  // получение данных

  var download = function (onSucces, onError) {
    var xhr = createRequest(onSucces, onError);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  window.backend = {
    upload: upload,
    download: download
  };
})();
