'use strict';

var oldStyle;

var PHOTOS_MAX_RANGE = 25;

var COMMENTS_MIN_RANGE = 1;
var COMMENTS_MAX_RANGE = 6;

var LIKES_MIN_RANGE = 15;
var LIKES_MAX_RANGE = 200;

var COMMENT_AVATARR_WIDTH_HEIGHT = 35;

var ENTER_KEY = 'Enter';
var ESCAPE_KEY = 'Escape';

var body = document.body;
var photosContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var form = photosContainer.querySelector('.img-upload__form');
var formUploadControl = form.querySelector('#upload-file');
var formOverlay = form.querySelector('.img-upload__overlay');
var formbuttonCloseOverlay = form.querySelector('#upload-cancel');
var formUploadInput = form.querySelector('#upload-file');
var formEffectsList = formOverlay.querySelector('.effects__list');
var formImgSlider = formOverlay.querySelector('.img-upload__effect-level');
var formImgSliderLine = formImgSlider.querySelector('.effect-level__line');
var formImgSliderInput = formImgSlider.querySelector('.effect-level__value');
var formImgSliderPin = formImgSlider.querySelector('.effect-level__pin');
var formImgPreview = formOverlay.querySelector('.img-upload__preview').querySelector('img');

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
var bigPictureSocialLoader = bigPictureSocial.querySelector('.comments-loader');
var bigPictureCommentsCount = bigPictureSocial.querySelector('.comments-count');
var bigPictureSocialCaption = bigPictureSocial.querySelector('.social__caption');
var bigPictureSocialLikes = bigPictureSocial.querySelector('.likes-count');
var bigPictureSocialCommentsCount = bigPictureSocial.querySelector('.social__comment-count');
var bigPictureSocialCommentsContainer = bigPictureSocial.querySelector('.social__comments');

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

var EFFECTS = [
  'none',
  'chrome',
  'sepia',
  'marvin',
  'phobos',
  'heat'
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
      name: NAMES[getRandomInt(0, NAMES.length - 1)]
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

var photosArray = getPhotosArray(PHOTOS_MAX_RANGE);

var createPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
};

var renderPhotos = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhoto(photos[i]));
  }

  photosContainer.appendChild(fragment);
};

var displayFullPhoto = function (photo) {
  bigPictureImg.src = photo[0].url;
  bigPictureCommentsCount.textContent = photo[0].comments.length;
  bigPictureSocialCaption.textContent = photo[0].description;
  bigPictureSocialLikes.textContent = photo[0].likes;

  bigPictureSocialCommentsContainer.textContent = '';
  bigPictureSocialCommentsContainer.appendChild(renderComments(photo[0].comments));

  bigPictureSocialCommentsCount.classList.add('hidden');
  bigPictureSocialLoader.classList.add('hidden');
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

var createComment = function (comments) {
  var listItem = document.createElement('li');
  var image = document.createElement('img');
  var paragraph = document.createElement('p');

  listItem.classList.add('social__comment');
  image.classList.add('social__picture');
  paragraph.classList.add('social__text');

  listItem.appendChild(image);
  listItem.appendChild(paragraph);

  image.src = comments.avatar;
  image.alt = comments.name;
  image.width = COMMENT_AVATARR_WIDTH_HEIGHT;
  image.height = COMMENT_AVATARR_WIDTH_HEIGHT;
  paragraph.textContent = comments.message;

  return listItem;
};

var renderComments = function (comments) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(createComment(comments[i]));
  }

  return fragment;
};

var onUploadPhoto = function () {
  formOverlay.classList.remove('hidden');
  formImgSlider.classList.add('hidden');
  formImgPreview.classList.remove(oldStyle);

  formbuttonCloseOverlay.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onButtonKeydown);
  formEffectsList.addEventListener('click', onRadioButtonClick);
  formImgSliderPin.addEventListener('mouseup', onPinKeydown);
};

var closeOverlay = function () {
  formOverlay.classList.add('hidden');

  formbuttonCloseOverlay.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onButtonKeydown);
  formImgSliderPin.removeEventListener('mouseup', onPinKeydown);
  formUploadInput.value = '';
  formImgPreview.style.filter = '';
  formImgPreview.classList.remove(oldStyle);
};

var onCloseButtonClick = function () {
  closeOverlay();
};

var onButtonKeydown = function (evt) {
  if (evt.key === ESCAPE_KEY) {
    closeOverlay();
  }
};

var onRadioButtonClick = function (evt) {
  for (var i = 0; i < EFFECTS.length; i++) {
    var isLabel = (evt.target.className === 'effects__label'
                  && evt.target.previousElementSibling.id === 'effect-' + EFFECTS[i]);
    var isSpan = (evt.target.className === 'effects__preview  effects__preview--' + EFFECTS[i]);

    if (isLabel || isSpan) {
      if (EFFECTS[i] === 'none') {
        formImgPreview.classList.remove(oldStyle);
        formImgPreview.style.filter = '';
        formImgSlider.classList.add('hidden');
        return;
      }
      formImgPreview.style.filter = '';
      formImgPreview.classList.remove(oldStyle);
      formImgSlider.classList.remove('hidden');

      formImgPreview.classList.add('effects__preview--' + EFFECTS[i]);
      oldStyle = 'effects__preview--' + EFFECTS[i];
    }
  }
};

var onPinKeydown = function () {
  var pinPosition = getComputedStyle(formImgSliderPin).getPropertyValue('left');
  var roundPinPosition = pinPosition.split('.')[0];
  var lineWidth = getComputedStyle(formImgSliderLine).getPropertyValue('width');
  var roundLineWidth = lineWidth.split('.')[0];
  var proportion = Math.round(roundPinPosition / roundLineWidth * 100);

  formImgSliderInput.value = proportion;

  switch (oldStyle) {
    case 'effects__preview--chrome':
      formImgPreview.style.filter = 'grayscale(' + proportion / 100 + ')';
      formImgPreview.style.webkitFilter = 'grayscale(' + proportion / 100 + ')';
      break;
    case 'effects__preview--sepia':
      formImgPreview.style.filter = 'sepia(' + proportion / 100 + ')';
      formImgPreview.style.webkitFilter = 'sepia(' + proportion / 100 + ')';
      break;
    case 'effects__preview--marvin':
      formImgPreview.style.filter = 'invert(' + proportion + '%)';
      formImgPreview.style.webkitFilter = 'invert(' + proportion + '%)';
      break;
    case 'effects__preview--phobos':
      formImgPreview.style.filter = 'blur(' + proportion / 10 + 'px)';
      formImgPreview.style.webkitFilter = 'blur(' + proportion / 10 + 'px)';
      break;
    case 'effects__preview--heat':
      formImgPreview.style.filter = 'brightness(' + proportion + '%)';
      formImgPreview.style.webkitFilter = 'brightness(' + proportion + '%)';
      break;
  }
};

formUploadControl.addEventListener('change', onUploadPhoto);

renderPhotos(photosArray);


