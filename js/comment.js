'use strict';

(function () {
  var COMMENT_AVATAR_WIDTH = 35;
  var COMMENT_AVATAR_HEIGHT = 35;

  // создание дом.элементов комментариев

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
    image.width = COMMENT_AVATAR_WIDTH;
    image.height = COMMENT_AVATAR_HEIGHT;
    paragraph.textContent = comments.message;

    return listItem;
  };

  window.comment = {
    create: createComment
  };
})();
