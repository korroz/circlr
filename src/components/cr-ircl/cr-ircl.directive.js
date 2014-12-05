'use strict';

angular.module('circlr')
  .directive('crIrcl', function ($log, $window) {
    var d3 = $window.d3;
    return {
      restrict: 'E',
      template: '<svg></svg>',
      link: function (scope, el, attrs) {
        var svg = d3.select(el[0].firstElementChild);

        scope.$watch('payload', function (newPayload, oldPayload) {
          if (!newPayload)
            return;

          var pl = newPayload;
          var res = pl.resolution;

          svg.attr('width', 560)
            .attr('height', 420)
            .attr('viewBox', '0 0 ' + (res * pl.columns) + ' ' + (res * pl.rows));

          var c = svg.selectAll('circle').data(pl.points);

          c.enter().append('circle')
            .attr('fill', '#ccc')
            .attr('cx', function (d) { return d.x * res + res / 2; })
            .attr('cy', function (d) { return d.y * res + res / 2; })
            .attr('r', function (d) { return d.val; });
          c.exit().remove();
        });
      }
    };
  });
