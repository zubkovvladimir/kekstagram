'use strict';

(function () {
  var RANDOM_PICTURES_AMOUNT = 10;

  var filters = document.querySelector('.img-filters');
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var data = window.gallery.data;
  var renderPictures = window.gallery.renderPictures;
  var removePictures = window.gallery.removePictures;

  var getArrayOfUniqueNumbers = window.util.getArrayOfUniqueNumbers;

  // фильтрует и отображает 10 случайных фото

  var onRandomClick = function () {
    var uniqueArray = getArrayOfUniqueNumbers(RANDOM_PICTURES_AMOUNT);
    var randomPictures = uniqueArray.map(function (number) {
      return window.gallery.data[number];
    });
    removePictures();
    renderPictures(randomPictures);
  };

  filterRandom.addEventListener('click', onRandomClick);

  // фильтрует и отображает обсуждаемые фото

  var onDiscussedClick = function () {
    var copyData = window.gallery.data.slice();
    copyData.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    removePictures();
    renderPictures(copyData);
  };

  filterDiscussed.addEventListener('click', onDiscussedClick);

  // фильтрует и отображает обсуждаемые фото

  var onDefaultClick = function () {
    removePictures();
    renderPictures(window.gallery.data);
  };

  filterDefault.addEventListener('click', onDefaultClick);

  filters.classList.remove('img-filters--inactive');

  window.filter = {
    // addtListenersFilter: addtListenersFilter
  }
})();
