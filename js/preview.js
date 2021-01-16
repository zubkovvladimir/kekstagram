'use strict';

(function () {
  var body = document.body;

  var bigPicture = document.querySelector('.big-picture');
  var img = bigPicture.querySelector('.big-picture__img').querySelector('img');
  var cancel = bigPicture.querySelector('.big-picture__cancel');

  var social = bigPicture.querySelector('.big-picture__social');
  var socialCaption = social.querySelector('.social__caption');
  var commentsLoader = social.querySelector('.comments-loader');
  var commentsCountElement = social.querySelector('.social__comment-count');
  var commentsCount = social.querySelector('.comments-count');
  var likes = social.querySelector('.likes-count');
  var commentsContainer = social.querySelector('.social__comments');

  var render = window.comment.render;
  var isEscEvent = window.util.isEscEvent;

  // создаст модалку полноразмерного фото

  var createFullPicture = function (picture) {
    img.src = picture.url;
    commentsCount.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;
    likes.textContent = picture.likes;

    commentsContainer.textContent = '';
    commentsContainer.appendChild(render(picture.comments));
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

  window.preview = {
    show: showFullPicture
  };
})();
