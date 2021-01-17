'use strict';

(function () {
  var body = document.body;

  var bigPicture = document.querySelector('.big-picture');
  var img = bigPicture.querySelector('.big-picture__img').querySelector('img');
  var cancel = bigPicture.querySelector('.big-picture__cancel');

  var picturesContainer = document.querySelector('.pictures');
  var social = bigPicture.querySelector('.big-picture__social');
  var socialCaption = social.querySelector('.social__caption');
  var commentsLoader = social.querySelector('.comments-loader');
  var commentsCountElement = social.querySelector('.social__comment-count');
  var commentsCount = social.querySelector('.comments-count');
  var likes = social.querySelector('.likes-count');
  var commentsContainer = social.querySelector('.social__comments');

  var isEnterEvent = window.util.isEnterEvent;
  var create = window.comment.create;
  var isEscEvent = window.util.isEscEvent;

  // создаст модалку полноразмерного фото

  var createFullPicture = function (picture) {
    img.src = picture.url;
    commentsCount.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;
    likes.textContent = picture.likes;

    commentsContainer.textContent = '';
    commentsContainer.appendChild(renderComments(picture.comments));
  };

  // отрисовка дом элементов комментариев

  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(create(comments[i]));
    }

    return fragment;
  };

  // отобразит модалку полноразмерного фото

  var showFullPicture = function (evt, picturesArray) {
    var target = evt.target;
    var link = target.classList.contains('picture');

    var pictureId = link ? target.firstElementChild.dataset.id : target.dataset.id;

    if (pictureId !== undefined) {
      var picture = picturesArray.find(function (elem) {
        return elem.id === parseInt(pictureId, 10);
      });

      createFullPicture(picture);

      commentsCountElement.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');

      cancel.addEventListener('click', onClosePictureClick);
      document.addEventListener('keydown', onPictureKeydown);
    }
  };

  // закроет модалку полноразмерного фото

  var closePicture = function () {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');

    cancel.removeEventListener('click', onClosePictureClick);
    document.removeEventListener('keydown', onPictureKeydown);
  };

  // обработчик клика модалки

  var onClosePictureClick = function () {
    closePicture();
  };

  // обработчик клавиши эскейп модалки

  var onPictureKeydown = function (evt) {
    isEscEvent(evt, closePicture);
  };

  // добавит обработчики фотографий

  var addtListenersPicture = function (picturesArray) {
    var onPictureClick = function (evt) {
      showFullPicture(evt, picturesArray);
    };

    var onPictureEnterKeydown = function (evt) {
      isEnterEvent(evt, showFullPicture, picturesArray);
    };

    picturesContainer.addEventListener('click', onPictureClick);
    picturesContainer.addEventListener('keydown', onPictureEnterKeydown);
  };

  window.preview = {
    show: showFullPicture,
    addtListenersPicture: addtListenersPicture
  };
})();
