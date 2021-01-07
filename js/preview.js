'use strict';

(function () {
  var body = document.body;

  var picturesContainer = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var img = bigPicture.querySelector('.big-picture__img').querySelector('img');
  var social = bigPicture.querySelector('.big-picture__social');
  var cancel = bigPicture.querySelector('.big-picture__cancel');
  var socialLoader = social.querySelector('.comments-loader');
  var commentsCount = social.querySelector('.comments-count');
  var socialCaption = social.querySelector('.social__caption');
  var likes = social.querySelector('.likes-count');
  var socialCommentsCount = social.querySelector('.social__comment-count');
  var socialCommentsContainer = social.querySelector('.social__comments');

  var createFullPicture = function (picture) {
    img.src = picture.url;
    commentsCount.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;
    likes.textContent = picture.likes;

    socialCommentsContainer.textContent = '';
    socialCommentsContainer.appendChild(window.comment.render(picture.comments));
  };

  var showFullPicture = function (evt, picturesArray) {
    var target = evt.target;
    var link = target.classList.contains('picture');

    var pictureId = link ? target.firstElementChild.dataset.id : target.dataset.id;

    if (pictureId !== undefined) {
      var picture = picturesArray.find(function (elem) {
        return elem.id === parseInt(pictureId, 10);
      });

      createFullPicture(picture);

      socialCommentsCount.classList.add('hidden');
      socialLoader.classList.add('hidden');
      body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');

      cancel.addEventListener('click', onClosePictureClick);
      document.addEventListener('keydown', onPictureKeydown);
    }
  };

  var closePicture = function () {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');

    cancel.removeEventListener('click', onClosePictureClick);
    document.removeEventListener('keydown', onPictureKeydown);
  };

  var onClosePictureClick = function () {
    closePicture();
  };

  var onPictureKeydown = function (evt) {
    window.util.isEscEvent(evt, closePicture);
  };

  var addtListenersPicture = function (picturesArray) {
    var onPictureClick = function (evt) {
      showFullPicture(evt, picturesArray);
    };

    var onPictureEnterKeydown = function (evt) {
      window.util.isEnterEvent(evt, showFullPicture, picturesArray);
    };

    picturesContainer.addEventListener('click', onPictureClick);
    picturesContainer.addEventListener('keydown', onPictureEnterKeydown);
  };

  window.preview = {
    addtListenersPicture: addtListenersPicture
  };
})();
