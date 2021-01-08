'use strict';

(function () {
  var levelLine = document.querySelector('.effect-level__line');
  var sliderPin = levelLine.querySelector('.effect-level__pin');
  var sliderDepth = levelLine.querySelector('.effect-level__depth');


  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var halfPin = sliderPin.offsetWidth / 2;
    var minRange = ((document.body.offsetWidth - levelLine.offsetWidth) / 2);
    var maxRange = minRange + levelLine.offsetWidth;

    console.log(sliderPin.offsetWidth);
    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordX - moveEvt.clientX;

      startCoordX = moveEvt.clientX;

      if (startCoordX <= maxRange && startCoordX >= minRange) {
        sliderPin.style.left = (sliderPin.offsetLeft - shift) + 'px';
        sliderDepth.style.width = (sliderDepth.offsetWidth - shift) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
