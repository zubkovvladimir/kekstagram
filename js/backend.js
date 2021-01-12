'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';

  var upload = function (data, onSucces) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onLoad = function () {
      onSucces(xhr.response);
    };

    xhr.addEventListener('load', onLoad);

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
