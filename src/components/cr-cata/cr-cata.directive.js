'use strict';

angular.module('circlr')
  .directive('crCata', function ($log) {
    return {
      restrict: 'E',
      template: '<canvas></canvas>',
      link: function (scope, el, attrs) {
        $log.log(el);
        var canvas = el[0].firstElementChild;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, 100, 100);
      }
    };
  });
