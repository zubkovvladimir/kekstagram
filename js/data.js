'use strict';

(function () {
  var PICTURES_MAX_RANGE = 25;

  var LIKES_MIN_RANGE = 15;
  var LIKES_MAX_RANGE = 200;

  var COMMENTS_MIN_RANGE = 1;
  var COMMENTS_MAX_RANGE = 6;

  var getPicturesData = function (number) {
    var arrayOfUniqueNumbers = window.util.getArrayOfUniqueNumbers(number);
    var array = [];

    for (var i = 0; i < number; i++) {

      var picture = {
        id: arrayOfUniqueNumbers[i],
        url: 'photos/' + arrayOfUniqueNumbers[i] + '.jpg',
        description: 'Описание фото ' + window.util.getRandomInt(1, PICTURES_MAX_RANGE),
        likes: window.util.getRandomInt(LIKES_MIN_RANGE, LIKES_MAX_RANGE),
        comments: getCommentsData(window.util.getRandomInt(COMMENTS_MIN_RANGE, COMMENTS_MAX_RANGE))
      };

      array.push(picture);
    }

    return array;
  };

  var getCommentsData = function (number) {
    var commentArray = [];

    for (var i = 0; i <= number; i++) {
      var message = window.constant.MESSSGES[window.util.getRandomInt(0, window.constant.MESSSGES.length - 1)];
      var comment = {
        avatar: 'img/avatar-' + window.util.getRandomInt(COMMENTS_MIN_RANGE, COMMENTS_MAX_RANGE) + '.svg',
        message: message,
        name: window.constant.NAMES[window.util.getRandomInt(0, window.constant.NAMES.length - 1)]
      };

      commentArray.push(comment);
    }

    return commentArray;
  };

  window.data = {
    getPictures: getPicturesData
  };
})();
