'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';

  var createRequest = function (onSucces, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onLoad = function () {
      switch (xhr.status) {
        case 200:
          onSucces(xhr.response);
          break;
        case 400:
          onError('Ошибка ' + xhr.status + ': Неверный запрос', 'закрыть');
          break;
        case 403:
          onError('Ошибка ' + xhr.status + ': Доступ запрещен', 'закрыть');
          break;
        case 404:
          onError('Ошибка ' + xhr.status + ': Ничего не найдено', 'закрыть');
          break;
        case 500:
          onError('Ошибка ' + xhr.status + ': Ошибка сервера', 'закрыть');
          break;
        case 502:
          onError('Ошибка ' + xhr.status + ': Неверный ответ сервера', 'закрыть');
          break;
        case 503:
          onError('Ошибка ' + xhr.status + ': Сервер временно недоступен', 'закрыть');
          break;
        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', 'закрыть');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  var upload = function (data, onSucces, onError) {
    var xhr = createRequest(onSucces, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var load = function (onSucces, onError) {
    var xhr = createRequest(onSucces, onError);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
