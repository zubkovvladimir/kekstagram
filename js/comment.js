'use strict';

(function () {
  var COMMENT_AVATAR_WIDTH = 35;
  var COMMENT_AVATAR_HEIGHT = 35;

  // создание дом.элементов комментариев

  var createComment = function (comments) {
    var element = document.createElement('li');
    var img = document.createElement('img');
    var text = document.createElement('p');

    element.classList.add('social__comment');
    img.classList.add('social__picture');
    text.classList.add('social__text');

    element.appendChild(img);
    element.appendChild(text);

    img.src = comments.avatar;
    img.alt = comments.name;
    img.width = COMMENT_AVATAR_WIDTH;
    img.height = COMMENT_AVATAR_HEIGHT;
    text.textContent = comments.message;

    return element;
  };

  window.comment = {
    create: createComment
  };
})();
