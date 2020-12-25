'use strict';

var PHOTOS_MAX_RANGE = 25;

var COMMENTS_MIN_RANGE = 1;
var COMMENTS_MAX_RANGE = 7;

var LIKES_MIN_RANGE = 15;
var LIKES_MAX_RANGE = 200;

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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getComment = function () {
  var message = getRandomInt(0, 1) ? MESSSGES[getRandomInt(0, MESSSGES.length - 1)] : MESSSGES[getRandomInt(0, MESSSGES.length - 1)] + ' ' + MESSSGES[getRandomInt(0, MESSSGES.length - 1)];

  var comment = {
    avatar: 'img/avatar-' + getRandomInt(0, PHOTOS_MAX_RANGE) + '.svg',
    message: message,
    name: NAMES[getRandomInt(0, NAMES.length - 1)]
  };

  return comment;
};

var getArray = function (number) {
  var array = [];

  for (var i = 0; i <= number; i++) {
    array.push(getComment());
  }

  return array;
};

var getPhotoItem = function () {
  var photo = {
    url: 'photos/' + getRandomInt(0, PHOTOS_MAX_RANGE) + '.jpg',
    description: 'Описание фото ' + getRandomInt(0, PHOTOS_MAX_RANGE),
    likes: getRandomInt(LIKES_MIN_RANGE, LIKES_MAX_RANGE),
    comments: getArray(getRandomInt(COMMENTS_MIN_RANGE, COMMENTS_MAX_RANGE))
  };

  return photo;
};
