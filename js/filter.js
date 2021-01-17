'use strict';

(function () {
  var RANDOM_PICTURES_AMOUNT = 10;

  var filters = document.querySelector('.img-filters');
  var filterDefault = filters.querySelector('#filter-default');
  var filterRandom = filters.querySelector('#filter-random');
  var filterDiscussed = filters.querySelector('#filter-discussed');
  var picturesContainer = document.querySelector('.pictures');

  var removeElements = window.util.removeElements;
  var addID = window.util.addID;
  var addtListenersPicture = window.preview.addtListenersPicture;
  var getFragment = window.picture.getFragment;
  var getArrayOfUniqueNumbers = window.util.getArrayOfUniqueNumbers;

  // переключает класс активной кнопки

  var setActiveClass = function (element) {
    var activeButton = filters.querySelector('.img-filters__button--active');

    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }

    element.classList.add('img-filters__button--active');
  };

  // перерисовывает фотографии

  var reRenderPictures = function (element, pictures) {
    setActiveClass(element);
    removeElements(picturesContainer);
    addID(pictures);
    picturesContainer.appendChild(getFragment(pictures));
    addtListenersPicture(pictures);
  };

  // фильтрует и отображает 10 случайных и уникальных фото

  var onRandomClick = function () {
    var uniqueArray = getArrayOfUniqueNumbers(RANDOM_PICTURES_AMOUNT);

    var randomPictures = uniqueArray.map(function (number) {
      return window.gallery.data[number];
    });

    reRenderPictures(filterRandom, randomPictures);
  };

  // сортирует фото по кол-ву комментариев

  var onDiscussedClick = function () {
    var copyData = window.gallery.data.slice();

    copyData.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    reRenderPictures(filterDiscussed, copyData);
  };

  // отображает фото в исходном порядке

  var onDefaultClick = function () {
    reRenderPictures(filterDefault, window.gallery.data);
  };

  // отображает блок с фильтрами

  var showFilters = function () {
    filterDiscussed.addEventListener('click', onDiscussedClick);
    filterRandom.addEventListener('click', onRandomClick);
    filterDefault.addEventListener('click', onDefaultClick);

    filters.classList.remove('img-filters--inactive');
  };

  window.filter = {
    show: showFilters
  };
})();
