'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // возвращает случайное число

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // возвращает массив случайных и уникальных чисел

  var getArrayOfUniqueNumbers = function (number) {
    var array = [];
    var randomNumber;

    while (array.length < number) {
      randomNumber = getRandomInt(1, number);

      if (array.indexOf(randomNumber) === -1) {
        array.push(randomNumber);
      }
    }

    return array;
  };

  // проверяет нажатие клавиши энтер

  var isEnterEvent = function (evt, action, picturesArray) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action(evt, picturesArray);
    }
  };

  // проверяет нажатие клавиши эскейп

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action(evt);
    }
  };

  // добавляет объекту свойство id

  var addID = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].id = i;
    }
  };

  window.util = {
    getRandomInt: getRandomInt,
    getArrayOfUniqueNumbers: getArrayOfUniqueNumbers,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    addID: addID
  };
})();
