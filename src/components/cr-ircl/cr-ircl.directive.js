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

          svg.attr('width', 600)
            .attr('height', 600)
            .attr('viewBox', '0 0 ' + (res * pl.columns) + ' ' + (res * pl.rows));

          var c = svg.selectAll('circle').data(pl.points);

          c.enter().append('circle')
            .attr('fill', '#000');

          c.attr('cx', function (d) { return d.x * res + res / 2; })
            .attr('cy', function (d) { return d.y * res + res / 2; })
            .attr('r', function (d) { return (0.8 - d.val * 0.8) * res / 2 * 1.3; });

          c.exit().remove();
        });
      }
    };
  });
