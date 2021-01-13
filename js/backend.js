'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';

  var upload = function (data, onSucces, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onLoad = function () {
      switch (xhr.status) {
        case 200:
          onSucces(xhr.response);
          break;
      }
    };

    xhr.addEventListener('load', onLoad);
    // xhr.addEventListener('error', function () {
    //   onError('Произошла ошибка соединения');
    // });
    // xhr.addEventListener('timeout', function () {
    //   onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    // });

    xhr.timeout = 1000;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var load = function (onSucces, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onLoad = function () {
      onSucces(xhr.response);
    };

    xhr.addEventListener('load', onLoad);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
