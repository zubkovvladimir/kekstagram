'use strict';

var PHOTOS_MAX_RANGE = 25;

var COMMENTS_MIN_RANGE = 1;
var COMMENTS_MAX_RANGE = 6;

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

var getCommentArray = function (number) {
  var commentArray = [];

  for (var i = 0; i <= number; i++) {
    var message = getRandomInt(0, 1) ?
      MESSSGES[getRandomInt(0, MESSSGES.length - 1)] :
      MESSSGES[getRandomInt(0, MESSSGES.length - 1)] + ' ' + MESSSGES[getRandomInt(0, MESSSGES.length - 1)];

    var comment = {
      avatar: 'img/avatar-' + getRandomInt(COMMENTS_MIN_RANGE, COMMENTS_MAX_RANGE) + '.svg',
      message: message,
      name: NAMES[getRandomInt(0, NAMES.length)]
    };

    commentArray.push(comment);
  }

  return commentArray;
};

var getPhotosArray = function (number) {
  var arrayOfUniqueNumbers = getArrayOfUniqueNumbers(number);
  var array = [];

  for (var i = 0; i < number; i++) {

    var photo = {
      url: 'photos/' + arrayOfUniqueNumbers[i] + '.jpg',
      description: 'Описание фото ' + getRandomInt(1, PHOTOS_MAX_RANGE),
      likes: getRandomInt(LIKES_MIN_RANGE, LIKES_MAX_RANGE),
      comments: getCommentArray(getRandomInt(COMMENTS_MIN_RANGE, COMMENTS_MAX_RANGE))
    };

    array.push(photo);
  }

  return array;
};

var createPhoto = function (photo) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
};

var renderPhotos = function () {
  var photosContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var photosArray = getPhotosArray(PHOTOS_MAX_RANGE);

  for (var i = 0; i < photosArray.length; i++) {
    fragment.appendChild(createPhoto(photosArray[i]));
  }

  photosContainer.appendChild(fragment);
};

renderPhotos();
