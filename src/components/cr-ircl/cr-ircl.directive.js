'use strict';

angular.module('circlr')
  .directive('crIrcl', function ($log, $window) {
    var d3 = $window.d3;
    return {
      restrict: 'E',
      template: '<svg></svg>',
      link: function (scope, el) {
        var svg = d3.select(el[0].firstElementChild);

        scope.$watch('payload', function (newPayload) {
          if (!newPayload)
            return;

          var pl = newPayload;

          svg.attr('width', 600)
            .attr('height', 600)
            .attr('viewBox', '0 0 ' + pl.columns + ' ' + pl.rows);

          var c = svg.selectAll('circle').data(pl.points.filter(function (p) { return p.val.l > pl.settings.cutoff; }));

          c.enter().append('circle');

          c.attr('cx', function (d) { return d.x + 0.5; })
            .attr('cy', function (d) { return d.y + 0.5; })
            .attr('fill', function (d) { return d3.hsl(d.val.h, d.val.s, d.val.l).toString(); })
            .attr('r', function (d) { return d.val.l * 0.7; });

          c.exit().remove();
        });
      }
    };
  });
