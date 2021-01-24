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

  var getArrayOfUniqueNumbers = function (range, amount) {
    var numbers = [];
    var randomNumber;

    while (numbers.length < amount) {
      randomNumber = getRandomInt(1, range);

      if (numbers.indexOf(randomNumber) === -1) {
        numbers.push(randomNumber);
      }
    }

    return numbers;
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

  // удаление элементов из контейнера

  var removeElements = function (сontainer) {
    var elements = сontainer.querySelectorAll('.picture');
    elements.forEach(function (element) {
      сontainer.removeChild(element);
    });
  };

  window.util = {
    getRandomInt: getRandomInt,
    getArrayOfUniqueNumbers: getArrayOfUniqueNumbers,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    addID: addID,
    removeElements: removeElements
  };
})();
