'use strict';

angular.module('circlr')
  .directive('crCata', function ($log, $window) {
    return {
      restrict: 'E',
      template: '<canvas></canvas>',
      link: function (scope, el, attrs) {
        var canvas = el[0].firstElementChild;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, 100, 100);

        scope.$watch('imageUrl', function (newUrl, oldUrl) {
          $log.log("cr-cata watch imageUrl:", newUrl);
          if (!newUrl)
            return;

          var img = new $window.Image();
          img.crossOrigin = 'anonymous';
          img.onload = function () {
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;
            ctx.drawImage(img, 0, 0);
            var imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height);
            $log.log("cr-cata image data:", { width: imgdata.width, height: imgdata.height, length: imgdata.data.length });
            scope.$apply(function (s) { s.analyse(imgdata); });
          };
          img.src = newUrl;
        });
      }
    };
  });
