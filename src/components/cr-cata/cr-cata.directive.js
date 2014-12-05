'use strict';

angular.module('circlr')
  .directive('crCata', function ($log, $window) {
    return {
      restrict: 'E',
      template: '<canvas></canvas>',
      link: function (scope, el, attrs) {
        $log.log('cr-cata element:', el);
        var canvas = el[0].firstElementChild;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, 100, 100);

        scope.$watch('imageUrl', function (newUrl, oldUrl) {
          $log.log("cr-cata watch imageUrl:", newUrl);
          if (!newUrl)
            return;

          var img = new $window.Image();
          img.onload = function () {
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;
            ctx.drawImage(img, 0, 0);
          };
          img.src = newUrl;
        });
      }
    };
  });
