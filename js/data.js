'use strict';

(function () {
  var PICTURES_MAX_RANGE = 25;

  var LIKES_MIN_RANGE = 15;
  var LIKES_MAX_RANGE = 200;

  var COMMENTS_MIN_RANGE = 1;
  var COMMENTS_MAX_RANGE = 6;

  var getArrayOfUniqueNumbers = window.util.getArrayOfUniqueNumbers;
  var getRandomInt = window.util.getRandomInt;
  var MESSSGES = window.constant.MESSSGES;
  var NAMES = window.constant.NAMES;

  var getPicturesData = function (number) {
    var arrayOfUniqueNumbers = getArrayOfUniqueNumbers(number);
    var array = [];

    for (var i = 0; i < number; i++) {

      var picture = {
        id: arrayOfUniqueNumbers[i],
        url: 'photos/' + arrayOfUniqueNumbers[i] + '.jpg',
        description: 'Описание фото ' + getRandomInt(1, PICTURES_MAX_RANGE),
        likes: getRandomInt(LIKES_MIN_RANGE, LIKES_MAX_RANGE),
        comments: getCommentsData(getRandomInt(COMMENTS_MIN_RANGE, COMMENTS_MAX_RANGE))
      };

      array.push(picture);
    }

    return array;
  };

  var getCommentsData = function (number) {
    var commentArray = [];

    for (var i = 0; i <= number; i++) {
      var message = MESSSGES[getRandomInt(0, MESSSGES.length - 1)];
      var comment = {
        avatar: 'img/avatar-' + getRandomInt(COMMENTS_MIN_RANGE, COMMENTS_MAX_RANGE) + '.svg',
        message: message,
        name: NAMES[getRandomInt(0, NAMES.length - 1)]
      };

      commentArray.push(comment);
    }

    return commentArray;
  };

  window.data = {
    getPictures: getPicturesData
  };
})();
