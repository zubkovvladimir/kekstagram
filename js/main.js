'use strict';

var oldStyle;

var PHOTOS_MAX_RANGE = 25;

var COMMENTS_MIN_RANGE = 1;
var COMMENTS_MAX_RANGE = 6;

var LIKES_MIN_RANGE = 15;
var LIKES_MAX_RANGE = 200;

var COMMENT_AVATARR_WIDTH_HEIGHT = 35;

var ESCAPE_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var body = document.body;
var photosContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var form = photosContainer.querySelector('.img-upload__form');
var formUploadControl = form.querySelector('#upload-file');
var formUploadHashtags = form.querySelector('.text__hashtags');
var formOverlay = form.querySelector('.img-upload__overlay');
var formbuttonCloseOverlay = form.querySelector('#upload-cancel');
var formUploadInput = form.querySelector('#upload-file');
var formEffectsList = formOverlay.querySelector('.effects__list');
var formOverlaySubmit = formOverlay.querySelector('.img-upload__submit');
var formOverlayTextarea = formOverlay.querySelector('.text__description');

var formScaleSmaller = formOverlay.querySelector('.scale__control--smaller');
var formScaleBigger = formOverlay.querySelector('.scale__control--bigger');

var formImgSlider = formOverlay.querySelector('.img-upload__effect-level');
var formImgSliderLine = formImgSlider.querySelector('.effect-level__line');
var formImgSliderInput = formImgSlider.querySelector('.effect-level__value');
var formImgSliderPin = formImgSlider.querySelector('.effect-level__pin');
var formImgPreview = formOverlay.querySelector('.img-upload__preview').querySelector('img');

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
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

var getPhotosArray = function (number) {
  var arrayOfUniqueNumbers = getArrayOfUniqueNumbers(number);
  var array = [];

  for (var i = 0; i < number; i++) {

    var photo = {
      id: arrayOfUniqueNumbers[i],
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

  photoElement.querySelector('.picture__img').dataset.id = photo.id;
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
  bigPictureImg.src = photo.url;
  bigPictureCommentsCount.textContent = photo.comments.length;
  bigPictureSocialCaption.textContent = photo.description;
  bigPictureSocialLikes.textContent = photo.likes;

  bigPictureSocialCommentsContainer.textContent = '';
  bigPictureSocialCommentsContainer.appendChild(renderComments(photo.comments));

  bigPictureSocialCommentsCount.classList.add('hidden');
  bigPictureSocialLoader.classList.add('hidden');
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  bigPictureCancel.addEventListener('click', onClosePhotoClick);
  document.addEventListener('keydown', onPhotoKeydown);
};

var closePhoto = function () {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  bigPictureCancel.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onPhotoKeydown);
};

var onClosePhotoClick = function () {
  closePhoto();
};

var onPhotoKeydown = function (evt) {
  if (evt.key === ESCAPE_KEY) {
    closePhoto();
  }
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
  formImgSliderPin.addEventListener('mouseup', onPinMouseup);
  formScaleSmaller.addEventListener('click', onScaleClick);
  formScaleBigger.addEventListener('click', onScaleClick);
  body.classList.add('modal-open');
};

var closeOverlay = function () {
  formOverlay.classList.add('hidden');

  formbuttonCloseOverlay.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onButtonKeydown);
  formImgSliderPin.removeEventListener('mouseup', onPinMouseup);
  formUploadInput.value = '';
  formImgPreview.style.filter = '';
  formImgPreview.classList.remove(oldStyle);
  formImgPreview.style.transform = '';
  body.classList.remove('modal-open');
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
  var target = evt.target;

  for (var i = 0; i < EFFECTS.length; i++) {
    var input = formEffectsList.querySelector('#effect-' + EFFECTS[i]);
    var isItem = target.contains(input);

    if (isItem) {
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

var onPinMouseup = function () {
  var pinPosition = getComputedStyle(formImgSliderPin).getPropertyValue('left');
  var roundPinPosition = parseInt(pinPosition.split('.')[0], 10);
  var lineWidth = getComputedStyle(formImgSliderLine).getPropertyValue('width');
  var roundLineWidth = parseInt(lineWidth.split('.')[0], 10);
  var proportion = Math.round(roundPinPosition / roundLineWidth * 100);

  formImgSliderInput.value = proportion;

  switch (oldStyle) {
    case 'effects__preview--chrome':
      formImgPreview.style.filter = 'grayscale(' + proportion / 100 + ')';
      break;
    case 'effects__preview--sepia':
      formImgPreview.style.filter = 'sepia(' + proportion / 100 + ')';
      break;
    case 'effects__preview--marvin':
      formImgPreview.style.filter = 'invert(' + proportion + '%)';
      break;
    case 'effects__preview--phobos':
      formImgPreview.style.filter = 'blur(' + proportion / 10 + 'px)';
      break;
    case 'effects__preview--heat':
      formImgPreview.style.filter = 'brightness(' + proportion + '%)';
      break;
  }
};

var onScaleClick = function (evt) {
  var target = evt.target;
  var formScaleValue = formOverlay.querySelector('.scale__control--value');
  var numberValue = parseInt(formScaleValue.value.replace('%', ''), 10);
  var isSmaller = target.classList.contains('scale__control--smaller');
  var isBigger = target.classList.contains('scale__control--bigger');

  if (numberValue > 25 && isSmaller) {
    formScaleValue.value = ((numberValue - 25) + '%');
    formImgPreview.style.transform = 'scale(' + ((numberValue - 25) / 100) + ')';
  } else if (numberValue < 100 && isBigger) {
    formScaleValue.value = ((numberValue + 25) + '%');
    formImgPreview.style.transform = 'scale(' + ((numberValue + 25) / 100) + ')';
  }
};

var CustomValidation = function () {
  this.invalidities = [];
  this.validityChecks = [];
  this.uniqueArray = [];
};

CustomValidation.prototype = {
  addInvalidity: function (message) {
    this.invalidities.push(message);
  },
  getInvalidities: function () {
    this.uniqueArray = [...new Set(this.invalidities)];

    return this.uniqueArray.join('. \n');
  },
  checkValidity: function (input, arrayHashtags) {
    for (var i = 0; i < this.validityChecks.length; i++) {
      var isInvalid = this.validityChecks[i].isInvalid(input, arrayHashtags);

      if (isInvalid) {
        this.addInvalidity(this.validityChecks[i].invalidityMessage);
        this.validityChecks[i].element.classList.add('invalid');
        this.validityChecks[i].element.classList.remove('valid');
      } else {
        this.validityChecks[i].element.classList.remove('invalid');
        this.validityChecks[i].element.classList.add('valid');
      }
    }
  }
};

var usernameValidityChecks = [
  {
    isInvalid: function (input) {
      return !input.startsWith('#');
    },
    invalidityMessage: 'хэш-тег должен начинаться с символа # (решётка)',
    element: form.querySelector('.input-requirements li:nth-child(1)')
  },
  {
    isInvalid: function (input) {
      return input.match(/.[^a-zA-Z0-9]/g);
    },
    invalidityMessage: 'хеш-тег должен состоять только из букв и чисел и не может содержать пробелы',
    element: form.querySelector('.input-requirements li:nth-child(2)')
  },
  {
    isInvalid: function (input) {
      return !input.match(/[^#]/g);
    },
    invalidityMessage: 'хеш-тег не может состоять только из одной решётки',
    element: form.querySelector('.input-requirements li:nth-child(3)')
  },
  {
    isInvalid: function (input) {
      return !(input.split('').length < 21);
    },
    invalidityMessage: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
    element: form.querySelector('.input-requirements li:nth-child(4)')
  },
  {
    isInvalid: function (input) {
      return input.match(/.#/g);
    },
    invalidityMessage: 'хэш-теги разделяются пробелами',
    element: form.querySelector('.input-requirements li:nth-child(5)')
  },
  {
    isInvalid: function (input, arrayHashtags) {
      var arrayWithoutDuplicates = [...new Set(arrayHashtags)];
      return !(arrayWithoutDuplicates.length === arrayHashtags.length);
    },
    invalidityMessage: 'один и тот же хэш-тег не может быть использован дважды',
    element: form.querySelector('.input-requirements li:nth-child(6)')
  },
  {
    isInvalid: function (input, arrayHashtags) {
      return arrayHashtags.length > 5;
    },
    invalidityMessage: 'нельзя указать больше пяти хэш-тегов',
    element: form.querySelector('.input-requirements li:nth-child(7)')
  }
];

var checkValidity = function (evt) {
  formUploadHashtags.CustomValidation.invalidities = [];
  var arrayHashtags = evt.target.value.split(' ');

  for (var i = 0; i < arrayHashtags.length; i++) {
    formUploadHashtags.CustomValidation.checkValidity(arrayHashtags[i], arrayHashtags);
  }

  var isEmpty = formUploadHashtags.CustomValidation.invalidities.length === 0
                                          && formUploadHashtags.value !== '';

  if (isEmpty) {
    formUploadHashtags.setCustomValidity('');
  } else {
    var message = formUploadHashtags.CustomValidation.getInvalidities();
    formUploadHashtags.setCustomValidity(message);
  }
};

var stopPropagation = function (element) {
  element.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });
};

stopPropagation(formUploadHashtags);
stopPropagation(formOverlayTextarea);

renderPhotos(photosArray);

formUploadControl.addEventListener('change', onUploadPhoto);

formUploadHashtags.CustomValidation = new CustomValidation();
formUploadHashtags.CustomValidation.validityChecks = usernameValidityChecks;

formUploadHashtags.addEventListener('input', checkValidity);
formOverlaySubmit.addEventListener('submit', checkValidity);

var showFullPhoto = function (evt) {
  var photoId;
  var link = evt.target.classList.contains('picture');

  link ? photoId = evt.target.firstElementChild.dataset.id : photoId = evt.target.dataset.id;

  if(photoId !== undefined) {
    var photo = photosArray.find(function (elem) {
      return elem.id === parseInt(photoId, 10);
    } );

    displayFullPhoto(photo);
  }
};

var onPhotoClick = function (evt) {
  showFullPhoto(evt);
};

var onPhotoEnterKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    showFullPhoto(evt);
  }
};

photosContainer.addEventListener('click', onPhotoClick);
photosContainer.addEventListener('keydown', onPhotoEnterKeydown);
