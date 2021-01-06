'use strict';

(function () {
  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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

  window.util = {
    getRandomInt: getRandomInt,
    getArrayOfUniqueNumbers: getArrayOfUniqueNumbers
  };
})();
