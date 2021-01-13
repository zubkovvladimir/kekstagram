'use strict';

(function () {
  var HASHTAG_PATTERN = /.[^a-zA-Z0-9]/g;
  var IS_HASH_SYMBOL = /[^#]/g;
  var IS_SPACE = /.#/g;
  var HASHTAG_MAX_LENGTH = 21;
  var HASHTAG_MAX_COUNT = 5;

  var picturesContainer = document.querySelector('.pictures');
  var form = picturesContainer.querySelector('.img-upload__form');
  var formUploadHashtags = form.querySelector('.text__hashtags');

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
          return input.match(HASHTAG_PATTERN);
        },
        invalidityMessage: 'хеш-тег должен состоять только из букв и чисел и не может содержать пробелы',
        element: form.querySelector('.input-requirements li:nth-child(2)')
      },
      {
        isInvalid: function (input) {
          return !input.match(IS_HASH_SYMBOL);
        },
        invalidityMessage: 'хеш-тег не может состоять только из одной решётки',
        element: form.querySelector('.input-requirements li:nth-child(3)')
      },
      {
        isInvalid: function (input) {
          return !(input.split('').length < HASHTAG_MAX_LENGTH);
        },
        invalidityMessage: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
        element: form.querySelector('.input-requirements li:nth-child(4)')
      },
      {
        isInvalid: function (input) {
          return input.match(IS_SPACE);
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
          return arrayHashtags.length > HASHTAG_MAX_COUNT;
        },
        invalidityMessage: 'нельзя указать больше пяти хэш-тегов',
        element: form.querySelector('.input-requirements li:nth-child(7)')
      }
    ];

    var checkValidity = function (evt) {
      formUploadHashtags.CustomValidation.invalidities = [];
      console.log(evt.target.value);
      var arrayHashtags = evt.target.value.split(' ');

      for (var i = 0; i < arrayHashtags.length; i++) {
        formUploadHashtags.CustomValidation.checkValidity(arrayHashtags[i], arrayHashtags);
      }

      var isEmpty = formUploadHashtags.CustomValidation.invalidities.length === 0
                                              && formUploadHashtags.value !== '';

      if (isEmpty) {
        formUploadHashtags.setCustomValidity('');
      } else if (arrayHashtags.length === 1 && arrayHashtags[0] === ''){
        formUploadHashtags.setCustomValidity('');
      } else {
        var message = formUploadHashtags.CustomValidation.getInvalidities();
        formUploadHashtags.setCustomValidity(message);
      }
    };

    formUploadHashtags.CustomValidation = new CustomValidation();
    formUploadHashtags.CustomValidation.validityChecks = usernameValidityChecks;

    window.validation = {
      check: checkValidity
    }
})();
