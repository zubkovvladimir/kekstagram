'use strict';

(function () {
  var PICTURES_MAX_RANGE = 25;

  var LIKES_MIN_RANGE = 15;
  var LIKES_MAX_RANGE = 200;

  var COMMENTS_MIN_RANGE = 1;
  var COMMENTS_MAX_RANGE = 6;

  var MESSSGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var NAMES = [
    'Виктор',
    'Евгений',
    'Василий',
    'Алексей',
    'Алевтина',
    'Александра',
    'Алина',
  ];

  var getArrayOfUniqueNumbers = window.util.getArrayOfUniqueNumbers;
  var getRandomInt = window.util.getRandomInt;

  // создает моки фотографий

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

  // создает моки комментариев

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
