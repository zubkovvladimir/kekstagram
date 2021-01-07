'use strict';

(function () {
  var COMMENT_AVATARR_WIDTH_HEIGHT = 35;

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

  window.comment = {
    render: renderComments
  };
})();
